CREATE DATABASE deblur_db;

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    original_image_path VARCHAR(255) NOT NULL,
    deblurred_image_path VARCHAR(255),
    upload_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deblur_timestamp TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending',
    metadata JSONB
);
