const pgPool = require('../dbPool');

const dbErrorCatch = (error) => {
	console.log("DB Error:", error)
	throw error;
}

const createPost = ({forum_id, author, title, body, multimedia}) => {
	pgPool.query('\
		INSERT INTO post(forum_id, author, title, body)\
		values($1, $2, $3, $4',
		[forum_id, author, title, body, multimedia])
	.catch(dbErrorCatch);
}

const getPost = ({id}) => {
	pgPool.query('\
		SELECT * FROM post\
		where id = $1',
		[id])
	.catch(dbErrorCatch)
}

const getMultiPost = ({forum_id, limit = 10}) => {
	pgPool.query('\
		SELECT * FROM forum\
		where forum_id = $1\
		ORDER BY date_added\
		LIMIT $2',
		[forum_id, limit])
}

module.exports = {
	createPost,
	getPost,
	getMultiPost
}