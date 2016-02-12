  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var log = require('./logger.js');
  var disciplineWS = require('./route/route');

  //Middleware
  var allowCrossDomain = function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
  	next();
  };

	app.use(allowCrossDomain);
	// parse application/json
	app.use(bodyParser.json());

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({type: 'application/vnd.api+json'}));

	//app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  console.log('Using logger');
  log.logger();


  app.get('/', function(request, response){
    response.send('These are not the droids you are looking for');
  });

  app.use('/discipline', disciplineWS);

  var port = (process.env.PORT === undefined) ? 3000 : process.env.PORT;

  app.listen(port, function(){
    console.log('Running on port ' + port);
  });