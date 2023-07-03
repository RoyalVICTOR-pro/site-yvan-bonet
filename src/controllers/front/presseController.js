const contentData = require('../../content/data.json');
const db = require('../../models/index');
const PresseModel = require('../../models/article');
const Article = PresseModel(db.sequelize, db.Sequelize);

exports.getPressePage = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });

    const cleanedArticles = articles.map(article => {
      return {
        id: article.dataValues.id,
        url: article.dataValues.url,
        date_article: article.dataValues.date_article,
        auteur: article.dataValues.auteur,
        extract: article.dataValues.extract,
        description: article.dataValues.description,
      };
    });
  
    res.status(200).render('front/presse', {
      active_menu: contentData.presse.active_menu,
      title: contentData.presse.seo_title,
      icon_file_name: contentData.presse.icon_file_name,
      page_title: contentData.presse.page_title,
      articles: cleanedArticles
    });
  } catch (err) {
    console.log('Error lors du select d\'articles :>> ', err);
    res.redirect('/');
  }

};