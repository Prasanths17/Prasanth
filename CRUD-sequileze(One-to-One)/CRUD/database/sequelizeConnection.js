const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('CRUD','root','Prasanths@2001',{
    host:'localhost',
    dialect:'mysql',
    logging: (sql) => {
        console.log(sql); // Custom logging function
    } 
})


module.exports=sequelize;

