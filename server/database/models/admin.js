'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (_models) {
      // define association here
    }
  }
  Admin.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    hooks: {
      beforeCreate: async (model) => {
        model.id = uuidv4();
      },
      beforeFind: async (options) => {
        if (!options.where) {
          options.where = { };
        }
        options.where.isActive = true;
      },
      beforeUpdate: async (options) => {
        if (!options.where) {
          options.where = { };
        }
        options.where.isActive = true;
      }
    },
    sequelize,
    modelName: 'Admin',
    tableName: 'admin'
  });
  return Admin;
};
