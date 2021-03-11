INSERT INTO department(name)
VALUES 
('Engineering'),
('Sales'),
('Finance'),
('Human Resources'),
('Legal'),
('Managers');


INSERT INTO roles(title, salary, department_id)
VALUES
('Lead Engineer', 270000, 1),
('Salesperson', 87000, 2),
('Accountant', 97000, 3),
('HR', 95000, 4),
('Legal Team Lead', 120000, 5),
('Product Manager', 250000, 6);



INSERT INTO employees(first_name, last_name, role_id) 
VALUES
('Jane', 'Austen', 1),
('Pam', 'Beesly', 5),
('Jim', 'Asselin', 2),
('Toby', 'Flenderson', 3),
('Mark', 'Red', 6),
('Mark', 'Green', 1),
('Andre', 'Twain', 3);

UPDATE employees SET manager_id = 5 where id  != 5;