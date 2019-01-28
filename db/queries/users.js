const  pgPool = require('../dbPool');
const bcrypt = require('bcrypt')

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
const getUser = ({ username }) => {
	return pgPool.query('\
		SELECT * FROM app_user \
		WHERE username = $1', 
		[username])
	.catch(dbErrorCatch);
}

const createUser = ({username, email, password}) => {
	return bcrypt.hash(password, 5)
	.then((password) => {
		return pgPool.query('\
		INSERT INTO app_user(email, username,  password) \
		VALUES ($1, $2, $3) \
		RETURNING *', 
		[email, username, password])
	})
	.catch(dbErrorCatch);
}

const validUserPass = ({username, password}) => {
	return pgPool.query('\
		SELECT password FROM app_user \
		WHERE username = $1', 
		[username])
	.then(({ rows }) => {
		if (rows.length){
			return bcrypt.compare(password, rows[0].password)
		} else {
			return false
		}
	})
	.catch(dbErrorCatch);
}

// These should be moved into a seperate file.. //
// but all this will be on redis eventually //

const createSession = ({username, expires, session}) => {
	return pgPool.query('\
		INSERT INTO session(username, session_id) \
		VALUES ($1, $2) \
		RETURNING *',
		[username, session])
	.catch(dbErrorCatch);
}

const deleteSession = ({ session }) => {
	return pgPool.query('\
		DELETE FROM session \
		WHERE session_id = $1',
		[session])
	.catch(dbErrorCatch)
}

const validateSession = ({session, username}) => {
	return pgPool.query('\
		SELECT * from session \
		WHERE session_id = $1 AND username = $2', 
		[session, username])
	.then(({rows}) => {
		return rows.length > 0;
	})
	.catch(dbErrorCatch);
}

module.exports = {
	getUser,
	createUser,
	createSession,
	validateSession,
	validUserPass,
	deleteSession
}