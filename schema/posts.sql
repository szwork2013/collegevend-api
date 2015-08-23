USE collegevend;

CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    price DECIMAL(6,2) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY(id)
);
