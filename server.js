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

function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Remove Employee",
                "Exit"
            ],
            name: "choice"
        }
    ]
    ).then(function ({ choice }) {
        if (choice != "Exit") {
            processChoice(choice, function() {
                init();
            })
        } else {
            process.exit();
        } 
        console.log("I am here. Choice here is --> "+ choice);
    });
}

function processChoice(choice, callback) {
    console.log("Got choice-> " + choice);
    if (choice === "View All Employees") {
        connection.connect((err) => {
            connection.query("SELECT * FROM employeeTracker_DB.employees", function (err, result, fields) {
                if (err) throw err;
                console.table(result);
                callback();
              });            
        });
    } else if (choice === "Remove Employee") {
        connection.connect((err) => {
            connection.query("SELECT * FROM employeeTracker_DB.employees", function (err, result, fields) {
                if (err) throw err;

                var employeeNames = [];
                result.forEach(element => {
                    employeeNames.push(element.first_name + " " + element.last_name);
                });
                console.log(employeeNames);
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Which employee you want to remove?",
                        choices: employeeNames,
                        name: "employeeNameSelected"
                    }
                ]
                ).then(function ({ employeeNameSelected }) {
                    console.log("employeeNameSelected --> "+ employeeNameSelected);
                    var splitName = employeeNameSelected.split(" ");
                    var firstName = splitName[0];
                    var lastName = splitName[1];
                    var deleteQuery = "DELETE FROM employeeTracker_DB.employees where first_name = '" + firstName + "' AND last_name = '" + lastName + "'";
                    console.log("My dlete query--> "+ deleteQuery);
                    connection.query(deleteQuery, function (err, result) {
                        if (err) throw err;
                        console.log("Number of records deleted: " + result.affectedRows);
                        callback();  
                    });
                    
                });
                
              });            
        });
    } else {
        callback();
    }
}

init();