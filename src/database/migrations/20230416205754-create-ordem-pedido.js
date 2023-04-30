'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('ordems',
      {

        id_pedido: {
          type: Sequelize.INTEGER,
          allowNull: true,
          autoIncrement: true,
          primaryKey: true,
        },


        id_usuario: {
          type: Sequelize.STRING,
          required: true
        },

        name_usuario: {
          type: Sequelize.STRING,
          required: true
        },

        id_produto: {
          type: Sequelize.STRING,
          required: true
        },

        name_produto: {
          type: Sequelize.STRING,
          required: true
        },

        price: {
          type: Sequelize.INTEGER,
          required: true
        },

        id_categoria: {
          type: Sequelize.STRING,
          required: true
        },

        name_categoria: {
          type: Sequelize.STRING,
          required: true
        },

        url: {
          type: Sequelize.STRING,
          required: true
        },

        quantidade: {
          type: Sequelize.INTEGER,
          required: true
        },

        status: {
          type: Sequelize.STRING,
          defaultValue: 'Novo Pedido',
          required: true,
        },
        
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }



      });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('ordems');

  }

};
