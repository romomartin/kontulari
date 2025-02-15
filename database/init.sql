CREATE DATABASE IF NOT EXISTS test;
USE test;
CREATE TABLE IF NOT EXISTS test_table (
    id int NOT NULL AUTO_INCREMENT,
    valor int,
    UNIQUE KEY (id)
)