INSERT INTO department (name)
VALUES
    (1, 'Management'),
    (2, 'Finance'),
    (3, 'IT'),
    (4, 'Sales'),
    (5, 'Human Resources');

INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (1, 'Manager', 120000, 1),
    (2, 'Accountant', 100000, 2),
    (3, 'Engineer', 130000, 3),
    (4, 'Account Executive', 90000, 4),
    (5, 'HR Manager', 75000, 5);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES 
    ('Adam', 'Flynn', 3, 1),
    ('Clark', 'Griswold', 4, 2),
    ('Kris', 'Kringle', 5, 1),
    ('Kevin', 'McAllister', 4, 2),
    ('Bob', 'Crachitt', 2, 2),
    ('Yukon', 'Cornelius', 4, 1),
    ('George', 'Bailey', 1, NULL),
    ('Ebeneezer', 'Scrooge', 1, NULL);

INSERT INTO manager (first_name, last_name, id)
VALUES
    ('George', 'Bailey', 1),
    ('Ebeneezer', 'Scrooge', 2);