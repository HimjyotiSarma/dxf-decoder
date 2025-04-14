import File from '../db/models/files.js'

const createFile = async (fileName) => {
  try {
    //  Build the file object using the File model But save it in the routes only after all the entries are created
    //  and the file is ready to be saved in the database
    const file = await File.create({ name: fileName })
    return file
  } catch (error) {
    throw new Error('Error creating file: ' + error.message)
  }
}
const getFileById = async (id) => {
  try {
    const file = await File.findOne({ where: { id } })
    return file
  } catch (error) {
    throw new Error('Error fetching file: ' + error.message)
  }
}
const getFileByName = async (name) => {
  try {
    const file = await File.findOne({ where: { name } })
    return file
  } catch (error) {
    throw new Error('Error fetching file: ' + error.message)
  }
}
const fileExists = async (hash) => {
  try {
    const file = await File.findOne({ where: { file_hash: hash } })
    if (!file) {
      return false
    }
    return true
  } catch (error) {
    throw new Error('Error checking file existence: ' + error.message)
  }
}
const updateFile = async (id, fileData) => {
  try {
    const file = await File.update(fileData, { where: { id } })
    return file
  } catch (error) {
    throw new Error('Error updating file: ' + error.message)
  }
}
const deleteFile = async (id) => {
  try {
    const file = await File.destroy({ where: { id } })
    return file
  } catch (error) {
    throw new Error('Error deleting file: ' + error.message)
  }
}
const getAllFiles = async () => {
  try {
    const files = await File.findAll()
    return files
  } catch (error) {
    throw new Error('Error fetching files: ' + error.message)
  }
}

export {
  createFile,
  getFileById,
  getFileByName,
  updateFile,
  deleteFile,
  getAllFiles,
  fileExists,
}
