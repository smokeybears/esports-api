const pgPool = require('../dbPool');

const dbErrorCatch = (error) => {
	console.log("DB Error:", error)
	throw error;
}

const createForum = ({game, title, description, banner_image}) => {
	return pgPool.query('\
		INSERT INTO forum(game, title, description, banner_image)\
		values($1, $2, $3, $4)\
		RETURNING *',
		[game, title, description, banner_image])
	.catch(dbErrorCatch)
}

const getForum = ({id}) => {
	return dbPool.query('\
		SELECT * from forum\
		WHERE id = $1',
		[id])
}

module.exports = {
	getForum,
	createForum
}