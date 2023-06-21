const db = require('../../models/index');
const ContactModel = require('../../models/contact');
const Contact = ContactModel(db.sequelize, db.Sequelize);

exports.getContactsList = (req, res, next) => {
  

  res.status(200).render('back/contacts', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs'
  });
};