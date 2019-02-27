const fetch = require('fetch')
const m = require('moment')

const getGameMatches = (req, res, next) => {
	const { esport } = req.params
	fetch(`${BASE_URL}/${esport}/matches/upcoming?token=${process.env.PANDA_API_KEY}`)
	.then((matches) => {
		const matchesByDate = {}
		matches.map(match => {
			mDate = m(match.begin_at)
			mDate.date()
			mDate.month
			matchesByDate[new Date(match.begin_at)] = {
				winner: {
					id: match.winner_id,
					name: match.winner
				},

				serie: {
					id: match.serie_id,
					name: match.serie.name,

				},
				match: match.name,
				team_1: match.opponenets[0],
				team_2: match.opponenets[1]
			}
		})
	})
}