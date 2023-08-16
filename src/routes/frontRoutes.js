const express = require('express');
const frontMainController = require('../controllers/front/mainController');
const contactController = require('../controllers/front/contactController');
const presseController = require('../controllers/front/presseController');

const router = express.Router();

router.use(frontMainController.isCookiesAccepted);
router.use(frontMainController.googleAnalyticsMiddleware);
router.get('/', frontMainController.getHomePage);
// router.get('/domaine-intervention/:slug', viewsController.getTour);

router.get('/domaines-interventions/:slug/', frontMainController.getDomainPage);

router.get('/parcours', frontMainController.getPage('parcours'));
router.get('/cabinet', frontMainController.getPage('cabinet'));

router.get('/honoraires', frontMainController.getPage('honoraires'));

router.get('/presse', presseController.getPressePage);

router.get('/mentions-legales', frontMainController.getPage('mentions-legales'));
router.get('/politique-confidentialite', frontMainController.getPage('politique-confidentialite'));

router.get('/contact', contactController.getContactPage);
router.post('/contact', contactController.receiveNewContact);

// Routes pour gérer la bande des cookies
router.post('/accept-cookies', frontMainController.acceptCookies);
router.post('/decline-cookies', frontMainController.declineCookies);

module.exports = router;
