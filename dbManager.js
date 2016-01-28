 var pg = require('pg');
 var http = require('http');

 var conString = {
	    user: "",
	    password: "",
	    database: "",
	    port: 5432,
	    host: "",
	    ssl: true
	}

var disciplineQuery = function(){
	//console.log('res: ', res);
	pg.connect(conString, function(err, client, done) {
	  // if(err) {
	  //   return console.error('error fetching client from pool', err);
	  // }
		client.query('SELECT * from "Discipline"', function(err, result) {

			if(err) {
				done();
				console.error('error running query', err);
				return JSON.stringify({"Error" : true, "Message" : err});
			}

			done();
			console.log(JSON.stringify(result.rows));
			return JSON.stringify(result.rows);
			//{"Error" : false, "Message" : "Success", "Rows" : result.rows}
			//res.write({"Error" : false, "Message" : "Success", "Rows" : result.rows});
			//res.end();
			//return {"Error" : false, "Message" : "Success", "Rows" : result.rows};
	  	});
	});
}

exports.disciplineQuery = disciplineQuery;
// var myDb = function log(){
// 	console.log('Fear is the path to the darkside');
// };
// exports.myDb = myDb;

// var myDb = function(){

// 	var conString = process.env.DATABASE_URL || "postgres://rpjjyrwrvbfmyo:c4JJX-UqiY4eqwDPMvQk_pjiIU@ec2-54-225-165-132.compute-1.amazonaws.com:5432/d662a1395kh861";

// 	pg.connect(conString, function(err, client, done) {
// 	  if(err) {
// 	    return console.error('error fetching client from pool', err);
// 	  }
// 	  client.query('select * from Discipline', function(err, result) {
// 	    //call `done()` to release the client back to the pool
// 	    done();

// 	    if(err) {
// 	      return console.error('error running query', err);
// 	    }
// 	    console.log(result.rows[0].number);
// 	    //output: 1
// 	  });
// });

	// var client = new pg.Client(conString);
	// client.connect();
	// var query = client.query("select * from Discipline");

	// query.on("row", function (row, result) { 
 //             result.addRow(row); 
 //  	});

 //  query.on("end", function (result) {          
 //  		client.end();
 //  		res.writeHead(200, {'Content-Type': 'json/application'});
 //  		console.log('results ', result);
 //  		res.write(JSON.stringify(result.rows) + "\n");
 //  		res.end();  
	// });