const db = require('../db/queries/post')

const createPost = ({ params }, res, next) => {
	return db.createPost({
		forum_id: params.forum_id,
		author: params.author,
		title: params.title,
		body: params.body,
		multimedia: null, // not dealing with this right now
	})
	.then(({rows}) => {
		res.json({post: rows[0]});
		return next();
	})
}

const getPost = ({ params }, res, next) => {
	return db.getPost({id: params.id})
	.then(({rows}) => {
		res.json({post: rows[0]})
		return res.next();
	});
}

const getMultiPost = ({ params }, res, next) => {
	return db.getMultiPost({
		forum_id: params.forum_id,
		limit: params.limit // should cap at some point
	})
	.then(({rows}) => {
		res.json({posts: rows});
		return next();
	});
}

const getGamePost = (req, res, next) => {
	return db.getGamePost({game: req.params.game, limit: 30})
	.then(r => r.rows)
	.then(gamePosts => {
		res.json({Post: gamePosts})
		return next()
	})
}

module.exports = {
	createPost,
	getPost,
	getMultiPost,
	getGamePost
}