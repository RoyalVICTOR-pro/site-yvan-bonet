'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    prenom: {
      type: DataTypes.STRING,
      allowNull:false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull:false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull:true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Contact',
  });

  Contact.createNewContact = async (formData) => {
    await Contact.create(formData).catch((err) => {
      console.log('Erreur dans le model lors de la création d\'un nouveau contact : ', err);
      return Promise.reject(err);
    });
    return Contact;
  };

  Contact.deleteContact = async (sendedID) => {
    await Contact.destroy({
      where: {
        id: sendedID
      }
    });
    return Contact;
  };

  return Contact;
};