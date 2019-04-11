const pgPool = require('../dbPool');

const dbErrorCatch = (error) => {
	console.log("DB Error:", error)
	throw error;
}

const createGame = ({name, publisher}) => {
	return pgPool.query('\
		INSERT INTO game(name, publisher)\
		VALUES ($1, $2)\
		RETURNING *',
		[name, publisher])
	.catch(dbErrorCatch);
}

const getGame = ({name}) => {
	return pgPool.query('\
		SELECT * FROM game\
		WHERE game = $1',
		[name])
	.catch(dbErrorCatch)
}

const getGames = () => {
	return pgPool.query('SELECT * FROM game')
}


module.exports = {
	createGame,
	getGame,
	getGames
}