const restify = require('restify');

const server = restify.creatServer();

server.listen(8080, () => {
	console.log(`Running on ${server.url}`);
})

