const connection = require('../config/connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    };

    findAllDept() {
        return this.connection.promise().query(`SELECT * FROM department`);
    };
    findAllEmployees() {
        return this.connection.promise().query(`SELECT employee.id, employee.first_name, 
        employee.last_name, employee.manager_id, roles.title, roles.salary, department.dept_name  
        FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department on 
        roles.department_id = department.id;`);
    };
    findRoles() {
        return this.connection.promise().query(`SELECT roles.id, roles.title, roles.salary, 
        department.dept_name FROM roles LEFT JOIN department on roles.department_id = department.id`);

    };
    assignManager() {
        return this.connection.promise().query(`SELECT manager.first_name, 
        manager.last_name, manager.id FROM manager `)
    };
    addDept(department) {
        return this.connection.promise().query(`INSERT INTO department SET ?`, department);
    };
    addEmployee(newEmployee) {
        return this.connection.promise().query(`INSERT INTO employee SET ?`, newEmployee);
    };
    addRole(newrole) {
        return this.connection.promise().query(`INSERT INTO roles SET ?`, newrole);
    };

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId]);
    };
};

module.exports = new DB(connection);