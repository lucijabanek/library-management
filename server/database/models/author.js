'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate (_models) {
      // define association here
    }
  }
  Author.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY
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
    modelName: 'Author',
    tableName: 'author',
    timestamps: false
  });
  return Author;
};
