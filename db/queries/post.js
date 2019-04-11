const pgPool = require('../dbPool');

const dbErrorCatch = (error) => {
	console.log("DB Error:", error)
	throw error;
}

const createPost = ({forum_id, author, title, body, multimedia}) => {
	return pgPool.query('\
		INSERT INTO post(forum_id, author, title, body)\
		values($1, $2, $3, $4',
		[forum_id, author, title, body, multimedia])
	.catch(dbErrorCatch);
}

const getPost = ({id}) => {
	return pgPool.query('\
		SELECT * FROM post\
		where id = $1',
		[id])
	.catch(dbErrorCatch)
}

const getMultiPost = ({forum_id, limit = 10}) => {
	return pgPool.query('\
		SELECT * FROM forum\
		where forum_id = $1\
		ORDER BY date_added\
		LIMIT $2',
		[forum_id, limit])
}

const getGamePost = ({game, limit}) => {
	return pgPool.query('\
		select * FROM Forum \
		INNER JOIN post ON forum.id = post.forum_id\
		WHERE forum.game = $1',
		[game])

		// 'forum WHERE forum.game = $1\
		// inner join post on forum.id = post.forum_id\
		// LIMIT $2',
		// [game, limit])
}

module.exports = {
	createPost,
	getPost,
	getMultiPost,
	getGamePost
}