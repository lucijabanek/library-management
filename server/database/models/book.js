'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate (models) {
      // define association here
      Book.belongsTo(models.Author, { foreignKey: 'authorId' });
      models.Author.hasMany(Book, { foreignKey: 'authorId' });
      Book.belongsToMany(models.Genre, {
        through: models.BookGenre,
        foreignKey: 'bookId'
      });
      this.hasMany(models.Lending, { foreignKey: 'bookId' });
    }
  }
  Book.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfRelease: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tags: DataTypes.JSONB,
    authorId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    modelName: 'Book',
    tableName: 'book',
    timestamps: false
  });
  return Book;
};
