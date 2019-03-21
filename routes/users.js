const db = require('../db/queries/users');
const uuid = require('uuid/v4')
const Moment = require('Moment')

// GET /users/:username 
const getUser = (req, res, next) => {
	return db.getUser({username: req.params.username})
	.then(({rows}) => {
		let user = rows[0]
		res.json({
			user: {
				username: user.username,
				email: user.email
			// more to come
			}
		})
		return next()
	})
}

// POST /users/ body: {email, password, username}
const createUser = ({ params }, res, next) => {
	if (!params.username || !params.email || !params.password){
		res.json({error: 'Missing argument'})
		res.status(400)
		return next()
	}
	return db.createUser(params)
	.then(({error = null, rows}) => {
		// invalid User or bad database request
		if (error) {
			res.status(400)
			res.json({ error: error.details })
			return next(false)
		// user created
		} else {
			return createSession(params.username)
			.then((entry) => {
				res.json({session: entry.rows[0].session_id, user: rows[0]})
				return next()
			})
		}
	})
	.catch(err => {
		//  unique constraint violation
		if (err.code == '23505'){
			res.json({error: 'Email already exist'})
			res.status(400)
			return next(false)			
		}
		throw err;
	});
}


// POST /user/:username/game/:name
const addUserGame = ({username, game}) => {
	return db.createUserGame({username, game})
	.then(({rows}) => {
		res.json({userGame: rows[0]});
		return next();
	});
}

// POST /user/:username/forum/:id 
const addUserForum = ({username, form_id}) => {
	return db.createUserForm({username, form_id})
	.then(({rows}) => {
		res.json({userForm: rows[0]});
		return next();
	});
}

// POST /users/login //
const login = ({ params }, res, next) => {
	const {username, password} = params;
	const responseJson = {};
	return db.validUserPass({username, password})
	.then(valid => {
		if (valid) {
			return db.getUser({username})
			.then(({ rows }) => {
				responseJson["user"] = {
					username: rows[0].username,
					email: rows[0].email
				}
				return createSession(username);
			})
			.then(({ rows }) => {
				responseJson["session"] = rows[0].session_id;
				res.json(responseJson)
				return next();
			});
		} else {
			res.json({error: "Username and Password not Valid"});
			res.status(400);
			return next();
		}
	})
	.catch(err => {
		throw err;
	})
}

const logout = (req, res, next) => {
	return db.deleteSession({ session: req.query.session })
	.then(({ rowCount }) => {
		if (rowCount == 1){
			return res.json({logout: true})
		}
		return next();
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
	logout
}