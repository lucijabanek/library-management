'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
      models.Role.hasMany(User, { foreignKey: 'roleId' });

      User.hasOne(models.Member, { foreignKey: 'userId' });
      models.Member.belongsTo(User, { foreignKey: 'userId' });

      User.hasOne(models.Librarian, { foreignKey: 'userId' });
      models.Librarian.belongsTo(User, { foreignKey: 'userId' });

      User.hasOne(models.Admin, { foreignKey: 'userId' });
      models.Admin.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: async (model) => {
        model.id = uuidv4();

        const salt = bcrypt.genSaltSync(10);
        model.password = bcrypt.hashSync(model.password, salt);
      }
    },
    sequelize,
    modelName: 'User',
    tableName: 'user'

  });
  return User;
};
