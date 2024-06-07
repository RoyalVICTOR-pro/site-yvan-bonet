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

/* 
Le middleware protect est utilisé pour vérifier si l'utilisateur est authentifié. 
Cela signifie qu'il vérifie si un utilisateur a un jeton d'authentification valide avant de permettre l'accès à certaines routes protégées.
Il effectue plusieurs vérifications, notamment la vérification de l'existence du jeton, la vérification de son intégrité et la vérification si l'utilisateur auquel il est associé existe toujours.
Si l'utilisateur n'est pas authentifié (par exemple, s'il n'a pas de jeton valide), le middleware redirige généralement l'utilisateur vers une page de connexion ou une autre page appropriée.
Ce middleware est généralement utilisé sur des routes qui nécessitent une authentification pour accéder, comme l'accès à des données sensibles ou à des fonctionnalités réservées aux utilisateurs connectés. 
*/
router.use(userController.protect);
/* 
Le middleware isLoggedIn est utilisé pour déterminer si un utilisateur est connecté, mais il ne traite pas l'authentification à proprement parler. Au lieu de cela, il vérifie simplement si un jeton d'authentification valide est présent dans les cookies de la demande.
Si un jeton valide est trouvé, ce middleware récupère les informations de l'utilisateur à partir du jeton et les ajoute généralement à l'objet res.locals pour que ces informations soient disponibles dans les vues ou les templates.
Si l'utilisateur n'est pas connecté (c'est-à-dire qu'il n'y a pas de jeton valide), ce middleware ne bloque pas l'accès à la route, mais plutôt il continue à exécuter la logique de la route sans les informations de l'utilisateur connecté.
Ce middleware est souvent utilisé pour des fonctionnalités qui peuvent être accessibles même si l'utilisateur n'est pas authentifié, mais qui peuvent nécessiter un comportement différent si l'utilisateur est connecté (par exemple, afficher un message de bienvenue).
*/
router.use(userController.isLoggedIn);

router.use(backMainController.setCurrentPageInfo('contacts'));
router.get('/contacts', contactsController.getContactsList);
router.get('/contact/:id', contactsController.getContactDetails);
router.get('/contact/supprimer/:id', contactsController.deleteContact);
router.use(backMainController.setCurrentPageInfo('presse'));
router.get('/presse/articles', presseController.getPresseList);
router.get('/presse/article/ajouter', presseController.createArticlePage);
router.post('/presse/article/ajouter', presseController.createArticle);
router.get('/presse/article/:id', presseController.getArticleDetails);
router.post('/presse/article/modifier/:id', presseController.updateArticle);
router.get('/presse/article/supprimer/:id', presseController.deleteArticle);


module.exports = router;
