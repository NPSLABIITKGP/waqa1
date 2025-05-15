CREATE DATABASE WQA;

USE WQA;

CREATE TABLE user_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE pdf_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_table(id) ON DELETE CASCADE
);

ALTER TABLE pdf_records ADD COLUMN file_data LONGBLOB AFTER date_time;

CREATE TABLE water_quality_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    email VARCHAR(255),
    country VARCHAR(255),
    phone VARCHAR(20),
    date DATE,
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    ph DECIMAL(5,2),
    temperature DECIMAL(5,2),
    turbidity DECIMAL(5,2),
    electrical_conductivity DECIMAL(10,2),
    hardness DECIMAL(10,2),
    alkalinity DECIMAL(10,2),
    total_dissolved_solids DECIMAL(10,2),
    dissolved_oxygen DECIMAL(10,2),
    biological_oxygen_demand DECIMAL(10,2),
    chemical_oxygen_demand DECIMAL(10,2),
    ammonium DECIMAL(10,2),
    chloride DECIMAL(10,2),
    carbonate DECIMAL(10,2),
    bicarbonate DECIMAL(10,2),
    sulfate DECIMAL(10,2),
    nitrate DECIMAL(10,2),
    nitrite DECIMAL(10,2),
    fluoride DECIMAL(10,2),
    phosphate DECIMAL(10,2),
    sodiumion DECIMAL(10,2),
    calciumion DECIMAL(10,2),
    magnesiumion DECIMAL(10,2),
    potassiumion DECIMAL(10,2),
    water_quality_index DECIMAL(10,2),
    hazard_index_male DECIMAL(10,2),
    hazard_index_female DECIMAL(10,2),
    hazard_index_child DECIMAL(10,2),
    sar DECIMAL(10,2),
    Na_per DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


TRUNCATE TABLE pdf_records;
