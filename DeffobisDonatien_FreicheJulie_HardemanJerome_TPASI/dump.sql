/* using the catalog 'mysql' */
INSERT INTO users (id,login,password,sur_name,last_name,role) VALUES (0 /*not nullable*/,'s' /*not nullable*/,'s' /*not nullable*/,'s','s','s');
CREATE TABLE users
(
   id int NOT NULL,
   login varchar(50) NOT NULL,
   password varchar(50) NOT NULL,
   sur_name varchar(50),
   last_name varchar(50),
   role varchar(15)
)
;


INSERT INTO users (id,login,password,sur_name,last_name,role) VALUES (1,'julie','password','julie','freiche','ADMIN');
INSERT INTO users (id,login,password,sur_name,last_name,role) VALUES (102,'lambda','12345','alpha','beta','MEMBER');
