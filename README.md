# Combination API Project

Objective

This API generates valid combinations of items based on a specified length and a unique rule: no two items in a combination can start with the same letter. The combinations are generated, stored in a MySQL database, and returned as part of the API response.

## Technology Stack

- **Node.js** — for creating the API.
- **Express** — for routing and handling requests.
- **MySQL** — database for storing data.


## Setup Instructions

### 1. POST /generate

Generates all valid combinations from a list of items based on a required combination length and stores them in the database. Only combinations that respect the rule (no two items with the same prefix letter) will be stored.

=============on request==========================
POST URL localhost:3000/api/generate

{
  "items": [1, 2, 1],
  "length": 2
}

==============On Success==========================
{
  "status": "success",
  "message": "Combinations generated successfully",
  "data": [
    { "id": 1, "combination": ["A1", "B1"] },
    { "id": 2, "combination": ["A1", "B2"] },
    ...
  ]
}

=============On Error==================
{
  "status": "error",
  "message": "Error message"
}

## Database Schema
you need to have a mysql database and create combination_db, create a table items, combinations, responses according to the specified structure

REATE DATABASE IF NOT EXISTS combination_db;
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


## Error Handling and Transactions
Error Handling API responses are standardized using the ApiResponse class. Errors in generating combinations or database operations are handled with informative messages.

Transactions Database insertions are wrapped in MySQL transactions to ensure consistency and rollback in case of failure.
