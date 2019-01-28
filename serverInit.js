const restify = require('restify');
const {getUser, createUser} = require('./routes/users');
const server = restify.createServer();
//server.use(restify.plugins.CORS({credentials: true}))

// copies POST request message body to req.params
//  parases URL and copies to req.query
server.use(restify.plugins.bodyParser({mapParams: true}))


const checkSession = (req, res, next) => {
	return next;
}


/* User */
server.post('/user', createUser)
server.get('/user/:id', checkSession, getUser)




















server.listen(8080, () => {
	console.log(`Running on ${server.url}`);
});
exports.server = server;
