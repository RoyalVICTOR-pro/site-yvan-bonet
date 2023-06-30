'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    extract: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    auteur: DataTypes.STRING,
    date_article: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });

  Article.createNew = async (formData) => {
    await Article.create(formData).catch((err) => {
      console.log('Erreur dans le model lors de la création d\'un nouvel article : ', err);
      return Promise.reject(err);
    });
    return Article;
  };

  Article.updateArticle = async (formData, sendedID) => {
    await User.update(formData, {
      where: {
        id: sendedID
      }
    });
    return Article;
  };

  return Article;
};