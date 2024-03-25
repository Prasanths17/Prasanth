const {createPool} = require('mysql2');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"Prasanths@2001",
    database: "CRUD",
    connectionLimit: 10
})

pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting MySQL connection from pool:', err);
      return;
    }
  
    console.log('Connected to MySQL server from pool as id', connection.threadId);
  
    // Release the connection back to the pool
    connection.release();
  });

module.exports = pool;