import DxfParser from 'dxf-parser'
import fs from 'fs/promises'
import { asyncHandler } from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

import File from '../db/models/files.js'
import Block from '../db/models/blocks.js'
import Layer from '../db/models/layers.js'
import Entity from '../db/models/entities.js'
import { Op } from 'sequelize'

const parser = new DxfParser()

export const uploadAndParseDxf = asyncHandler(async (req, res) => {
  const dxfFilePath = req?.file?.path
  if (!dxfFilePath) throw new ApiError(400, 'No file uploaded')

  // Read and parse DXF file
  let dxfData
  try {
    const fileBuffer = await fs.readFile(dxfFilePath, 'utf8')
    dxfData = parser.parseSync(fileBuffer)
    // console.log('DXF data:', dxfData.tables)
  } catch (err) {
    throw new ApiError(400, 'Invalid DXF file')
  }

  // Save file in DB
  const fileInDb = await File.create({
    file_name: req.file.filename,
  })
  const file_id = fileInDb.id

  // 1. Extract & insert layers
  const layersObj = dxfData.tables?.layer?.layers || {}
  const layerData = Object.entries(layersObj).map(([name, l]) => ({
    file_id,
    name,
    visible: l.visible,
    color: l.color,
  }))
  const insertedLayers = await Layer.bulkCreate(layerData, { returning: true })
  const layerMap = {}
  insertedLayers.forEach((l) => (layerMap[l.name] = l.id))

  // 2. Extract & insert blocks
  const blocksObj = dxfData.blocks || {}
  for (const [_, b] of Object.entries(blocksObj)) {
    const block = await Block.create({
      file_id,
      name: b.name,
      layer_id: layerMap[b.layer] || null,
      pos_x: b.position?.x || 0,
      pos_y: b.position?.y || 0,
      pos_z: b.position?.z || 0,
      handle: b.handle,
      owner_handle: b.ownerHandle,
      type: b.type,
    })

    // 3. Insert entities inside this block
    // block_entities = b.entities
    const ents = (b.entities || []).map((e) => ({
      file_id,
      block_id: block.id,
      type: e.type,
      handle: e.handle,
      owner_handle: e.ownerHandle,
      layer_id: layerMap[e.layer] || null,
      properties: e,
    }))
    if (ents.length) await Entity.bulkCreate(ents)
  }

  // 4. Model‑space block + its entities
  const modelSpace = await Block.create({
    file_id,
    name: '*Model_Space',
    layer_id: null,
    pos_x: 0,
    pos_y: 0,
    pos_z: 0,
    type: 0,
  })
  const topLevelEnts = (dxfData.entities || []).map((e) => ({
    file_id,
    block_id: modelSpace.id,
    type: e.type,
    handle: e.handle,
    owner_handle: e.ownerHandle,
    layer_id: layerMap[e.layer] || null,
    properties: e,
  }))
  if (topLevelEnts.length) await Entity.bulkCreate(topLevelEnts)
  await fs.unlink(dxfFilePath) // Delete the uploaded file after processing
  res.json(
    new ApiResponse(200, 'DXF file parsed and stored successfully', {
      total_layers: layerData.length,
      total_blocks: Object.keys(blocksObj).length + 1, // +1 for model space block
      total_entities: topLevelEnts.length + (blocksObj?.entities?.length || 0),
      file_id,
    })
  )
})

// Get all files with pagination
export const getFilesList = async (req, res) => {
  const { page, limit } = req.query
  const pageNumber = parseInt(page) || 1
  const limitNumber = parseInt(limit) || 10
  const offset = (pageNumber - 1) * limitNumber
  const files = await File.findAll({
    limit: limitNumber,
    offset,
    order: [['createdAt', 'DESC']],
  })
  const totalFiles = await File.count()
  const totalPages = Math.ceil(totalFiles / limitNumber)
  res.json(
    new ApiResponse(200, 'Files retrieved successfully', {
      files,
      totalFiles,
      totalPages,
      currentPage: pageNumber,
    })
  )
}

export const getFileDetails = async (req, res) => {
  const { fileId } = req.params

  const file = await File.findByPk(fileId, {
    include: [
      // 1) All the layer definitions for this file
      { model: Layer },

      // 2) All blocks + each block’s layer + each block’s entities + each entity’s layer
      {
        model: Block,
        include: [
          // Block’s own layer
          { model: Layer },

          // Entities inside this block
          {
            model: Entity,
            include: [
              // Entity’s layer
              { model: Layer },
            ],
          },
        ],
      },
    ],
  })

  if (!file) {
    throw new ApiError(404, 'File not found')
  }

  // Count via Model.count()
  const [layerCount, blockCount, entityCount] = await Promise.all([
    Layer.count({ where: { file_id: fileId } }),
    Block.count({ where: { file_id: fileId } }),
    Entity.count({ where: { file_id: fileId } }),
  ])

  const payload = file.toJSON()
  payload.counts = { layerCount, blockCount, entityCount }

  return res.json(
    new ApiResponse(200, 'File details retrieved successfully', payload)
  )
}

// List Layers for a given file
export const getFileLayers = async (req, res) => {
  const { fileId } = req.params
  const { search } = req.query
  // 🔍 Add an existence check:
  const file = await File.findByPk(fileId)
  if (!file) throw new ApiError(404, 'File not found')
  const where = { file_id: fileId }
  if (search) where.name = { [Op.iLike]: `%${search}%` }
  // 2) Fetch layers from DB

  const layers = await Layer.findAll({
    where,
    order: [['createdAt', 'DESC']], // use snake_case if your column is `created_at`
    // 📦 add pagination here if needed
  })

  return res.json(
    new ApiResponse(200, 'Layers retrieved successfully', { layers })
  )
}

// List Blocks for a given file along with optional queries of file_id, search, type, layer_id
export const getFileBlocks = asyncHandler(async (req, res) => {
  const { fileId } = req.params
  const { search, type, layerId, page = 1, limit = 20 } = req.query

  // 1) Ensure file exists
  const file = await File.findByPk(fileId)
  if (!file) throw new ApiError(404, 'File not found')

  // 2) Build filters
  const where = { file_id: fileId }
  if (search) where.name = { [Op.iLike]: `%${search}%` }
  if (type) where.type = type
  if (layerId) where.layer_id = layerId

  // 3) Paginate + include layer
  const offset = (page - 1) * limit
  const { rows: blocks, count: total } = await Block.findAndCountAll({
    where,
    include: [{ model: Layer }],
    order: [['createdAt', 'DESC']],
    offset,
    limit: parseInt(limit, 10),
  })

  // 4) Respond
  return res.json(
    new ApiResponse(200, 'Blocks retrieved successfully', {
      blocks,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
      },
    })
  )
})
// Get Block Details plus nested entities

export const getBlockDetails = asyncHandler(async (req, res) => {
  const { blockId } = req.params

  const block = await Block.findByPk(blockId, {
    include: [
      { model: File },
      { model: Layer }, // Block’s own layer
      {
        model: Entity, // Entities in the block
        include: [{ model: Layer }], // Each entity’s layer
        order: [['createdAt', 'ASC']],
      },
    ],
  })

  if (!block) {
    throw new ApiError(404, 'Block not found')
  }

  return res.json(
    new ApiResponse(200, 'Block details retrieved successfully', block)
  )
})

// Get Single Entity Details
export const getEntityDetails = async (req, res) => {
  const { entityId } = req.params

  const entity = await Entity.findByPk(entityId, {
    include: [{ model: Layer }], // Each entity’s layer
  })
  if (!entity) throw new ApiError(404, 'Entity not found')

  return res.json(
    new ApiResponse(200, 'Entity details retrieved successfully', entity)
  )
}

export const getLayerDetails = async (req, res) => {
  const { layerId } = req.params

  const layer = await Layer.findByPk(layerId, {
    include: [
      { model: File }, // Each layer’s file
      {
        model: Block, // Blocks in the layer
        include: [{ model: Entity }], // Each block’s entities
      },
    ],
  })
  if (!layer) throw new ApiError(404, 'Layer not found')

  return res.json(
    new ApiResponse(200, 'Layer details retrieved successfully', layer)
  )
}
