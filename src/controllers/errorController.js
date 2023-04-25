const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid Token. Please log in again', 401);

const handleJWTExpiredError = (err) =>
  new AppError('Token Expired. Please log in again', 401);

const sendErrorDev = (err, req, res) => {
  // ERROR FOR API
  if (req.originalUrl.toString().startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      err: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // ERROR FOR RENDERED WEBSITE
  console.log('ERROR ', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) ERROR FOR API
  if (req.originalUrl.toString().startsWith('/api')) {
    // Erreur fonctionnelle qu'on connaît
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // Erreur de programmation ou inconnnues, évite ainsi de faire fuiter des informations sur le code.

    // 1) On logge l'erreur pour la voir sur les logs du service d'hébergement. Heroku permet de faire ca apparemment.
    console.log('ERROR ', err);

    // 2) On renvoie un message générique.
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // B) ERROR FOR RENDERED WEBSITE
  // Erreur fonctionnelle qu'on connaît
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'Something went wrong!',
      message: err.message,
    });
  }

  // Erreur de programmation ou inconnnues, évite ainsi de faire fuiter des informations sur le code.

  // 1) On logge l'erreur pour la voir sur les logs du service d'hébergement. Heroku permet de faire ca apparemment.
  console.log('ERROR ', err);

  // 2) On renvoie un message générique.
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV.toString() === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV.toString() === 'production') {
    // On utilise cette petite astuce pour copier l'objet error.
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, req, res);
  }
};
