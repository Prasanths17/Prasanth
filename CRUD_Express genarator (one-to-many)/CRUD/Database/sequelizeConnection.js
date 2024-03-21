const {Sequelize} = require('sequelize');

const sequelize = new Sequelize ('crud_one_to_many' ,'root' ,'Prasanths@2001' , {
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize;