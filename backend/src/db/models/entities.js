import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'

const Entity = sequelize.define(
  'entity',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    file_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    block_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING, // e.g., 'LINE', 'CIRCLE', 'LWPOLYLINE'
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING,
    },
    owner_handle: {
      type: DataTypes.STRING, // Handle of the owner block i.e Block.handle == Entity.owner_handle
    },
    layer_id: {
      type: DataTypes.UUID,
    },
    properties: {
      type: DataTypes.JSONB, // JSONB for storing properties of the entity
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        name: 'idx_entities_file_id',
        fields: ['file_id'],
      },
      {
        name: 'idx_entities_block_id',
        fields: ['block_id'],
      },
      {
        name: 'idx_entities_layer_id',
        fields: ['layer_id'],
      },
      {
        name: 'idx_entities_type',
        fields: ['type'],
      },
    ],
  }
)

export default Entity
