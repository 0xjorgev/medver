//skips newrelic if not in heroku
if(process.env.NODE_ENV == 'production') require('newrelic')

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan'); //nodejs logger
var nJwt = require('njwt') //jwt token generator
var Message = require('./util/request_message_util') //in-house message handler
var Response = require('./util/response_message_util') //in-house message handler
var compression = require('compression');
var argv = require('minimist')(process.argv.slice(2));
var subpath = express();
const logger = require('./util/logger_util')

//node port
var port = process.env.PORT;

app.use(compression());

app.use("/v1", subpath);

//==========================================================================
// swagger stuff
// check hello world example: https://github.com/swagger-api/swagger-node/issues/189
//==========================================================================

// swagger.setAppHandler(subpath);
var swagger_node_express = require("swagger-node-express");
var swagger = swagger_node_express.createNew(app);

app.use(express.static('docs'));

swagger.setApiInfo({
  title: "SomoSport API",
  description: "SomoSport API",
  termsOfServiceUrl: "",
  contact: "ramsesl@codefuel.me",
  license: "",
  licenseUrl: ""
});

app.get('/', (req, res) => res.sendFile(__dirname + '/docs/index.html') );

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', 'docs');

// // Configure the API domain
var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else{
    // console.log('No --domain=xxx specified, taking default hostname "localhost".')
}

// // Configure the API port
// var port = 8080;
// if(argv.port !== undefined)
//     port = argv.port;
// else
//     console.log('No --port=xxx specified, taking default port ' + port + '.')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
// console.log('snapJob API running on ' + applicationUrl);

swagger.configure(applicationUrl, '1.0.0');


//==========================================================================
// end swagger stuff
//==========================================================================

var discipline_ws = require('./route/disciplines_route');
var user_ws = require('./route/users_route');
var competition_ws = require('./route/competitions_route');
var season_ws = require('./route/seasons_route');
var category_ws = require('./route/categories_route');
var gender_ws = require('./route/genders_route');
var phase_ws = require('./route/phases_route');
var group_ws = require('./route/groups_route');
var round_ws = require('./route/rounds_route');
var match_ws = require('./route/matches_route');
var team_ws = require('./route/teams_route');
var event_ws = require('./route/results_route');
var referee_ws = require('./route/referees_route');
var category_type_ws = require('./route/categories_types_route');
var player_ws = require('./route/players_route');
var rule_ws = require('./route/rules_route');
var match_event_ws = require('./route/events_route');
var subdiscipline_ws = require('./route/subdisciplines_route');
var test_ws =  require('./route/tests_route');
var position_ws =  require('./route/positions_route');
var status_type_ws =  require('./route/status_types_route');
var request_ws =  require('./route/requests_route');
const feed_item_ws = require('./route/feed_items_route')
const club_ws = require('./route/clubs_route')

//put here all non business-related services
var core_ws =  require('./route/core_route');

var apiVersion = 'v1.0';
var prefix = 'api';
var api_prefix = `/${prefix}/${apiVersion}/`; //'template literal syntax' is only available in ES6 (use 'esversion: 6').

//routes names
var routes = {
	discipline      : 'discipline'
	,competition    : 'competition'
	,season         : 'season'
	,category       : 'category'
	,gender         : 'gender'
	,contact        : 'contact'
	,organization   : 'organization'
	,phase          : 'phase'
	,group          : 'group'
	,round          : 'round'
	,team           : 'team'
	,match          : 'match'
	,rule           : 'rule'
	,ruleset        : 'ruleset'
	,event          : 'event'
	,referee        : 'referee'
	,category_type  : 'category_type'
	,feed_item  	: 'feed_item'
	,player         : 'player'
	,rule           : 'rule'
	,match_event    : 'matchevent'
	,subdiscipline  : 'subdiscipline'
	,test           : 'test'
	,position       : 'position'
	,status_type    : 'status_type'
	,request        : 'request'
	,club        	: 'club'
}

//Middleware
var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('origins','*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization-Token');
	res.header( 'X-Powered-By', 'SomoSport' )
	next();
};

app.use(allowCrossDomain);

app.use(morgan('dev'));

// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//TODO: colocar en un helper
const validateToken = function (req, res, next) {

	const token = req.headers['Authorization-Token'] || req.headers['authorization-token']

	if(token === undefined || token === null){
		next()
	}
	else{
		try{
			var secretKey = process.env.API_SIGNING_KEY || 's3cr3t'
			var verifiedJwt = nJwt.verify(token, secretKey)

			//si se entrega un token válido, se inyectan los datos del usuario al request
			//estos valores se obtienen al hacer login
			req._currentUser = {
				id: verifiedJwt.body.user,
				roles: verifiedJwt.body.roles,
				permissions: verifiedJwt.body.permissions,
				lang: verifiedJwt.body.lang
			}
			next()
		}
		catch(error){
			logger.error(error)
			Response(res, null, error)
		}
	}
}

app.use(validateToken)

  /******
  * para procesamiento de query strings, como ordenamiento
  * se espera recibir un parametro con la forma:
  * <service_url>/<resource>?sort=-priority,created_at,+updated_at
  * signo + asc, - desc
  * si se envia el campo sin un signo + o - se asume +
  * esta funcion coloca en el request un array con los campos del sort;
  * sin embargo, es responsabilidad de la implementacion del servicio realizar
  * los ajustes necesarios a la consulta
  *******/
const processSortBy = (req, res, next) => {
	if(!req.query['sort']){
		next()
		return
	}

	var sort = req.query['sort']
	req._sortBy = sort.split(',').map((s) => {
		return (s.indexOf('-') >= 0)
			? [s.replace('-',''),'desc']
			: [s.replace('+',''),'asc']
	})
	next()
}

app.use(processSortBy)

const processLimit = (req, res, next) => {
	if(req.query.limit == undefined){
		next()
		return
	}
	req._limit = req.query['limit']

	//offset no tiene sentido sin limit
	if(req.query.offset != undefined) req._offset = req.query['offset']
		next()
}

app.use(api_prefix+'core', core_ws);
app.use(api_prefix+'user', user_ws);
app.use(`${api_prefix}${routes.feed_item}`, feed_item_ws);
app.use(`${api_prefix}${routes.discipline}`, discipline_ws);
app.use(`${api_prefix}${routes.competition}`, competition_ws);
app.use(`${api_prefix}${routes.season}`, season_ws);
app.use(`${api_prefix}${routes.category}`, category_ws);
app.use(`${api_prefix}${routes.gender}`, gender_ws);
app.use(`${api_prefix}${routes.phase}`, phase_ws);
app.use(`${api_prefix}${routes.group}`, group_ws);
app.use(`${api_prefix}${routes.round}`, round_ws);
app.use(`${api_prefix}${routes.match}`, match_ws);
app.use(`${api_prefix}${routes.team}`, team_ws);
app.use(`${api_prefix}${routes.event}`, event_ws);
app.use(`${api_prefix}${routes.referee}`, referee_ws);
app.use(`${api_prefix}${routes.category_type}`, category_type_ws);
app.use(`${api_prefix}${routes.player}`, player_ws);
app.use(`${api_prefix}${routes.rule}`, rule_ws);
app.use(`${api_prefix}${routes.match_event}`, match_event_ws);
app.use(`${api_prefix}${routes.subdiscipline}`, subdiscipline_ws);
app.use(`${api_prefix}${routes.test}`, test_ws);
app.use(`${api_prefix}${routes.position}`, position_ws);
app.use(`${api_prefix}${routes.status_type}`, status_type_ws);
app.use(`${api_prefix}${routes.request}`, request_ws);
app.use(`${api_prefix}${routes.club}`, club_ws);

app.get(api_prefix, function(request, response){
	// app._router.stack.forEach(function(r){
	//   if (r.route && r.route.path){
	//     console.log(r.route.path)
	//   }
	// });
	response.send({api:'api'});
});

app.listen(port, function(){
	// console.log('Running ' + process.env.NODE_ENV +' on port ' + port);
});
