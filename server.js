// Il faut installer dotenv via npm i dotenv
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const host = (process.env.NODE_ENV === 'development') ? process.env.LOCAL_DATABASE_HOST : process.env.PROD_DATABASE_HOST
const database = (process.env.NODE_ENV === 'development') ? process.env.LOCAL_DATABASE_NAME : process.env.PROD_DATABASE_NAME
const username = (process.env.NODE_ENV === 'development') ? process.env.LOCAL_DATABASE_USERNAME : process.env.PROD_DATABASE_USERNAME
const password = (process.env.NODE_ENV === 'development') ? process.env.LOCAL_DATABASE_PASSWORD : process.env.PROD_DATABASE_PASSWORD

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  port: process.env.MYSQL_PORT
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  const app = require('./app');

  const PORT_TO_USE = process.env.PORT;
  console.log("PORT_TO_USE", PORT_TO_USE);
  const server = app.listen(PORT_TO_USE, () => {
    console.log(`App running on port ${PORT_TO_USE}...`);
  });
}).catch((error) => {
  console.error('AN ERROR OCCURS : ', error);
});
/* 
// On ferme le serveur et l'application ici. Le serveur d'hébergement doit avoir un mécanisme qui relance le serveur automatiquement.
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Shutting down...');
  process.exit(1);
});





sequelize.authenticate().then(()=>{
    console.log("Connected !");
    
    const app = require('./app');

    // console.log(process.env);
    
    const PORT_TO_USE = process.env.PORT;
    const server = app.listen(PORT_TO_USE, () => {
      console.log(`App running on port ${PORT_TO_USE}...`);
    });
  
    app.listen(config.port,() => console.log("Started"));

}).catch((err)=>{
    console.log("Error during connexion : " + err.message);
});


// On ferme le serveur et l'application ici. Le serveur d'hébergement doit avoir un mécanisme qui relance le serveur automatiquement.
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
 */