const express = require('express');
const backMainController = require('../controllers/back/mainController.js');
const userController = require('../controllers/back/userController.js');
const contactsController = require('../controllers/back/contactsController.js');
const presseController = require('../controllers/back/presseController.js');

const router = express.Router();

/* 
ROUTES SERVANT A CREER UN UTILISATEUR ADMIN 
A commenter pour éviter les failles de sécurité
*/
// router.get('/users/create', userController.getUserCreationPage);
// router.post('/users/create', userController.createUser);

// Page par défaut
router.get('/', userController.protect, backMainController.redirectToDefaultHomePage);

router.get('/login', backMainController.getLoginPage);
router.post('/users/login', userController.login);
router.get('/logout', userController.logout);

router.use(userController.protect);
router.use(userController.isLoggedIn);

router.use(backMainController.setCurrentPageInfo('contacts'));
router.get('/contacts', contactsController.getContactsList);
router.get('/contact/:id', contactsController.getContactDetails);
router.use(backMainController.setCurrentPageInfo('presse'));
router.get('/presse/articles', presseController.getPresseList);
router.get('/presse/article/ajouter', presseController.createArticlePage);
router.post('/presse/article/ajouter', presseController.createArticle);
router.get('/presse/article/:id', presseController.getArticleDetails);
router.post('/presse/article/modifier/:id', presseController.updateArticle);
router.get('/presse/article/supprimer/:id', presseController.deleteArticle);


module.exports = router;
