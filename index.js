// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//     var remoteAddress = req.headers['x-forwarded-for'] || 
//                       req.connection.remoteAddress;
//     res.json({ "ipAddress": remoteAddress });
// });

// app.listen(process.env.PORT || 80);
  var express = require('express');
  var app = express();
  var pg = require('pg');
  var pg = require('./dbManager');
  var logger = require('./logger');

  var conString = {
	    user: "rpjjyrwrvbfmyo",
	    password: "c4JJX-UqiY4eqwDPMvQk_pjiIU",
	    database: "d662a1395kh861",
	    port: 5432,
	    host: "ec2-54-225-165-132.compute-1.amazonaws.com",
	    ssl: true
  }

	var setResponseHeader = function(res){
		console.log('-------------------------------->');
		console.log("Response: ", res);
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.end();
	}

	app.get('/', function(request, response){
		setResponseHeader(response);
		response.write(JSON.stringify({"Welcome":'Welcome!'}));
	});

  	app.get('/discipline', function(request,response){
	response.setHeader("Access-Control-Allow-Origin", "*");
  	pg.connect(conString, function(err, client, done) {
	  // if(err) {
	  //   return console.error('error fetching client from pool', err);
	  // }
		client.query('SELECT * from "Discipline"', function(err, result) {

			
			if(err) {
			
				console.error('error running query', err);
				response.write(JSON.stringify({"Error" : true, "Message" : err}));
				response.end();
			}
			done();
			var res = JSON.stringify({"Message": "Success!", "Rows": result.rows});
			console.log(res);
			response.write(res);
			response.end();
	  	});
	});
  });

    app.get('/discipline/:idDis', function(request,response){
	response.setHeader("Access-Control-Allow-Origin", "*");
	var value = request.params.idDis;
	console.log('The value is: ', value);
  	pg.connect(conString, function(err, client, done) {
	  // if(err) {
	  //   return console.error('error fetching client from pool', err);
	  // }
		client.query('SELECT * from "Discipline" WHERE id =' + value, function(err, result) {

			if(err) {
			
				console.error('error running query', err);
				response.write(JSON.stringify({"Error" : true, "Message" : err}));
				response.end();
			}
			done();
			var res = JSON.stringify({"Message": "Success!", "Rows": result.rows});
			console.log(res);
			response.write(res);
			response.end();
	  	});
	});
  });

    app.get('/subdiscipline/', function(request,response){
	response.setHeader("Access-Control-Allow-Origin", "*");
  	pg.connect(conString, function(err, client, done) {
	  // if(err) {
	  //   return console.error('error fetching client from pool', err);
	  // }
		client.query('SELECT * from "Subdiscipline"', function(err, result) {

			if(err) {
			
				console.error('error running query', err);
				response.write(JSON.stringify({"Error" : true, "Message" : err}));
				response.end();
				done();
				return
			}
			done();
			var res = JSON.stringify({"Message": "Success!", "Rows": result.rows});
			console.log(res);
			response.write(res);
			response.end();
	  	});
	});
  });

app.listen(process.env.PORT || 80);
  // app.listen(3000, function(){
  // 	console.log('Running on port 3000!');
  // })