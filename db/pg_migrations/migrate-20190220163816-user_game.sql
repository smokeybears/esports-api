CREATE TABLE IF NOT EXISTS user_game (
	username NOT NULL references app_user(username),
	game_id NOT NULL references game(id)
	PRIMARY KEY (game_id, username)
);