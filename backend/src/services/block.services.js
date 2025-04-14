import Block from '../db/models/blocks.js'

const createBlock = async (blockData) => {
  try {
    const block = await Block.create(blockData)
    return block
  } catch (error) {
    throw new Error('Error creating block: ' + error.message)
  }
}

const getBlockById = async (id) => {
  try {
    const block = await Block.findOne({ where: { id } })
    return block
  } catch (error) {
    throw new Error('Error fetching block: ' + error.message)
  }
}

export { createBlock, getBlockById }
