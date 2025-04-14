import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'
import path from 'path'
import { fileExists } from '../../services/file.services.js'
import { createFileHash } from '../../utils/FileHash.js'

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_hash: {
    type: DataTypes.STRING,
    unique: true,
  },
})

const UPLOADS_DIR = path.resolve('./public/uploads')

File.beforeCreate(async (file) => {
  const filePath = path.join(UPLOADS_DIR, file.file_name)
  const hash = createFileHash(filePath)
  if (!hash) throw new Error('File hash could not be created')

  const exists = await File.findOne({ where: { file_hash: hash } })
  if (exists) throw new Error('File already exists')

  file.file_hash = hash
})

export default File
