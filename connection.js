
const mysql = require('mysql');
const inquirer = require('inquirer');

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


connection.query("SELECT * FROM employeeTracker_DB.employees", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});