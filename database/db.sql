CREATE DATABASE database_links;

USE database_links;

Create table users(
    id INT(11) not null,
    username VARCHAR(16) not null,
    password VARCHAR(60) not null,
    fullname VARCHAR(100) not null,
);

ALTER TABLE users
    ADD PRIMARY KEY (id);


ALTER TABLE users
    MODIFY id(11) not null AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

CREATE TABLE links(

    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    create_at timestamp NOT NULL default current_timestamp,
    CONSTRAIN fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id);