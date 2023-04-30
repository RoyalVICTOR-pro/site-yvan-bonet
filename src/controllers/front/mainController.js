const contentData = require('../../data/content.json');
// const exphbs = require('express-handlebars');

exports.getHomePage = (req, res) => {
  console.log('Entrée dans getHomePage');
  // exphbs.registerPartial('')
  res.status(200).render('front/home', {
    title: contentData.home.seo_title
  });
};

exports.getDomainPage = (req, res) => {
  res.status(200).render('front/domaine', {
    seo_title: contentData[req.params.slug].seo_title,
    icon_file_name: contentData[req.params.slug].icon_file_name,
    page_title: contentData[req.params.slug].page_title,
    page_intro: contentData[req.params.slug].page_intro,
    page_text: contentData[req.params.slug].page_text,
  });
};