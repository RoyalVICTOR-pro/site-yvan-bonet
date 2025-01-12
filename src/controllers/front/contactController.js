require('dotenv').config({ path: __dirname + '/../../../config.env', debug: true });
const nodemailer = require('nodemailer');
const contentData = require('../../content/data.json');
const db = require('../../models/index');
const ContactModel = require('../../models/contact');
const Contact = ContactModel(db.sequelize, db.Sequelize);

const dotenv = require('dotenv');
dotenv.config();

var EMAIL_HOST = process.env.EMAIL_HOST;
var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
var EMAIL_PORT = process.env.EMAIL_PORT;
var EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const mailTransporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
});

// var errorMailTransporter;
// mailTransporter.verify(function (error, success) {
//   console.log('EMAIL_HOST : ', EMAIL_HOST);
//   console.log('EMAIL_USERNAME : ', EMAIL_USERNAME);
//   console.log('EMAIL_PORT : ', EMAIL_PORT);
//   console.log('EMAIL_PASSWORD : ', EMAIL_PASSWORD);

//   if (error) {
//     console.log('Erreur MailTransporter : ', error);
//     errorMailTransporter = error;
//   } else {
//     console.log(success);
//     console.log('Server is ready to take our messages');
//   }
// });

exports.getContactPage = (req, res) => {
  res.status(200).render('front/contact', {
    active_menu: contentData.contact.active_menu,
    title: contentData.contact.seo_title,
    description: contentData.contact.seo_description,
    icon_file_name: contentData.contact.icon_file_name,
    page_title: contentData.contact.page_title
  });
};

exports.receiveNewContact = async (req, res) => {

  // DATA VALIDATION
  if (!req.body.nom.trim()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Erreur : le champ nom est obligatoire.',
      data: req.body,
    });
  }

  if (!req.body.email.trim()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Erreur : le champ email est obligatoire.',
      data: req.body,
    });
  }
  
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(req.body.email.trim())) {
    return res.status(400).json({
      status: 'fail',
      message: 'Erreur : l\'email n\'est pas valide.',
      data: req.body,
    });
  }

  if (!req.body.message.trim()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Erreur : le champ message est obligatoire.',
      data: req.body,
    });
  }

  // EMAIL PREPARING
  let messageConfiguration = {
    from: 'contact@bonetavocat.com',
    to: 'contact@bonetavocat.com',
    cc: 'royal.victor.pro@gmail.com',
    subject: 'Nouveau contact par le site - Bonetavocat.com',
    html: `<html>
            <body>
              <table>
                <tr>
                  <td><b>Prénom : </b></td>
                  <td>${req.body.prenom}</td>
                </tr>
                <tr>
                  <td><b>Nom : </b></td>
                  <td>${req.body.nom}</td>
                </tr>
                <tr>
                  <td><b>Email : </b></td>
                  <td>${req.body.email}</td>
                </tr>
                <tr>
                  <td><b>Téléphone : </b></td>
                  <td>${req.body.telephone}</td>
                </tr>
                <tr>
                  <td colspan="2"><b>Message : </b></td>
                </tr>
                <tr>
                  <td colspan="2">${req.body.message}</td>
                </tr>
              </table>
            </body>
          </html>`
  };

  if (process.env.NODE_ENV === 'development') {
    messageConfiguration.subject = 'Nouveau contact par le site - Bonetavocat.com - Dev Mode';
    messageConfiguration.to = 'royal.victor.pro@gmail.com';
    messageConfiguration.cc = '';
  }

  try { 
    const newContact = await Contact.createNewContact(req.body);
    await mailTransporter.sendMail(messageConfiguration);
    res.status(201).json({
      status: 'success',
      data: newContact,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail here',
      data: err,
    });
  }

};