const db = require('../../models/index');
const moment = require('moment');
const PresseModel = require('../../models/article');
const Article = PresseModel(db.sequelize, db.Sequelize);

exports.getPresseList = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });

    const cleanedArticles = articles.map(article => {
      console.log('article dans map :>> ', article);
      const formattedDate = moment(article.dataValues.createdAt).format('Créé le DD/MM/YYYY [à] HH:mm');
      return {
        id: article.dataValues.id,
        date: formattedDate,
        url: article.dataValues.url,
        date_article: article.dataValues.date_article,
        auteur: article.dataValues.auteur,
      };
    });
  
    res.status(200).render('back/presseList', {
      title: 'Yvan Bonet',
      layout: 'backMain.hbs',
      articles: cleanedArticles
    });
  } catch (err) {
    return console.log('Error lors du select d\'articles :>> ', err);
  }

};

exports.createArticlePage = async (req, res) => {
  res.status(200).render('back/presseAddArticle', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs'
  });
};

exports.createArticle = async (req, res) => {
  try { 
    await Article.createNew(req.body);
    return res.status(201).redirect('/admin/presse/articles');
  } catch (err) {
    
    console.log('Erreur lors de l\'ajout : ', err);
    res.status(500).render('back/presseAddArticle', {
      title: 'Yvan Bonet',
      layout: 'backMain.hbs',
      article: req.body
    });
  }
};

exports.getArticleDetails = async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } });
  console.log('article :>> ', article);
  const cleanedArticle = {
    id: article.dataValues.id,
    url: article.dataValues.url,
    extract: article.dataValues.extract,
    description: article.dataValues.description,
    date_article: article.dataValues.date_article,
    auteur: article.dataValues.auteur
  };

  res.status(200).render('back/presseDetail', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs',
    article: cleanedArticle
  });
};

exports.updateArticle = async (req, res) => {
  try { 
    await Article.updateArticle(req.body, req.params.id);
    res.status(201).redirect('/admin/presse/articles');
  } catch (err) {
    console.log('Erreur lors de la modification : ', err);
    res.status(200).render('back/presseDetail', {
      title: 'Yvan Bonet',
      layout: 'backMain.hbs',
      article: req.body
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try { 
    await Article.deleteArticle(req.params.id);
    res.status(201).redirect('/admin/presse/articles');
  } catch (err) {
    console.log('Erreur lors de la modification : ', err);
    res.status(201).redirect('/admin/presse/articles');
  }
};

