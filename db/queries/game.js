const pgPool = require('../dbPool');

const dbErrorCatch = (error) => {
	console.log("DB Error:", error)
	throw error;
	// switch(error.code){
	// 	case 23505: //
	// 		return {httpCode: 422, error}
	// 	default:
	// 		return {httpCode: 500,  error}
	// }
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