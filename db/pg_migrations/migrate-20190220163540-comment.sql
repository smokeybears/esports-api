CREATE TABLE IF NOT EXISTS comment (
	id serial PRIMARY KEY,
	post_id int NOT NULL references post(id),
	body varchar(10000) NOT NULL,
	author varchar(40) NOT NULL references app_user(username),
	score int DEFAULT 0,
	date_added timestamp DEFAULT now()
);