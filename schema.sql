DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  name_department VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
 id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(9,3),
department_id INT,
FOREIGN KEY(department_id) REFERENCES departments(id),
PRIMARY KEY (id)
);

CREATE TABLE employees(
id INT AUTO_INCREMENT NOT NULL ,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
PRIMARY KEY (id)
);