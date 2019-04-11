const db = require('./dbPool')
const P = Promise
const faker = require('faker')

const ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const games = [{name: 'Fornite', publisher: 'EPIC Games'}, {name: 'CS:GO', publisher: 'Valve Corporation'}, {name: 'DOTA', publisher: 'IceFrog'}, {name: 'LOL', publisher: 'Riot Games'}]
const insertGames = () => {
	return P.all(games.map(g => {
		return db.query('insert into game(name, publisher) values ($1, $2) RETURNING *', [g.name, g.publisher])
	})).catch(err => {throw err})
}


const createUsers = () => {
	return P.all(ten.map(i => {
		return db.query('insert into app_user(username, email, password) values ($1, $2, $3) RETURNING *', 
			[faker.internet.userName(), faker.internet.email(), faker.internet.password()])
	}))
}

const createForums = (ga) => {
	return P.all(ga.map(g => {
		return db.query('insert into forum(game, title, description) values ($1, $2, $3) RETURNING *',
			[g[0].id, faker.company.companyName, faker.random.words(15)])
	}))
}

const createPost = (forums, users) => {
	//console.log('----', forums, users)
	return P.all(users.map(u => {
		console.log
		for (let i = 0; i < 50; i++){
			let forum_id = forums[Math.floor(Math.random()*forums.length)][0].id
			db.query('insert into post(forum_id, author, title, body) values ($1, $2, $3, $4) RETURNING *', 
				[
					forum_id, u[0].username,
					faker.random.words((Math.floor(Math.random()*6) + 1)).slice(0, 99),
					faker.random.words(100)
				]
			)
		}
	}))
}


const seed = () => {
	let forums;
	return insertGames()
	.then(g => {
		let ga = g.map(gg => gg.rows)
		return createForums(ga)
	})
	.then((f) => {
		forums = f.map(ff => ff.rows)
		return createUsers()
	})
	.then(u => {
		let users = u.map(uu => uu.rows)
		return createPost(forums, users)
	})
}

seed()