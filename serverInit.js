require('dotenv').config()
const restify = require('restify');
const userDB = require('./db/queries/users')
const server = restify.createServer();


// functions run before or after all request //
// copies POST request message body to req.params
server.use(restify.plugins.bodyParser({mapParams: true}))
//  parases URL and copies to req.query
server.use(restify.plugins.queryParser());


// not sure where the best place to keep session is
// for incoming request.. probably Authorization header
// but for now query string works
const checkSession = (req, res, next) => {
	userDB.validateSession({
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
const userRoutes = require('./routes/users');
server.post('/user', userRoutes.createUser);
server.post('/user/login', userRoutes.login);
server.get('/user/:username', checkSession, userRoutes.getUser);
server.post('/user/:username/logout', checkSession, userRoutes.logout);
server.post('/users/:username/validSession', checkSession, (req, res, next) => {
	res.json({session: req.body.session})
})

/* Game */
const {
	getGame,
	createGame,
	getGameTournaments,
	getMatchDetails
} = require('./routes/game')

//server.post('/game', createGame)
//server.get('/game', getGame)

server.get('/games/:esport/tournaments/:month', getGameTournaments)
server.get('/games/:game_name/matches', getMatchDetails)


server.listen(8080, () => {
	console.log(`Running on ${server.url}`);
});

exports.server = server;
