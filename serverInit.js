const restify = require('restify');
const db = require('./db/queries/users')
const server = restify.createServer();

// copies POST request message body to req.params
server.use(restify.plugins.bodyParser({mapParams: true}))
//  parases URL and copies to req.query
server.use(restify.plugins.queryParser());

// functions used before or after multiple request //

// not sure where the best place to keep session is
// for incoming request.. probably Authorization header
// but for now query string works
const checkSession = (req, res, next) => {
	db.validateSession({
		session: req.query.session, 
		username: req.params.username
	})
	.then((valid) => {
		if (valid) {
			return next()
		} else {
			res.json({error: "Invalid Session ID"});
			res.status(400);
			return next(false)
		}
	})
}

/* User */
const {
	getUser, 
	createUser,
	login,
	validUserPass,
	logout
	} = require('./routes/users');
server.post('/user', createUser);
server.post('/user/login', login);
server.get('/user/:username', checkSession, getUser);
server.post('/user/:username/logout', checkSession, logout)
server.post('/users/:username/validSession', checkSession, (req, res, next) => {
	res.json({session: req.body.session})
})

/* Game */
const {
	getGame,
	createGame
} = require('./routes/')
server.post('/game', createGame)
server.get('/game', getGame)


server.listen(8080, () => {
	console.log(`Running on ${server.url}`);
});

exports.server = server;
