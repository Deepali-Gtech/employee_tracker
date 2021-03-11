const { connect } = require('http2');
const mysql = require('mysql');
const { connected } = require('process');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'employeeTracker_DB',
});
connection.connect((err) => {
    if (err) throw err;
    console.log("connected");

   
  });