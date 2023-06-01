// require('dotenv').config({path: __dirname+'/../../../config.env',debug:true});

const database = process.env.LOCAL_DATABASE_NAME;
const username = process.env.LOCAL_DATABASE_USERNAME;
const password = process.env.LOCAL_DATABASE_PASSWORD;
const host = process.env.LOCAL_DATABASE_HOST;
const port = process.env.MYSQL_PORT;

/* ATTENTION, le port a été utile pour que cela fonctionne. Sinon, il m'indiquait base de données 'yvanbonet' inconnue */

module.exports = {
  'development': {
    'username': username,
    'password': password,
    'database': database,
    'host': host,
    'dialect': 'mysql',
    'port': port
  },
  'test': {
    'username': process.env.LOCAL_DATABASE_USERNAME,
    'password': process.env.LOCAL_DATABASE_PASSWORD,
    'database': process.env.LOCAL_DATABASE_NAME,
    'host': process.env.LOCAL_DATABASE_HOST,
    'dialect': 'mysql',
    'port': port
  },
  'production': {
    'username': process.env.PROD_DATABASE_USERNAME,
    'password': process.env.PROD_DATABASE_PASSWORD,
    'database': process.env.PROD_DATABASE_NAME,
    'host': process.env.PROD_DATABASE_HOST,
    'dialect': 'mysql',
    'port': port
  }
};