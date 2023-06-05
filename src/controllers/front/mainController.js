require('dotenv').config({ path: __dirname + '/../../../config.env', debug: true });
const nodemailer = require('nodemailer');
const contentData = require('../../content/data.json');
const db = require('../../models/index');
const ContactModel = require('../../models/contact');
const Contact = ContactModel(db.sequelize, db.Sequelize);

const dotenv = require('dotenv');
dotenv.config();

var TEST_EMAIL_HOST = process.env.EMAIL_HOST;
var TEST_EMAIL_USERNAME = process.env.EMAIL_USERNAME;
var TEST_EMAIL_PORT = process.env.EMAIL_PORT;
var TEST_EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const mailTransporter = nodemailer.createTransport({
  host: TEST_EMAIL_HOST,
  port: TEST_EMAIL_PORT,
  auth: {
    user: TEST_EMAIL_USERNAME,
    pass: TEST_EMAIL_PASSWORD
  }
});

// const exphbs = require('express-handlebars');

exports.getHomePage = (req, res) => {
  console.log('Entrée dans getHomePage');
  // exphbs.registerPartial('')
  res.status(200).render('front/home', {
    title: contentData.home.seo_title
  });
};

exports.getDomainPage = (req, res) => {
  res.status(200).render('front/mainInternalPage', {
    active_menu: contentData[req.params.slug].active_menu,
    seo_title: contentData[req.params.slug].seo_title,
    icon_file_name: contentData[req.params.slug].icon_file_name,
    page_title: contentData[req.params.slug].page_title,
    page_intro: contentData[req.params.slug].page_intro,
    page_text: contentData[req.params.slug].page_text,
  });
};

exports.getPage = (pageName) => {
  return (req, res) => {
    switch (pageName) {
    case 'mentions-legales':
    case 'politique-confidentialite':
      res.status(200).render('front/legalPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        page_title: contentData[pageName].page_title,
        page_text: contentData[pageName].page_text
      });
      break;
    case 'parcours':
      res.status(200).render('front/parcoursPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        icon_file_name: contentData[pageName].icon_file_name,
        page_title: contentData[pageName].page_title,
        page_intro: contentData[pageName].page_intro,
        page_text: contentData[pageName].page_text
      });  
      break;
    case 'honoraires':
      res.status(200).render('front/mainInternalPage', {
        active_menu: contentData[pageName].active_menu,
        title: contentData[pageName].seo_title,
        icon_file_name: contentData[pageName].icon_file_name,
        page_title: contentData[pageName].page_title,
        page_intro: contentData[pageName].page_intro,
        page_text: contentData[pageName].page_text
      });  
      break;
    default:
      break;
    }
  };
};

exports.getContactPage = (req, res) => {
  res.status(200).render('front/contact', {
    active_menu: contentData.contact.active_menu,
    title: contentData.contact.seo_title,
    icon_file_name: contentData.contact.icon_file_name,
    page_title: contentData.contact.page_title, 
    test_email_host: TEST_EMAIL_HOST,
    test_email_username: TEST_EMAIL_USERNAME,
    test_email_port: TEST_EMAIL_PORT,
    test_email_password: TEST_EMAIL_PASSWORD,
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
      data: err
    });
  }

};