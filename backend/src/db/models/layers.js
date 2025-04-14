import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'
// INCOMPLETE
const layer = sequelize.define(
  'layer',
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
    visible: {
      type: DataTypes.BOOLEAN,
    },
    color: {
      type: DataTypes.INTEGER,
    },
  },
  {
    indexes: [
      {
        name: 'idx_uq_layers_name_file_id',
        fields: ['file_id', 'name'],
        unique: true,
      },
      {
        name: 'idx_layers_file_id',
        fields: ['file_id'],
      },
    ],
  }
)

export default layer
