const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('CRUD','root','Prasanths@2001',{
    host:'localhost',
    dialect:'mysql'
})

async function testSequellizeConnection() {
    try {
      await sequelize.authenticate();
      console.log('MySQL connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to MySQL database:', error);
    }
  }
  
  // Call the function to test MySQL connection
  testSequellizeConnection();






module.exports=sequelize;



