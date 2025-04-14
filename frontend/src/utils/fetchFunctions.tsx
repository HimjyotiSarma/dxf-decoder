import axios from 'axios'
import {
  FileUploadResponse,
  FileDetailsResponse,
  BlockDetailsResponse,
  LayerDetailsResponse,
  EntityDetailsResponse,
  FetchBlocksResponse,
  FetchLayersResponse,
  FetchFilesResponse,
} from './types'

const uploadFile = async (file: File | null): Promise<FileUploadResponse> => {
  if (!file) {
    throw new Error('No file provided')
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/files`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (err) {
    // Extract error message from Axios error
    if (err instanceof axios.AxiosError) {
      if (err.response?.data) {
        const errorMessage = err.response.data.message || err.message
        console.error('Upload error:', errorMessage)
        throw new Error(errorMessage)
      }
    }
    throw new Error('An unknown error occurred while uploading the file')
  }
}

const fetchFileDetails = async (
  fileId: string
): Promise<FileDetailsResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/files/${fileId}`
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching file details:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

const fetchBlockDetails = async (
  blockId: string
): Promise<BlockDetailsResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/blocks/${blockId}`
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching block details:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
const fetchLayerDetails = async (
  layerId: string
): Promise<LayerDetailsResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/layers/${layerId}`
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching layer details:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
const fetchEntityDetails = async (
  entityId: string
): Promise<EntityDetailsResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/entities/${entityId}`
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching entity details:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

const fetchFileBlocks = async (params: {
  file_id: string
  search?: string
}): Promise<FetchBlocksResponse> => {
  const { file_id, search } = params
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/files/${file_id}/blocks`,
      {
        params: {
          search,
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching file blocks:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
const fetchFileLayers = async (params: {
  fileId: string
  search?: string
}): Promise<FetchLayersResponse> => {
  const { fileId, search } = params
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/files/${fileId}/layers`,
      {
        params: {
          search,
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching file layers:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

const fetchFilesList = async (params: {
  page?: string
  limit?: string
}): Promise<FetchFilesResponse> => {
  try {
    const response = await axios.get<FetchFilesResponse>(
      `${import.meta.env.VITE_API_BASE_URL}/files`,
      { params }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching files:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

export {
  uploadFile,
  fetchFileDetails,
  fetchBlockDetails,
  fetchLayerDetails,
  fetchEntityDetails,
  fetchFileBlocks,
  fetchFileLayers,
  fetchFilesList,
}
