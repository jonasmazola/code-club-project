'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categoria', 'path',
      {
        type: Sequelize.STRING

      });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categoria', 'path');

  }
};
