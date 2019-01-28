const { Pool } = require('pg')

const pgPool = new Pool({
	// will move all these into env at some point
	user: 'petercusack',
	host: 'localhost',
	password: 'esports4Life', 
	database: 'esports'
	});
// env var names
// PGUSER=petercusack \
// PGHOST=localhost \
// PGPASSWORD=esports4Life \
// PGDATABASE=esports \
// PGPORT=5432 \
// node serverStart.js

pgPool.on('error', (err, client) => {
	console.log(`ERR:: ${err}`)
});

module.exports = pgPool;