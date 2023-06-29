'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Member, { foreignKey: 'memberId' });
      this.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  Lending.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    memberId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    lentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    expiredDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    returnedDate: {
      type: DataTypes.DATEONLY
    },
    lateFee: {
      type: DataTypes.DECIMAL
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Lending',
    tableName: 'lending'
  });
  return Lending;
};
