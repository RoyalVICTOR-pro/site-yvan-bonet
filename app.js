const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const AppError = require('./src/utils/appError');
// const globalErrorHandler = require('./src/controllers/errorController');

const frontRouter = require('./src/routes/frontRoutes');
const backRouter = require('./src/routes/backRoutes');

const app = express();

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/src/views/layouts/',
  partialsDir: __dirname + '/src/views/partials/',
});

Handlebars.registerHelper('equal', function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error('Handlebars Helper equal needs 2 parameters');
  if( lvalue!=rvalue ) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views/'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Developping logging
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// On limite le nombre de requête à 1000 pour 1h.
const limiter = rateLimit({
  max: 100,
  windowMilliseconds: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// On utilise le limiter pour toutes les URL commencant par /api.
// Attention, le décompte se fait pour toutes les URL commencant par /api
// donc s'il y a 3 requêtes sur 3 url différentes, les 3 seront décomptées du nombre max (ici 100).
app.use('/', limiter);

// BodyParser : La première ligne parse les données de requètes
// Avec une Sécurité : on limit le poids des échanges.
// La deuxième parse les données des cookies
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());


// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// Gère le cas où des paramètres sont passés plusieurs fois.
// Si on envoie ?sort=price&sort=duration on aura une erreur si on utilise pas le middleware hpp.
// Par contre dans certains cas, on veut pouvoir avoir 2 fois le même paramètre,
// on peut alors whitelister ces paramètres
app.use(
  hpp({
    whitelist: [],
  })
);


// 3) ROUTES
app.use('/', frontRouter);

app.use('/admin', backRouter);

// Si on arrive ici c'est qu'aucun des router n'a pu gérér la route appelée, alors on gère un 404 en JSON étant donné qu'on travaille sur une API.
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR HANDLING MIDDLEWARE
// app.use(globalErrorHandler);

module.exports = app;