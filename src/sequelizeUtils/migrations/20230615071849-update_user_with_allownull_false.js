'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users', 'email'),
      queryInterface.changeColumn('Users', 'password')
    ]);
  }
};
