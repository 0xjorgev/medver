var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var pacientes_ws = require('./route/pacientes_route');
var historia_ws = require('./route/historias_route');
var consulta_ws = require('./route/consultas_route');

  //Middleware
  var allowCrossDomain = function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
    res.header('origins','*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  	next();
  };

app.use(allowCrossDomain);
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/paciente', pacientes_ws);
app.use('/historia', historia_ws);
app.use('/consulta', consulta_ws);

app.listen(process.env.PORT, function(){
	console.log('Running on port: '+ process.env.PORT);
});