const mysql = require('mysql');
const inquirer = require('inquirer');

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
        }
    });
}

function processChoice(choice, callback) {
    console.log("Got choice-> " + choice);
    callback();
}

init();