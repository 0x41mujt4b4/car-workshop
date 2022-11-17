CREATE DATABASE IF NOT EXISTS car_workshop;

USE car_workshop;

CREATE TABLE IF NOT EXISTS user (
	id INT AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user',
    PRIMARY KEY(id, email)
);

CREATE TABLE IF NOT EXISTS product (
	id INT AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    buy_price FLOAT NOT NULL,
    sell_price FLOAT NOT NULL,
    quantity INT DEFAULT 1,
    status ENUM('متوفر', 'غير متوفر') DEFAULT 'متوفر',
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS car(
	id INT AUTO_INCREMENT,
    plate_no INT NOT NULL,
    model VARCHAR(255) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    total_cost FLOAT NOT NULL,
    repair_cost FLOAT NOT NULL,
    PRIMARY KEY(id)
)