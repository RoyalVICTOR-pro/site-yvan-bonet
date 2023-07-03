'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Articles', 'auteur', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Articles', 'date_article', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Articles', 'auteur'),
      queryInterface.removeColumn('Articles', 'date_article'),
    ]);
  }
};
