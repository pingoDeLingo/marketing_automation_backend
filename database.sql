CREATE TABLE users
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50)  NOT NULL,
    lastname  VARCHAR(50)  NOT NULL,
    username  VARCHAR(50)  NOT NULL,
    password  VARCHAR(100) NOT NULL
);
