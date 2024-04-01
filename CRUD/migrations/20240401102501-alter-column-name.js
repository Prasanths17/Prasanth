'use strict';

const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('userDetails' , 'firstName' , 'fullName');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('userDetails', 'fullName' , 'firstName');
  }
};
