CREATE TABLE IF NOT EXISTS app_user (
 id SERIAL PRIMARY KEY,
 email varchar(40) UNIQUE,
 username varchar(40) UNIQUE, -- postgres creates index on all unique constraints
 password varchar(100),
 date_added timestamp DEFAULT now()
);
