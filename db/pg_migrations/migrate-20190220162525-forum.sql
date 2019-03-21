CREATE TABLE IF NOT EXISTS forum (
	id serial primary key,
	game int NOT NULL references game(id),
	title varchar(60) NOT NULL,
	description varchar(250),
	banner_image varchar(100)
);