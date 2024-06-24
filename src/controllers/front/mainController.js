const contentData = require('../../content/data.json');

// const exphbs = require('express-handlebars');
exports.getHomePage = (req, res) => {
  // exphbs.registerPartial('')
  res.status(200).render('front/home', {
    title: contentData.home.seo_title,
    description: contentData.home.seo_description
  });
};

exports.getDomainPage = (req, res) => {
  res.status(200).render('front/mainInternalPage', {
    active_menu: contentData[req.params.slug].active_menu,
    title: contentData[req.params.slug].seo_title,
    description: contentData[req.params.slug].seo_description,
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
        description: contentData[pageName].seo_description,
        page_title: contentData[pageName].page_title,
        page_text: contentData[pageName].page_text
      });
      break;
    case 'cabinet':
      res.status(200).render('front/cabinetPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        description: contentData[pageName].seo_description,
        icon_file_name: contentData[pageName].icon_file_name,
        page_title: contentData[pageName].page_title,
        page_intro: contentData[pageName].page_intro,
        page_text: contentData[pageName].page_text
      });  
      break;
    case 'parcours':
      res.status(301).redirect('/cabinet');
      break;
    case 'honoraires':
      res.status(200).render('front/mainInternalPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        description: contentData[pageName].seo_description,
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
exports.getLandingPage = (pageName) => {
  return (req, res) => {
    switch (pageName) {
    case 'droit-penal':
      console.log('Yop');
      res.status(200).render('front/landingPage', {
        title: contentData[pageName].seo_title,
        description: contentData[pageName].seo_description,
        page_title: contentData[pageName].page_title,
        page_text: contentData[pageName].page_text,
        page_subtitle: contentData[pageName].page_subtitle,
        text_cabinet: contentData['cabinet'].page_text,
        contact_page_title: contentData['contact'].page_title,
        contact_icon_file_name : contentData['contact'].icon_file_name,
      });
      break;
    default:
      break;
    }
  };
};

exports.isCookiesAccepted = (req, res, next) => {
  if (!req.session.cookiesAccepted && !req.cookies.cookiesAccepted) {
    res.locals.showCookieConsent = true;
  } else {
    res.locals.showCookieConsent = false;
  }
  next();
};

exports.acceptCookies = (req, res) => {
  req.session.cookiesAccepted = true;
  res.cookie('cookiesAccepted', true, { maxAge: 31536000000 }); // 1 an
  res.redirect(req.headers.referer || '/');
};

exports.declineCookies = (req, res) => {
  req.session.cookiesAccepted = false;
  res.cookie('cookiesAccepted', false, { maxAge: 31536000000 }); // 1 an
  res.redirect(req.headers.referer || '/');
};

exports.googleAnalyticsMiddleware = (req, res, next) => {
  // Vérifier si les cookies ont été acceptés
  const cookiesAccepted = req.session.cookiesAccepted || req.cookies.cookiesAccepted;
  
  const nonce = req.nonce; // Récupérez le nonce attaché à la requête
  res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; img-src 'self' data: https://www.googletagmanager.com https://bonetavocat.fr; font-src 'self' https://fonts.gstatic.com;`);

  // res.locals.nonce = nonce;

  // Activer le suivi de Google Analytics si les cookies sont acceptés
  if (cookiesAccepted) {
    res.locals.showGoogleAnalytics = true; // Variable pour activer le code de suivi dans la vue
    res.locals.googleAnalyticsTrackingId = 'G-TBQH0LBJ49'; // Identifiant de suivi réel

    // Code de suivi de Google Analytics
    res.locals.googleAnalyticsCode = `
      <script async src="https://www.googletagmanager.com/gtag/js?id=${res.locals.googleAnalyticsTrackingId}" nonce="${nonce}"></script>
      <script nonce="${nonce}">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${res.locals.googleAnalyticsTrackingId}');
      </script>
    `;
  } else {
    res.locals.showGoogleAnalytics = false; // Variable pour désactiver le code de suivi dans la vue
    res.locals.googleAnalyticsTrackingId = ''; // Identifiant de suivi vide
    res.locals.googleAnalyticsCode = ''; // Code de suivi vide
  }

  next();
};