CREATE TABLE IF NOT EXISTS post (
	id serial primary key,
	forum_id int NOT NULL references forum(id),
	author varchar(40) NOT NULL references app_user(username),
	title varchar(100),
	body varchar(10000),
	multimedia varchar(100), -- will probably be end up being M:M.. not really sure how this is usualy managed
	score int DEFAULT 0,
	date_added timestamp DEFAULT now()
);