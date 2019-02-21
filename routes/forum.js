const db = require('../db/queries/forum');

const createForum = (req, res, next) => {
	// req.params = {game, title, description, banner_image}
	return db.createForm(req.params)
	.then(({rows} => {
		res.json({form: rows[0]})
		return next();
	});
}

const getForum = (req, res, next) => {
	return db.getForum({id: req.params.id})
	.then({rows} => {
		res.json({forum: rows[0]});
	});
}

module.exports = {
	createForum,
	getForum
}