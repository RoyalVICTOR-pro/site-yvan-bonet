'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Articles', 'extract', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    queryInterface.changeColumn('Articles', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Articles', 'extract', {
      type: Sequelize.STRING,
      allowNull: true
    });
    queryInterface.changeColumn('Articles', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
