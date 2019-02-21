CREATE TABLE IF EXISTS user_forum (
	username not null references user(username),
	forum_id not null references forum(id),
	PRIMARY KEY (username, forum_id)
);