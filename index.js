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
  var bodyParser = require('body-parser');
  var pg = require('pg');
  //var pg = require('./dbManager');
  var logger = require('./logger');

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  var conString = {
	    user: "rpjjyrwrvbfmyo",
	    password: "c4JJX-UqiY4eqwDPMvQk_pjiIU",
	    database: "d662a1395kh861",
	    port: 5432,
	    host: "ec2-54-225-165-132.compute-1.amazonaws.com",
	    ssl: true
  }

	var setResponseHeader = function(res, body){
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.write(JSON.stringify(body));
		res.end();
	}

	var getQueryNoParams = function(res, conex, query){
		pg.connect(conex, function(err, client, done) {
			client.query(query, function(err, result) {
				if(err) {
					setResponseHeader(res, {"Error" : err, "Rows" : result});
					done();
					return
				}
				done();
				setResponseHeader(res, {"Message": "Success!", "Rows": result.rows});
		  	});
		});
	};

	var getQueryWithParams = function(res, conex, query, param){
		pg.connect(conex, function(err, client, done) {
			client.query(query, function(err, result) {
				if(err) {
					setResponseHeader(res, {"Error" : err, "Rows" : result});
					done();
					return
				}
				done();
				setResponseHeader(res, {"Message": "Success!", "Rows": result.rows});
		  	});
		});
	};

	var postInsert = function(res, conex, query){
		pg.connect(conex, function(err, client, done) {
			client.query(query, function(err, result) {

				console.log("Query :", query);
				if(err) {
					setResponseHeader(res, {"Error" : err, "Rows" : result});
					done();
					return
				}
				done();
				setResponseHeader(res, {"Message": "Success!", "Rows": 1});
		  	});
		});
	};



	//Webserives routes
	//GET -> Entity List
	//GET -> /serviceName/?? Entity by Id

	//POST -> Entity -> New Entity
	//POST -> NonEntity -> Complex Query -> Return Objects

	//Root
	app.get('/', function(request, response){
		setResponseHeader(response, {"Welcome":'Welcome!'});
	});
	//V 2.0
	//Discipline List
	app.get('/discipline', function(request,response){
		getQueryNoParams(response, conString, 'SELECT * from "Discipline"');
	});
	//Discipline By Id
	app.get('/discipline/:id', function(request, response){
		var param = request.params.id;
		getQueryWithParams(response, conString, 'SELECT * from "Discipline" WHERE id ='+param);
	});
	//SubDiscipline List
	app.get('/subdiscipline/', function(request,response){
		getQueryNoParams(response, conString, 'SELECT * from "Subdiscipline"');
	});

	//SubDiscipline by Id
	app.get('/subdiscipline/:id', function(request,response){
		var param = request.params.id;
		getQueryWithParams(response, conString, 'SELECT * from "Subdiscipline" WHERE id ='+param);
	});	
	//New SubDiscipline
	app.post('/subdiscipline/', function(request, response){
		// console.log('Request Object: ', request);
		//ODIO ESTA LINEA DE CODIGO VB 1998!!!!
		var query = 'INSERT INTO "Subdiscipline" ("name", "description", "disciplineId") values(\''+request.body.name +'\',\''+ request.body.description+'\','+ request.body.disciplineId + ')';
		postInsert(response, conString, query);
	});


  // 	app.get('/discipline', function(request,response){
		// // response.setHeader("Access-Control-Allow-Origin", "*");
	 //  	pg.connect(conString, function(err, client, done) {
		//   // if(err) {
		//   //   return console.error('error fetching client from pool', err);
		//   // }
		// 	client.query('SELECT * from "Discipline"', function(err, result) {

				
		// 		if(err) {
				
		// 			console.error('error running query', err);
		// 			response.write(JSON.stringify({"Error" : true, "Message" : err}));
		// 			response.end();
		// 		}
		// 		done();
		// 		var res = JSON.stringify({"Message": "Success!", "Rows": result.rows});
		// 		// console.log(res);
		// 		response.write(res);
		// 		response.end();
		//   	});
		// });
  // 	});

 //    app.get('/discipline/:idDis', function(request,response){
	// response.setHeader("Access-Control-Allow-Origin", "*");
	// var value = request.params.idDis;
	// console.log('The value is: ', value);
 //  	pg.connect(conString, function(err, client, done) {
	//   // if(err) {
	//   //   return console.error('error fetching client from pool', err);
	//   // }
	// 	client.query('SELECT * from "Discipline" WHERE id =' + value, function(err, result) {

	// 		if(err) {
			
	// 			console.error('error running query', err);
	// 			response.write(JSON.stringify({"Error" : true, "Message" : err}));
	// 			response.end();
	// 		}
	// 		done();
	// 		var res = JSON.stringify({"Message": "Success!", "Rows": result.rows});
	// 		console.log(res);
	// 		response.write(res);
	// 		response.end();
	//   	});
	// });
 //  });

 //    app.get('/subdiscipline/', function(request,response){
	// response.setHeader("Access-Control-Allow-Origin", "*");
 //  	pg.connect(conString, function(err, client, done) {
	//   // if(err) {
	//   //   return console.error('error fetching client from pool', err);
	//   // }
	// 	client.query('SELECT * from "Subdiscipline"', function(err, result) {

	// 		if(err) {
			
	// 			console.error('error running query', err);
	// 			response.write(JSON.stringify({"Error" : true, "Message" : err}));
	// 			response.end();
	// 			done();
	// 			return
	// 		}
	// 		done();
	// 		var res = JSON.stringify({"Message": "Success!", "Rows": result.rows});
	// 		console.log(res);
	// 		response.write(res);
	// 		response.end();
	//   	});
	// });
 //  });

//For production enviroment
app.listen(process.env.PORT || 80);
//For esting enviroment
// app.listen(3000, function(){
//    	console.log('Running on port 3000!');
//   });