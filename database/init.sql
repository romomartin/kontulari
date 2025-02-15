CREATE DATABASE IF NOT EXISTS test;
USE test;
CREATE TABLE IF NOT EXISTS expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bank_account VARCHAR(255) NOT NULL,
    accounting_date DATE NOT NULL,
    value_date DATE NOT NULL,
    og_description VARCHAR(255) NOT NULL,
    amount FLOAT NOT NULL,
    balance FLOAT NOT NULL,
    `description` VARCHAR(255)
)