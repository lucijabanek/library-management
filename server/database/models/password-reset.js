'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      PasswordReset.belongsTo(models.User, { foreignKey: 'userId' });
      models.User.hasOne(PasswordReset, { foreignKey: 'userId' });
    }
  }
  PasswordReset.init({
    userId: DataTypes.UUID,
    token: DataTypes.STRING,
    expirationTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PasswordReset',
    tableName: 'password-reset',
    timestamps: false
  });
  return PasswordReset;
};
