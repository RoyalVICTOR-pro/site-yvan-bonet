const express = require('express');
const frontMainController = require('../controllers/front/mainController');

const router = express.Router();

router.get('/', frontMainController.getHomePage);
// router.get('/domaine-intervention/:slug', viewsController.getTour);

router.get('/domaines-interventions/:slug/', frontMainController.getDomainPage);

router.get('/parcours', frontMainController.getPage('parcours'));

router.get('/honoraires', frontMainController.getPage('honoraires'));

router.get('/mentions-legales', frontMainController.getPage('mentions-legales'));
router.get('/politique-confidentialite', frontMainController.getPage('politique-confidentialite'));

router.get('/contact', frontMainController.getContactPage);
router.post('/contact', frontMainController.receiveNewContact);

module.exports = router;
