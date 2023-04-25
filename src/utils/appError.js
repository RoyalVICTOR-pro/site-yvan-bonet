class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // On ajoute ici une propriété isOperational afin de différencier facilement les erreurs
    // qui viennent de notre code et les erreurs autres qui n'auront pas cette propriété.
    this.isOperational = true;

    // On capture ici la stackTrace pour éviter que le constructor de cette classe ne vienne polluer la stackTrace.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
