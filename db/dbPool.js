const pg = require('pg')

const pgPool = new pg.Pool({
	// will move all these into env at some point
	user: 'petercusack',
	host: 'localhost',
	password: 'esports4Life', 
	database: 'esports'
	});
pgPool.on('error', (err, client) => {
	console.log(`ERR:: ${err}`)
});

module.exports = pgPool;

// env var names
// PGUSER=petercusack \
// PGHOST=localhost \
// PGPASSWORD=esports4Life \
// PGDATABASE=esports \
// PGPORT=5432 \
// node serverStart.js

// needed for timestamps with time zone but not working
// right now and not worth the time to fix
//pg.types.setTypeParser(1114).then((stringValue) => {
//   return new Date(Date.parse(stringValue + "+0000"));
//})
