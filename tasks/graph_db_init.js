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

sendQuery(query)
