'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (_models) {
      // define association here
    }
  }
  Notification.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    objectId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (model) => {
        model.id = uuidv4();
      }
    },
    sequelize,
    modelName: 'Notification',
    tableName: 'notification',
    timestamps: false // Disable automatic creation of createdAt and updatedAt columns
  });
  return Notification;
};
