const {Sequelize} = require('sequelize');

const sequelize = new Sequelize ('crud_many_to_many' ,'root' ,'Prasanths@2001' , {
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize;