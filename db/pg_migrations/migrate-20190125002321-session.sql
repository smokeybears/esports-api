CREATE TABLE IF NOT EXISTS session (
	username varchar(40) NOT NULL references app_user(username),
	session_id UUID PRIMARY KEY,
	expires timestamp DEFAULT timestamp 'yesterday',
	created_at timestamp DEFAULT now()
);