const seoData = require('../../data/seo.json');

exports.getHomePage = (req, res) => {
  console.log('Entrée dans getHomePage');
  res.status(200).render('front/home', {
    title: seoData.home.title,
  });
};