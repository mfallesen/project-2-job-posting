USE job_app_db;

INSERT INTO companies (company_name, phone, created_at, updated_at) VALUES ('Nike', 1234, '2008-11-11 00:00:00', '2008-11-11 00:00:00');
INSERT INTO companies (company_name, phone, created_at, updated_at) VALUES ('Adidas', 4532, '2008-11-11 00:00:00', '2008-11-11 00:00:00');

INSERT INTO managers (first_name, last_name, email, password, phone, created_at, updated_at, company_id) VALUES ('john', 'doe', 'john@email.com', 'asdf', 2345, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM companies WHERE id = 1));
INSERT INTO managers (first_name, last_name, email, password, phone, created_at, updated_at, company_id) VALUES ('jane', 'doe', 'jane@email.com', 'asdf', 2345, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM companies WHERE id = 1));
INSERT INTO managers (first_name, last_name, email, password, phone, created_at, updated_at, company_id) VALUES ('chris', 'smith', 'chris@email.com', 'asdf', 2345, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM companies WHERE id = 2));

INSERT INTO benefits (benefit_text, created_at, updated_at) VALUES ('housing assistance', '2008-11-11 00:00:00', '2008-11-11 00:00:00');
INSERT INTO benefits (benefit_text, created_at, updated_at) VALUES ('transportation assistance', '2008-11-11 00:00:00', '2008-11-11 00:00:00');
INSERT INTO benefits (benefit_text, created_at, updated_at) VALUES ('food assistance', '2008-11-11 00:00:00', '2008-11-11 00:00:00');

INSERT INTO jobs (title, description, type, wage, created_at, updated_at, manager_id) VALUES ('assisstant manager', 'we need a new assistant manager', 'ft', 25.00, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM managers WHERE id = 1));
INSERT INTO jobs (title, description, type, wage, created_at, updated_at, manager_id) VALUES ('sales associate', 'we need a new sales associate', 'pt', 20.00, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM managers WHERE id = 1));
INSERT INTO jobs (title, description, type, wage, created_at, updated_at, manager_id) VALUES ('chef', 'we need a new chef', 'ft', 35.00, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM managers WHERE id = 2));
INSERT INTO jobs (title, description, type, wage, created_at, updated_at, manager_id) VALUES ('custome service rep', 'we need a new customer service rep', 'pt', 15.00, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM managers WHERE id = 2));
INSERT INTO jobs (title, description, type, wage, created_at, updated_at, manager_id) VALUES ('accountant', 'we need a new accountant', 'ft', 25.00, '2008-11-11 00:00:00', '2008-11-11 00:00:00', (SELECT id FROM managers WHERE id = 2));

INSERT INTO job_benefit (created_at, updated_at, benefit_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 1, 1);
INSERT INTO job_benefit (created_at, updated_at, benefit_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 1, 2);
INSERT INTO job_benefit (created_at, updated_at, benefit_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 2, 1);
INSERT INTO job_benefit (created_at, updated_at, benefit_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 2, 3);
INSERT INTO job_benefit (created_at, updated_at, benefit_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 3, 2);
INSERT INTO job_benefit (created_at, updated_at, benefit_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 3, 3);


INSERT INTO users (first_name, last_name, email, password, phone, created_at, updated_at) VALUES ('donald', 'trump', 'donald@email.com', 'asdf', 1345, '2008-11-11 00:00:00', '2008-11-11 00:00:00');
INSERT INTO users (first_name, last_name, email, password, phone, created_at, updated_at) VALUES ('joe', 'biden', 'joe@email.com', 'asdf', 6342, '2008-11-11 00:00:00', '2008-11-11 00:00:00');
INSERT INTO users (first_name, last_name, email, password, phone, created_at, updated_at) VALUES ('mike', 'pence', 'mike@email.com', 'asdf', 7897, '2008-11-11 00:00:00', '2008-11-11 00:00:00');

INSERT INTO user_job (created_at, updated_at, user_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 1, 1);
INSERT INTO user_job (created_at, updated_at, user_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 1, 3);
INSERT INTO user_job (created_at, updated_at, user_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 2, 2);
INSERT INTO user_job (created_at, updated_at, user_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 2, 4);
INSERT INTO user_job (created_at, updated_at, user_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 2, 5);
INSERT INTO user_job (created_at, updated_at, user_id, job_id) VALUES ('2008-11-11 00:00:00', '2008-11-11 00:00:00', 3, 3);