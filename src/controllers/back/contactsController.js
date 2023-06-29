const db = require('../../models/index');
const moment = require('moment');
const ContactModel = require('../../models/contact');
const Contact = ContactModel(db.sequelize, db.Sequelize);

exports.getContactsList = async (req, res) => {
  const contacts = await Contact.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  });
  console.log('contacts :>> ', contacts);
  const cleanedContacts = contacts.map(contact => {
    console.log('contact dans map :>> ', contact);
    const formattedDate = moment(contact.dataValues.createdAt).format('DD/MM/YYYY [à] HH:mm');
    return {
      id: contact.dataValues.id,
      date: formattedDate,
      nom: contact.dataValues.nom,
      prenom: contact.dataValues.prenom,
      email: contact.dataValues.email
    };
  });

  res.status(200).render('back/contacts', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs',
    contacts: cleanedContacts
  });
};

exports.getContactDetails = async (req, res) => {
  const contact = await Contact.findOne({ where: { id: req.params.id } });
  console.log('contact :>> ', contact);
  const formattedDate = moment(contact.dataValues.createdAt).format('DD/MM/YYYY [à] HH:mm');
  const cleanedContact = {
    id: contact.dataValues.id,
    date: formattedDate,
    nom: contact.dataValues.nom,
    prenom: contact.dataValues.prenom,
    email: contact.dataValues.email,
    telephone: contact.dataValues.telephone,
    message: contact.dataValues.message
  };

  res.status(200).render('back/contact', {
    title: 'Yvan Bonet',
    layout: 'backMain.hbs',
    contact: cleanedContact
  });
};