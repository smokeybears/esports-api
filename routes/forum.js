const db = require('../db/queries/forum');

const createForum = (req, res, next) => {
	// req.params = {game, title, description, banner_image}
	return db.createForum(req.params)
	.then(({rows}) => {
		res.json({forum: rows[0]})
		return next();
	});
}

const getForum = (req, res, next) => {
	return db.getForum({id: req.params.id})
	.then(({rows}) => {
		res.json({forum: rows[0]});
	});
}

const getGameForums = (req, res, next) => {
	return db.getGameForums({game: req.params.game})
	.then(({rows}) => {
		console.log(rows)
		res.json({Forums: rows})
		return next()
	})
}

const getForumPost = (req, res, next) => {
	console.log('FOrum post params', req.params)
	return db.getForumPost({
		forum: req.params.forumID
	})
	.then(({rows}) => {
		res.json({posts: rows})
		return next()
	})
}

module.exports = {
	createForum,
	getGameForums,
	getForum,
	getForumPost
}