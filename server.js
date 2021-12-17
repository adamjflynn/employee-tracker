const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
const db = require('./db/connection');

initialPrompt();

function initialPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: "Please choose and option from the list.",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Exit" 
        ]
    })
   .then((choice) => {
        switch (choice.menu) {
            case "View All Employees":
            viewEmployees(); 
            break;

            case "View All Departments":
            viewDepartments(); 
            break; 

            case "View All Roles":
            viewRoles(); 
            break; 

            case "Add Employee":
            addEmployee(); 
            break; 

            case "Add Department":
            addDepartment(); 
            break; 

            case "Add Role":
            addRole(); 
            break; 
            
            case "Update Employee Role":
            updateEmployeeRole(); 
            break; 
            
            case "Exit":
            Connection.end();
            break; 
        }
    })
};