const db = require('../db/queries/users');
const uuid = require('uuid/v4')
const Moment = require('Moment')
/* POST /users/ */
// GET /users/username
const getUser = (req, res, next) => {
	return db.getUser(req.params.username)
	.then(dbRes => {
		res.json(dbRes)
		return next()
	})
}

/* POST /users/ */
const createUser = ({params}, res, next) => {
	if (!params.username || !params.email || !params.password){
		res.json({error: 'Missing argument'})
		res.status(400)
		return next()
	}
	return db.createUser(params)
	.then(({error = null, rows}) => {
		// invalid User or bad database request
		if (error) {
			console.log(error)
			res.status(400)
			res.json({ error: error.details })
			return next()
		// user created
		} else {
			return createSession(params.username)
			.then((entry) => {
				console.log(entry)
				res.json({session: entry.rows[0].session_id, user: rows[0]})
				return next()
			})
		}
	})
}

/* POST /user/username/session */
const login = (req, {username, session}, next) => {
	return db.validUserPass(req.params)
	.then( valid => {
		if (valid) {
			getUser(username)
			return db.createSession((session) => {
				res.json({session})
				return next()
			})
		} else {
			res.json({error: "Username and Password not Valid"});
			res.status(400);
			return next();
		}
	})
}

// Helpers //
validateSession = (username, session) => {
	return db.validateSession(username, session)
	.then(({ rows }) => {
		return rows.length > 0;
	})
}


// Sessions are created from createUser or login
// in the future session will also be created through
// magic link
const createSession = (username) => {
	const expires = new Date();
	// Session last ~ 1 month give or take a few days
	expires.setMonth(expires.getMonth + 1);
	return db.createSession({
				username: username,
				session: uuid(),
				expires: (expires.getTime()/1000)
		});
}

// POST users/:id/logout
module.exports = {
	createUser,
	getUser,
	login,
//	logout
}