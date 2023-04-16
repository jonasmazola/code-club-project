'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'categoria_id', {
      type: Sequelize.INTEGER,
      references: {model: 'categoria', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('products', 'categoria_id');

  }
};
