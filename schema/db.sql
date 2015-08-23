CREATE DATABASE IF NOT EXISTS collegevend;

CREATE USER 'vagrant'@'localhost' IDENTIFIED BY 'vagrant';
GRANT ALL PRIVILEGES ON collegevend.* TO 'vagrant'@'localhost';

FLUSH PRIVILEGES;
