'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (_models) {
      // define association here
    }
  }
  BookGenre.init({
    genreId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    bookId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BookGenre',
    tableName: 'book_genre',
    timestamps: false
  });
  return BookGenre;
};
