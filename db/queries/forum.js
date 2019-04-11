const pgPool = require('../dbPool');

const dbErrorCatch = (error) => {
	console.log("DB Error:", error)
	throw error;
}

const createForum = ({game, title, description, banner_image = ''}) => {
	return pgPool.query('\
		INSERT INTO forum(game, title, description, banner_image)\
		values($1, $2, $3, $4)\
		RETURNING *',
		[game, title, description, banner_image])
	.catch(dbErrorCatch)
}

const getForum = ({id}) => {
	return pgPool.query('\
		SELECT * from forum\
		WHERE id = $1',
		[id])
}

const getGameForums = ({game}) => {
	return pgPool.query(`\
		SELECT * FROM forum\
		WHERE game = $1`,
		[game])
}

const getForumPost = ({forum}) => {
	return pgPool.query('\
		SELECT * FROM post\
		WHERE post.forum_id = $1',
		[forum])
}

module.exports = {
	getForum,
	createForum,
	getGameForums
}