CREATE TABLE todos (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       subject VARCHAR(255) NOT NULL,
                       eventAt VARCHAR(255) NOT NULL,
                       createdAt DATETIME NOT NULL
);

select * from todos;