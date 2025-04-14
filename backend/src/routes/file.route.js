import { Router } from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import {
  uploadAndParseDxf,
  getFilesList,
  getFileDetails,
  getFileLayers,
  getFileBlocks,
  getBlockDetails,
  getEntityDetails,
  getLayerDetails,
} from '../controllers/dxf_file.controller.js'

const router = Router()

// 1. Upload & parse
router.post('/files', upload.single('file'), uploadAndParseDxf)

// 2. List all files
router.get('/files', getFilesList)

// 3. File details (with layers, blocks, entities, counts)
router.get('/files/:fileId', getFileDetails)

// 4. List layers for a file
router.get('/files/:fileId/layers', getFileLayers)

// 5. List blocks for a file
router.get('/files/:fileId/blocks', getFileBlocks)

// 6. Block details (with entities)
router.get('/blocks/:blockId', getBlockDetails)

// 7. (Optional) Single entity details
router.get('/entities/:entityId', getEntityDetails)

// 8. (Optional) Layer details (with blocks and entities)
router.get('/layers/:layerId', getLayerDetails)

export default router
