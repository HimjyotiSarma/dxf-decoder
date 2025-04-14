import fs from 'fs'
import crypto from 'crypto'

const createFileHash = (filePath) => {
  //  File Path of the Stored File Using Multer
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist')
    }
    const fileBuffer = fs.readFileSync(filePath)
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex')
    if (!hash) {
      throw new Error('Hash could not be created')
    }
    return hash
  } catch (error) {
    console.error('Error creating file hash:', error)
    return null
  }
}

// const compareFileHash = (filePath, hash) => {
//   if (!fs.existsSync(filePath)) {
//     throw new Error('File does not exist')
//   }
//   return createFileHash(filePath) === hash
// }

export { createFileHash }
