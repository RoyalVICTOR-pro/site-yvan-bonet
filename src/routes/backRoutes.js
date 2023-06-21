const express = require('express');
const backMainController = require('../controllers/back/mainController.js');
const userController = require('../controllers/back/userController.js');
const contactsController = require('../controllers/back/contactsController.js');

const router = express.Router();

// Page par défaut
router.get('/', userController.protect, backMainController.redirectToDefaultHomePage);

router.get('/login', backMainController.getLoginPage);
router.post('/users/login', userController.login);
router.get('/logout', userController.logout);

router.use(userController.protect);
router.use(userController.isLoggedIn);
router.get('/contacts', contactsController.getContactsList);

/* ROUTES SERVANT A CREER UN UTILISATEUR ADMIN */
// router.get('/users/create', userController.getUserCreationPage);
// router.post('/users/create', userController.createUser);

module.exports = router;
