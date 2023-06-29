'use strict';
const { v4: uuidv4 } = require('uuid');
const { DAY_TO_MS } = require('../../utils/constant-values');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.hasMany(models.Lending, { foreignKey: 'memberId' });
    }
  }
  Member.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dateOfBirth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    subscriptionExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(Date.now() + 30 * DAY_TO_MS)
    },
    bookLimit: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    history: {
      type: DataTypes.JSONB,
      defaultValue: ([
        { start: new Date().toISOString().substr(0, 10), end: new Date(Date.now() + 30 * DAY_TO_MS).toISOString().substr(0, 10) }
      ])
    }
  }, {
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
    modelName: 'Member',
    tableName: 'member'
  });
  return Member;
};
