require('dotenv').config({ path: __dirname + '/../../../config.env', debug: true });
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const UserModel = require('../../models/user');
const User = UserModel(db.sequelize, db.Sequelize);

const dotenv = require('dotenv');
dotenv.config();

exports.getUserCreationPage = (req, res) => {
  res.status(200).render('back/createUser', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs'
  });
};

exports.login = async (req, res) => {
  try {
    const username = req.body.inputEmail.trim();
    const password = req.body.inputPassword.trim();
    
    // Valider les champs du formulaire
    if (!username.trim() || !password.trim()) {
      req.session.errorMessage = 'Veuillez fournir un nom d\'utilisateur et un mot de passe.';
      return res.redirect('/admin/login');
    }
    
    // Rechercher l'utilisateur en base de données
    const user = await User.findOne({ where: { email:username } });
    if (!user) {
      req.session.errorMessage = 'Identifiant ou mot de passe incorrect.';
      return res.redirect('/admin/login');
    }
    
    // Vérifier que le mot de passe correspond
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.session.errorMessage = 'Identifiant ou mot de passe incorrect.';
      return res.redirect('/admin/login');
    }
    
    // Créer et envoyer le token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 60 });
    res.cookie('token', token, { httpOnly: true, maxAge: process.env.JWT_COOKIE_EXPIRES_IN });
    
    // Rediriger l'utilisateur vers la page contacts (ou toute autre page appropriée)
    res.redirect('/admin/contacts');
  } catch (error) {
    // console.error(error);
    req.session.errorMessage = 'Il y a eu problème lors de l\'authentification.';
    return res.redirect('/admin/login');
  }
},

exports.protect = async (req, res, next) => {
  try {
    // 1) Check if the token exists
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      // req.session.errorMessage = 'Merci de vous connecter.';
      return res.redirect('/admin/login');
    }

    // 2) Verify the token - On vérifie que le token n'a pas été manipulé/modifié.
    // La fonction jwt.verify() attend normalement une callback.
    // Pour éviter de devoir fonctionner avec des callbacks,
    // on utilise la méthode promisify qui est fournie par le package 'util' qui est intégré à NodeJS.
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log('decoded :>> ', decoded);

    // 3) Check if user still exists
    const existingUser = await User.findOne({ where: { id: decoded.userId } });
    if (!existingUser) {
      req.session.errorMessage = 'Cet utilisateur n\'existe plus.';
      return res.redirect('/admin/login');
    }
    /* 
    // 4) Check if user changed password after the token was generated
    // Si la fonction changedPasswordAfter renvoie true, c'est que le mot de passe a été changé après la génération du token
    // On envoie alors une erreur.
    if (existingUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again', 401)
      );
    } 
    */

    // Si on a passé toutes les étapes ci-dessus, là on peut passer à la suite, on donne donc accès aux routes protégées.
    // console.log('USER FOR TEST IN PROTECT : ', req.user);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      req.session.errorMessage = 'La session a expiré. Veuillez vous reconnecter.';
    } else if (err.name === 'JsonWebTokenError') {
      req.session.errorMessage = 'Le token n\'est pas valide.';
    } else if (err.name === 'NotBeforeError') {
      req.session.errorMessage = 'Il y a eu un problème d\'authentification.';
    } else if (err.name === 'TokenRevokedError') {
      req.session.errorMessage = 'Le token a été révoqué.';
    } else {
      req.session.errorMessage = 'Il y a eu un problème d\'authentification.';
    }
    return res.redirect('/admin/login');
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.token,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findOne({ where: { id: decoded.userId } });
      if (!currentUser) {
        return next();
      }

      // Si on a passé toutes les étapes ci-dessus, on décrète que l'utilisateur est un utilisateur connecté.
      // Ici on place une variable utilisateur dans les variables locales qui sont envoyées au template,
      // là user est l'équivalent de la variable tour par exemple dans la page tour.
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    // Ici, on passe à la suite quoi qu'il arrive.
    return next();
  }
  next();
};

exports.logout = async (req, res) => {
  // Effacer le cookie contenant le token
  res.clearCookie('token');

  // Rediriger l'utilisateur vers la page de connexion ou toute autre page appropriée
  res.redirect('/admin/login');
};

exports.createUser = async (req, res) => {
  // console.log('req.body :>> ', req.body);
  try {
    const username = req.body.inputEmail.trim();
    const password = req.body.inputPassword.trim();
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email:username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }
    
    // Crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer un nouvel utilisateur en base de données
    const newUser = await User.create({ email:username, password: hashedPassword });
    
    // Répondre avec succès
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
};