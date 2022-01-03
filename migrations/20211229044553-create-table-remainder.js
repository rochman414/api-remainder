'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('table_remainders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jenis_remainder: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nama_remainder: {
        type: Sequelize.STRING
      },
      tagihan: {
        type: Sequelize.STRING
      },
      tgl_tagihan_telah_lunas: {
        type: Sequelize.STRING
      },
      tgl_jatuh_tempo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      keterlambatan_bayar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('table_remainders');
  }
};