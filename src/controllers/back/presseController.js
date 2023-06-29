const db = require('../../models/index');
const moment = require('moment');
const PresseModel = require('../../models/article');
const Article = PresseModel(db.sequelize, db.Sequelize);

exports.getPresseList = async (req, res) => {
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
};

exports.createArticlePage = async (req, res) => {
  res.status(200).render('back/presseAddArticle', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs'
  });
};

exports.createArticle = async (req, res) => {
  try { 
    const newArticle = await Article.createNew(req.body);
    res.status(201).json({
      status: 'success',
      data: newArticle
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail here',
      data: err
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
    const updatedArticle = await Article.updateArticle(req.body, req.params.id);
    res.status(201).json({
      status: 'success',
      data: updatedArticle
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail here',
      data: err
    });
  }
};