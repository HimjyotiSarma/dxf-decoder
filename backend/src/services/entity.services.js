import Entity from '../db/models/entities.js'

const createEntity = async (entityData) => {
  try {
    const entity = await Entity.create(entityData)
    return entity
  } catch (error) {
    throw new Error('Error creating entity: ' + error.message)
  }
}
const getEntityById = async (id) => {
  try {
    const entity = await Entity.findOne({ where: { id } })
    return entity
  } catch (error) {
    throw new Error('Error fetching entity: ' + error.message)
  }
}
const getEntityByName = async (name) => {
  try {
    const entity = await Entity.findOne({ where: { name } })
    return entity
  } catch (error) {
    throw new Error('Error fetching entity: ' + error.message)
  }
}

export { createEntity, getEntityById, getEntityByName }
