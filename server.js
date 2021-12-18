const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
const db = require('./db');
const { listenerCount } = require('events');
const Connection = require('./db/connection');


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

// View Tables

function viewEmployees() {
    db.findAllEmployees()
    .then(([employees]) => {
        console.table(employees)
    })
    .then(() => initialPrompt())    
};
function viewDepartments() {
    db.findAllDept()
    .then(([ department ]) => {
        console.table(department)
    })
    .then(() => initialPrompt())
};
function viewRoles() {
    db.findRoles()
    .then(([ roles ]) =>  {
        console.table(roles)
    })
    .then(() => initialPrompt())
};

//Add new elements (employees, roles, departments) to the tables

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee you would like to add?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the last name of the employee you would like to add?",
            name: "last_name"
        }
        ]).then(function(answer){
        
        let firstName = answer.first_name;
        let lastName = answer.last_name;
        db.findRoles()
        .then(([ roles ]) => {
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }))
            inquirer.prompt ({ 
                type: 'list',
                name: 'roleId',
                message: 'What is the role of the employee?',
                choices: roleChoices
            }).then(answer => {
                let roleId = answer.roleId
               db.assignManager()
               .then(([ manager ]) => {
                   
                   const managerChoices = manager.map(({ id, first_name, last_name }) => ({
                       name: `${first_name} ${last_name}`,
                       value: id,
                   })) 
            inquirer.prompt({
                type: 'list',
                name: 'managerId',
                message: 'Who is the manager of the new employee?',
                choices: managerChoices
            }).then(answer => {
                //let managerId = answer.value
                let newEmployee = {
                    manager_id: answer.managerId,
                    roles_id: roleId,
                    first_name: firstName,
                    last_name: lastName
                    }
                db.addEmployee(newEmployee)
                }).then(() => initialPrompt());
               }) 
               })
            })
        })       
};
//Add Department
function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "dept_name"
    }).then(function(department){
        db.addDept(department)
        .then(() => initialPrompt())
    })  
};
//Add new role, salary and assign to department
function addRole() {   
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the job title for the role you would like to add?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary for the role?',
            name: 'salary'
        }
    ])
    .then(function(answer){
        let title = answer.roleName;
        let salary = answer.salary;
        db.findAllDept()
        .then(([ departments ]) => {
            const deptChoices = departments.map(({ id, dept_name }) => ({
                name: dept_name,
                value: id
            }))
        inquirer.prompt({
            type: 'list',
            message: 'Which department is this role is under?',
            name: 'deptName',
            choices: deptChoices
        }).then(answer =>{
            let newRole = {
                title: title,
                salary: salary,
                department_id: answer.deptName
            }
            db.addRole(newRole)
        }).then(() => initialPrompt())
    })
})  
};
//Pick an employee to update their role
function updateEmployeeRole() {
    db.findAllEmployees()
    .then(([ employee ]) => {
        const employeeChoices = employee.map(({ first_name, last_name, id}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
    inquirer.prompt({
        type: 'list',
        message: 'Which employee would you like to make a role update for?',
        name: 'employeeList',
        choices: employeeChoices
    }).then(answer => {
        console.log(answer)
        let selectedEmpUpdate = answer.employeeList
    db.findRoles()
    .then(([ roles ]) => {
        const roleChoices = roles.map(({ title, id }) => ({
            name: title,
            value: id
        }))
        inquirer.prompt({
            type: 'list',
            message: 'Choose an updated title for the employee',
            name: 'updateRole',
            choices: roleChoices
        }).then(answer => {
            db.updateEmployeeRole(selectedEmpUpdate, answer.updateRole)
        }).then(() => initialPrompt())
    })
})
})   
};