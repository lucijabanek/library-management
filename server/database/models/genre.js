'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate (models) {
      // define association here
      Genre.belongsToMany(models.Book, {
        through: models.BookGenre,
        foreignKey: 'genreId'
      });
    }
  }
  Genre.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },

  {
    hooks: {
      beforeCreate: async (model) => {
        model.id = uuidv4();
      }
    },
    sequelize,
    modelName: 'Genre',
    tableName: 'genre',
    timestamps: false
  });
  return Genre;
};
