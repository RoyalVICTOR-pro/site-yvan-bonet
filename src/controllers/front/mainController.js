const contentData = require('../../content/data.json');

// const exphbs = require('express-handlebars');
exports.getHomePage = (req, res) => {
  console.log('Entrée dans getHomePage');
  // exphbs.registerPartial('')
  res.status(200).render('front/home', {
    title: contentData.home.seo_title
  });
};

exports.getDomainPage = (req, res) => {
  res.status(200).render('front/mainInternalPage', {
    active_menu: contentData[req.params.slug].active_menu,
    seo_title: contentData[req.params.slug].seo_title,
    icon_file_name: contentData[req.params.slug].icon_file_name,
    page_title: contentData[req.params.slug].page_title,
    page_intro: contentData[req.params.slug].page_intro,
    page_text: contentData[req.params.slug].page_text,
  });
};

exports.getPage = (pageName) => {
  return (req, res) => {
    switch (pageName) {
    case 'mentions-legales':
    case 'politique-confidentialite':
      res.status(200).render('front/legalPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        page_title: contentData[pageName].page_title,
        page_text: contentData[pageName].page_text
      });
      break;
    case 'parcours':
      res.status(200).render('front/parcoursPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        icon_file_name: contentData[pageName].icon_file_name,
        page_title: contentData[pageName].page_title,
        page_intro: contentData[pageName].page_intro,
        page_text: contentData[pageName].page_text
      });  
      break;
    case 'honoraires':
      res.status(200).render('front/mainInternalPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        icon_file_name: contentData[pageName].icon_file_name,
        page_title: contentData[pageName].page_title,
        page_intro: contentData[pageName].page_intro,
        page_text: contentData[pageName].page_text
      });  
      break;
    default:
      break;
    }
  };
};
