CREATE TABLE IF NOT EXISTS app_user (
 username varchar(40) NOT NULL PRIMARY KEY,
 email varchar(40) UNIQUE, -- postgres creates index on all unique constraints
 password varchar(100),
 profile_image varchar(100),
 banner_image varchar(100),
 date_added timestamp DEFAULT now()
);
