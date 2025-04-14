import Layer from '../db/models/layers.js'

const createLayer = async (layerData) => {
  try {
    const layer = await Layer.create(layerData)
    return layer
  } catch (error) {
    throw new Error('Error creating layer: ' + error.message)
  }
}
const getLayerById = async (id) => {
  try {
    const layer = await Layer.findOne({ where: { id } })
    return layer
  } catch (error) {
    throw new Error('Error fetching layer: ' + error.message)
  }
}
const getLayerByName = async (name) => {
  try {
    const layer = await Layer.findOne({ where: { name } })
    return layer
  } catch (error) {
    throw new Error('Error fetching layer: ' + error.message)
  }
}
const getAllLayers = async () => {
  try {
    const layers = await Layer.findAll()
    return layers
  } catch (error) {
    throw new Error('Error fetching layers: ' + error.message)
  }
}
export { createLayer, getLayerById, getLayerByName, getAllLayers }
