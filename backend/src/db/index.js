import sequelize from './config/sequelize.js'
import Block from './models/blocks.js'
import Entity from './models/entities.js'
import Layer from './models/layers.js'
import File from './models/files.js'

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected successfully')
    // Set up associations between models
    // File ↔ Blocks
    File.hasMany(Block, { foreignKey: 'file_id', onDelete: 'CASCADE' })
    Block.belongsTo(File, { foreignKey: 'file_id' })

    // File ↔ Layers
    File.hasMany(Layer, { foreignKey: 'file_id', onDelete: 'CASCADE' })
    Layer.belongsTo(File, { foreignKey: 'file_id' })

    // File ↔ Entities
    File.hasMany(Entity, { foreignKey: 'file_id', onDelete: 'CASCADE' })
    Entity.belongsTo(File, { foreignKey: 'file_id' })

    // Layer ↔ Blocks
    Layer.hasMany(Block, { foreignKey: 'layer_id' })
    Block.belongsTo(Layer, { foreignKey: 'layer_id' })

    // Layer ↔ Entities  ← **added**
    Layer.hasMany(Entity, { foreignKey: 'layer_id' })
    Entity.belongsTo(Layer, { foreignKey: 'layer_id' })

    // Block ↔ Entities
    Block.hasMany(Entity, { foreignKey: 'block_id', onDelete: 'CASCADE' })
    Entity.belongsTo(Block, { foreignKey: 'block_id' })
    // Sync the database (create tables if they don't exist)
    const data = await sequelize.sync({ force: true })
    console.log('Database synced successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
