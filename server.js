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
                "View Department",
                "Add Department",
                "View Role",
                "Add Role",
                "Exit"
            ],
            name: "choice"
        }
    ]
    ).then(function ({ choice }) {
        if (choice != "Exit") {
            processChoice(choice, function () {
                init();
            })
        } else {
            process.exit();
        }
        console.log("I am here. Choice here is --> " + choice);
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

                inquirer.prompt([
                    {
                        type: "list",
                        message: "Which employee you want to remove?",
                        choices: employeeNames,
                        name: "employeeNameSelected"
                    }
                ]
                ).then(function ({ employeeNameSelected }) {
                    var splitName = employeeNameSelected.split(" ");
                    var firstName = splitName[0];
                    var lastName = splitName[1];
                    var deleteQuery = "DELETE FROM employeeTracker_DB.employees where first_name = '" + firstName + "' AND last_name = '" + lastName + "'";
                    connection.query(deleteQuery, function (err, result) {
                        if (err) throw err;
                        console.log("Number of records deleted: " + result.affectedRows);
                        callback();
                    });
                });
            });
        });
    } else if (choice === "Add Employee") {
        connection.connect((err) => {
            connection.query("SELECT * FROM employeeTracker_DB.employees", function (err, result, fields) {
                if (err) throw err;
                var employeeNames = [];
                result.forEach(element => {
                    employeeNames.push(element.first_name + " " + element.last_name);
                });

                connection.query("SELECT * FROM employeeTracker_DB.roles", function (err, result, fields) {
                    if (err) throw err;
                    var roles = [];
                    result.forEach(element => {
                        roles.push(element.title);
                    });

                    inquirer.prompt([
                        {
                            message: "What is first name?",
                            name: "suppliedFirstName"
                        },
                        {
                            message: "What is last name?",
                            name: "suppliedLastName"
                        },
                        {
                            type: "list",
                            message: "Select employee role",
                            choices: roles,
                            name: "roleSelected"
                        },
                        {
                            type: "list",
                            message: "Select employee manager",
                            choices: employeeNames,
                            name: "managerSelected"
                        }

                    ]
                    ).then(function ({ suppliedFirstName, suppliedLastName, roleSelected, managerSelected }) {
                        var getRoleFromTitle = "SELECT * FROM employeeTracker_DB.roles where title = '" + roleSelected + "'";
                        connection.query(getRoleFromTitle, function (err, result, fields) {
                            if (err) throw err;
                            var roleId = result[0].id;
                            var splitName = managerSelected.split(" ");
                            var firstName = splitName[0];
                            var lastName = splitName[1];
                            var getEmployeeFromName = "Select * from employeeTracker_DB.employees where first_name = '" + firstName + "' AND last_name = '" + lastName + "'";
                            connection.query(getEmployeeFromName, function (err, result, fields) {
                                if (err) throw err;
                                var managerId = result[0].id;
                                var insertQuery = "INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('" + suppliedFirstName + "', '" + suppliedLastName + "', " + roleId + ", " + managerId + ")";
                                console.log(insertQuery);
                                connection.query(insertQuery, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records added: " + result.affectedRows);
                                    callback();
                                });
                            });

                        });

                    });
                });
            });
        });
    }
    else if (choice === "View Department") {
        connection.connect((err) => {
            connection.query("SELECT * FROM employeeTracker_DB.department", function (err, result, fields) {
                if (err) throw err;
                console.table(result);

                callback();
            });


        });

    } else if (choice === "Add Department") {
        connection.connect((err) => {
            connection.query("SELECT * FROM employeeTracker_DB.department", function (err, result, fields) {
                var departmentName = [];
                result.forEach(element => {
                    departmentName.push(" " + element.name);
                });
                inquirer.prompt([
                    {
                        message: "What is department name?",
                        name: "suppliedDepartmentName"
                    }
                ]
                ).then(function ({ suppliedDepartmentName }) {
                    var getDepartmentGivenName = "INSERT INTO department(name) VALUES('" + suppliedDepartmentName + "')";
                    connection.query(getDepartmentGivenName, function (err, result, fields) {
                        if (err) throw err;
                        callback();
                    });

                });





            });

        });

    } else if (choice === "View Role") {
        connection.connect((err) => {
            connection.query("SELECT * FROM employeeTracker_DB.roles", function (err, result, fields) {
                if (err) throw err;
                console.table(result);
                callback();
            });
        });

    } else if (choice === "Add Role") {
        connection.connect((err) => {
            connection.query("SELECT * FROM employeeTracker_DB.department", function (err, result, fields) {
                if (err) throw err;
                var deprt = [];
                result.forEach(element => {
                    deprt.push(element.name);
                });

                inquirer.prompt([
                    {
                        message: "What is role name?",
                        name: "suppliedRoleName"
                    },
                    {
                        message: "What is salary for this role?",
                        name: "suppliedRoleSalary"
                    },
                    {
                        type: "list",
                        message: "Select department for this role?",
                        choices: deprt,
                        name: "selectedDepart"
                    }

                ]
                ).then(function ({ suppliedRoleName, suppliedRoleSalary, selectedDepart }) {
                    var getDepartmentFromName = "SELECT * FROM employeeTracker_DB.department where name = '" + selectedDepart + "'";
                    connection.query(getDepartmentFromName, function (err, result, fields) {
                        if (err) throw err;
                        var insertNewRole = "INSERT INTO roles(title, salary, department_id) VALUES('" + suppliedRoleName + "', '" + suppliedRoleSalary + "', '" + result[0].id + "')";
                        connection.query(insertNewRole, function (err, result, fields) {
                            if (err) throw err;
                            console.log("Rows impacted:" + result);
                            callback();
                        });
                    });
                    

                });
            });

        });

    }



}


init();