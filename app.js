var express = require('express');
var app = express();

var pacientes_ws = require('./route/pacientes_route');

var allowCrossDomain = function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
    res.header('origins','https://herokuapp.com:* https://somosportpocdev.herokuapp.com:*');
    res.header('Access-Control-Allow-Credentials', 'true');
  	next();
  };

app.use(allowCrossDomain);

app.use('/paciente', pacientes_ws);

app.listen(process.env.PORT, function(){
	console.log('Running on port: '+ process.env.PORT);
});