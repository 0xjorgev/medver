  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var disciplineWS = require('./Route/discipline');

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

  app.get('/', function(request, response){
    response.send('This are not the droids you are looking for');
  });

  app.use('/discipline', disciplineWS);

  app.listen(3000 || 80, function(){
    console.log('Running on port 3000!');
  });