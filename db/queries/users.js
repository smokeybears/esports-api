const  pgPool = require('../dbPool');
const bcrypt = require('bcrypt')
const dbErrorCatch = (error) => {
	console.log("DB Error")
	console.log(error)
	return { error }
	// switch(error.code){
	// 	case 23505: //
	// 		return {httpCode: 422, error}
	// 	default:
	// 		return {httpCode: 500,  error}
	// }
}

const getUser = (username) => {
	return pgPool.query('\
		SELECT * FROM app_user \
		WHERE username = $1', [1],
		(err, res) => {
	})
	.catch(dbErrorCatch);
}

const createUser = ({username, email, password}) => {
	return bcrypt.hash(password, 5)
	.then((password) => {
		console.log("::::::::", username, email, password)
		return pgPool.query('\
		INSERT INTO app_user(email, username,  password) \
		VALUES ($1, $2, $3) \
		RETURNING *', 
		[email, username, password])
	})
	.catch(dbErrorCatch);
}

const validUserPass = ({ username, password }) => {
	return pgPool.query('\
		SELECT password FROM app_user \
		WHERE username = $1', username)
	.then(({rows}) => {
		return bcrypt.compare(rows[0].password, password)
	})
	.catch(dbErrorCatch);
}

// These should be moved into a seperate file.. 
// but all this will be on redis eventually
const createSession = ({username, expires, session}) => {
	console.log(expires)
	return pgPool.query('\
		INSERT INTO session(username, session_id) \
		VALUES ($1, $2) \
		RETURNING *',
		[username, session])
	.catch(dbErrorCatch);
}

const validateSession = ({sessionKey, username}) => {
	return pgPool.query('\
		SELECT * from session \
		WHERE session_key = $1 AND username = $2', 
		sessionKey, userID)
	.catch(dbErrorCatch);;
}

module.exports = {
	getUser,
	createUser,
	createSession,
	validateSession
}