const express = require('express');
const backMainController = require('../controllers/back/mainController.js');

const router = express.Router();

router.get('/', backMainController.getLoginPage);
// router.get('/domaine-intervention/:slug', viewsController.getTour);

module.exports = router;
