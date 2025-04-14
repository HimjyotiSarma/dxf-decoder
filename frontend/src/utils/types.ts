type FileUploadResponse = {
  statusCode: number
  message: string
  data: {
    total_layers: number
    total_blocks: number
    total_entities: number
    file_id: string
  } | null
  success: boolean
  errors?: string[]
}

type FileDetailsResponse = {
  statusCode: number
  message: string
  data: FileDetails | null
  success: boolean
  errors?: string[]
}
type BlockDetailsResponse = {
  statusCode: number
  message: string
  data: Block | null
  success: boolean
  errors?: string[]
}
export interface LayerDetailsResponse {
  statusCode: number
  message: string
  success: boolean
  data: LayerDetails
}
export interface EntityDetailsResponse {
  statusCode: number
  message: string
  success: boolean
  data: EntityDetails
}

export type FetchBlocksResponse = {
  statusCode: number
  message: string
  success: boolean
  data: {
    blocks: Block[]
    pagination: PaginationMeta
  }
}
// src/utils/types.ts

// Represents a single file item

// Response shape for fetching all files
export interface FetchFilesResponse {
  statusCode: number
  message: string
  success: boolean
  data: {
    files: FileItem[]
    totalFiles: number
    totalPages: number
    currentPage: number
  }
}
export interface FileItem {
  id: string
  file_name: string
  file_hash: string
  createdAt: string
  updatedAt: string
}

export type FetchLayersResponse = {
  statusCode: number
  message: string
  success: boolean
  data: {
    layers: Layer[]
  }
}
export type PaginationMeta = {
  page: number
  limit: number
  total: number
}

export interface EntityDetails {
  id: string
  file_id: string
  block_id: string
  type: string
  handle: string
  owner_handle: string
  layer_id: string
  createdAt: string
  updatedAt: string
  properties: EntityProperties
  layer: LayerSummary
}

export interface LayerSummary {
  id: string
  file_id: string
  name: string
  visible: boolean
  color: number
  createdAt: string
  updatedAt: string
}

// Generic DXF entity properties (for SPLINE in this case)
export interface EntityProperties {
  type: string
  color?: number
  layer?: string
  handle?: string
  planar?: boolean
  periodic?: boolean
  closed?: boolean
  colorIndex?: number
  lineweight?: number
  ownerHandle?: string
  normalVector?: { x: number; y: number; z: number }

  degreeOfSplineCurve?: number
  numberOfKnots?: number
  numberOfFitPoints?: number
  numberOfControlPoints?: number

  knotValues?: number[]
  controlPoints?: { x: number; y: number; z: number }[]
}

// The `data` payload for a single layer
export interface LayerDetails {
  id: string
  file_id: string
  name: string
  visible: boolean
  color: number
  createdAt: string
  updatedAt: string

  // Minimal file info for linking back
  File: {
    id: string
    file_name: string
    file_hash: string
    createdAt: string
    updatedAt: string
  }

  // Summaries of each block on this layer
  Blocks: Block[]
}

export interface FileDetails {
  id: string
  file_name: string
  file_hash: string
  createdAt: string
  updatedAt: string
  layers: Layer[]
  Blocks: Block[]
  counts?: {
    layerCount: number
    blockCount: number
    entityCount: number
  }
}

export interface Layer {
  id: string
  name: string
  visible: boolean
  color: number
}

export interface Block {
  id: string
  file_id: string
  name: string
  type: number | null
  layer?: Layer | null
  File?: FileDetails | null
  pos_x: number
  pos_y: number
  pos_z: number
  handle?: string | null
  owner_handle?: string | null
  entities?: Entity[]
}

export interface Entity {
  id: string
  type: string
  handle: string
  layer?: Layer
}

export type { FileUploadResponse, FileDetailsResponse, BlockDetailsResponse }
