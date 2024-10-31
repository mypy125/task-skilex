CREATE DATABASE IF NOT EXISTS combination_db;
USE combination_db;

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL UNIQUE
);

INSERT INTO items (id, name) VALUES
(1, 'A1'),
(2, 'B1'),
(3, 'B2'),
(4, 'C1');


CREATE TABLE combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_text TEXT NOT NULL
);

CREATE TABLE responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('success', 'error') NOT NULL,
    message TEXT,
    combination_id INT,
    FOREIGN KEY (combination_id) REFERENCES combinations(id)
);

