const request = require('request');
const sendQuery = (query) => {
	const postData = JSON.stringify(query)
	const options = {
		method: 'POST',
		url: 'http://localhost:7474/db/data/cypher',
		headers: { 'cache-control': 'no-cache', authorization: 'bmVvNGo6cm9vdA==' },
		body: postData
	}
	request(options, (error, response, body) => {
		if (error) throw new Error(error);
		console.log(body);
	})
}

let query = {
	query: `CREATE (n:User :Person {name: {name}, lastname: {lastname}}) RETURN n`
	,params: {
		name: 'Francisco'
		,lastname: 'De La Blanca'
	}
}

// sendQuery(query)

const Knex = require('knex')
const Config = require('../knexfile.js')
const Models = require('../model/index.js')
const knex = new Knex(process.env.NODE_ENV ? Config[process.env.NODE_ENV] : Config['development'])

knex('users')
// .where({id: 1})
.then(r => {
	r.forEach( user => {
		let query = (params) => {
			return {query: `CREATE (n:User :Person {username: {username}, user_id: {user_id}}) RETURN n`
			,params: params}
		}

		sendQuery(query({username: user.username, user_id: user.id}))
	})
})
