'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userDetails' , [
      {
        fullName : "Prasanth",
        email : "prass@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date() ,
        age:22
      },
      {
        fullName : "Agilan",
        email : "agil@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date(),
        age:19
      },{
        fullName : "Aarthi",
        email : "aarthi@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date(),
        age:21
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userDetails' , null , {})
  }
};
