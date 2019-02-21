const db = require('../db/queries/game')

// POST /game
const createGame = ({ params }, res, next) => {
	return db.createGame({name: params.name, publisher: params.publisher})
	.then({rows} => {
		res.json({game: rows[0]})
		return next()
	})
}

// GET /game/name
const getGame = (req, res, next) => {
 return db.getGame({name: req.params.name})
 .then({rows} => {
 		if (!rows.length){
 			res.status(404)
 			res.json({error: "Game not found"})
 			return next
 		} else {
 			res.json({game: rows[0]})
 			return next()
 		}
 })
}

const updateGame = (req, res, next) => {
 // laters
}