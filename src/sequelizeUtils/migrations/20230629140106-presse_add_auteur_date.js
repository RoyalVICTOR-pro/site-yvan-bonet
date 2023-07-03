'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('articles', 'auteur', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('articles', 'date_article', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('articles', 'auteur'),
      queryInterface.removeColumn('articles', 'date_article'),
    ]);
  }
};
