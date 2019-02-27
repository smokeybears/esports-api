const db = require('../db/queries/game')
const fetch = require('node-fetch')
const PANDA_API_URL = 'https://api.pandascore.co'
const M = require('moment')
// POST /game
const createGame = ({ params }, res, next) => {
	return db.createGame({name: params.name, publisher: params.publisher})
	.then(({rows}) => {
		res.json({game: rows[0]})
		return next()
	})
}

// GET /game/name
const getGame = (req, res, next) => {
 return db.getGame({name: req.params.name})
 .then(({rows}) => {
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

// Panda API interactions
const getGameTournaments = ({ params }, res, next) => {
	const { esport, month } = params
	const mbd = {}
	fetch(`${PANDA_API_URL}/${esport}/tournaments?token=${process.env.PANDA_API_KEY}`)
	.then(r => r.json())
	.then((tournaments) => {
		tournaments.map(tournament => {
			tournament.matches.map( match => {
				let ob =	{
					id: match.id,
					tournament: tournament.id,
					match: match.name,
					winner: {
						id: match.winner_id,
						name: match.winner
					},
					
					serie: {
						//id: match.serie_id,
						//name: match.serie.name
					},
					// team_1: match.opponents[0],
					// team_2: match.opponents[1]
				}

				mDate = M(match.begin_at)
				mbd[mDate.month()] = mbd[mDate.month()] || {}
				if (mbd[mDate.month()][mDate.date()]) {
					mbd[mDate.month()][mDate.date()].push(ob)
				} else {
					mbd[mDate.month()][mDate.date()] = [ob]
				}	

			})
		})
		res.json({matches: mbd[month]})
		return next()
	})
}

const getMatchDetails = (req, res, next) => {
	const params = req.params
	const query = req.query
	console.log('impo', `${PANDA_API_URL}/${params.game_name}/matches?filter[id]=${query.ids}&token=${process.env.PANDA_API_KEY}`)
	return fetch(`${PANDA_API_URL}/${params.game_name}/matches?filter[id]=${query.ids}&token=${process.env.PANDA_API_KEY}`)
	.then(r => r.json())
	.then(body => {
		let matches = body.map(match => {
			console.log('errr obasdfa', match.opponents)
			// Names and such need to be changed here at some point
			let team1ID = match.opponents[0].opponent.id
			let team2ID = match.opponents[1].opponent.id
			return {
				date: match.begin_at,
				winner: match.winner_id,
				title: match.name,
				description: match.serie.name,
				team1: match.opponents[0].opponent.image_url,
				team2: match.opponents[1].opponent.image_url,
				// There probably a better es6 way to do this
				team1Score: match.results[0].team_id == team1ID ? match.results[0].score : match.results[1].score,
				team2Score: match.results[1].team_id == team1ID ? match.results[1].score : match.results[0].score
			}
		})
		res.json({ matches })
		return next()
	})
}

module.exports = {
	getGame,
	createGame,
	getGameTournaments,
	getMatchDetails
}
const updateGame = (req, res, next) => {
 // laters
}