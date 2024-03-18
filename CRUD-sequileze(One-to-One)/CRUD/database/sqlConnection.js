const {createPool} = require('mysql2');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"Prasanths@2001",
    database: "CRUD",
    connectionLimit: 10
})


module.exports = pool;