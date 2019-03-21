CREATE TABLE IF NOT EXISTS game (
	id serial PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	publisher varchar(50)
	-- will add other info here but good for now
);