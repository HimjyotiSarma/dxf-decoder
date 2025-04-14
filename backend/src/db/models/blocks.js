import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'
const Block = sequelize.define(
  'Block',
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pos_x: {
      type: DataTypes.DOUBLE,
    },
    pos_y: {
      type: DataTypes.DOUBLE,
    },
    pos_z: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    layer_id: {
      type: DataTypes.UUID,
    },
    handle: {
      type: DataTypes.STRING,
    },
    owner_handle: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.INTEGER,
    },
  },
  {
    indexes: [
      {
        name: 'idx_blocks_file_id',
        fields: ['file_id'],
      },
      {
        name: 'idx_blocks_name',
        fields: ['name'],
      },
      {
        name: 'idx_blocks_layer_id',
        fields: ['layer_id'],
      },
    ],
  }
)

export default Block

// The type field in the blocks output comes directly from the DXF “Block type flag” (group code 70), and it’s a bit‑coded integer that tells you things like:
// 1 = anonymous block
// 2 = block has attributes
// 4 = external reference (Xref)
// 16 = externally dependent
// 32 = resolved external reference
// 64 = definition is referenced elsewhere
