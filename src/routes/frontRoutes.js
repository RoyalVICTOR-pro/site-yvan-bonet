const express = require('express');
const frontMainController = require('../controllers/front/mainController');

const router = express.Router();

router.get('/', frontMainController.getHomePage);
// router.get('/domaine-intervention/:slug', viewsController.getTour);

router.get('/domaines-interventions/:slug/', frontMainController.getDomainPage);

module.exports = router;
