  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  // var uuid = require('uuid');
  // var nJwt = require('nJwt');
  var discipline_ws = require('./route/disciplines_route');
  var user_ws = require('./route/users_route');
  var competition_ws = require('./route/competitions_route');
  var season_ws = require('./route/seasons_route');
  var category_ws = require('./route/categories_route');
  var gender_ws = require('./route/genders_route');
  var phase_ws = require('./route/phases_route');
  var group_ws = require('./route/groups_route');
  var round_ws = require('./route/rounds_route');
  var team_ws = require('./route/teams_route');

  var apiVersion = 'v1.0';
  var prefix = 'api';
  var api_prefix = `/${prefix}/${apiVersion}/`; //'template literal syntax' is only available in ES6 (use 'esversion: 6').

  /*
      app.use(api_prefix+'discipline', discipline_ws);
      app.use(api_prefix+'competition', competition_ws);
      app.use(api_prefix+'season', season_ws);
      app.use(api_prefix+'category', category_ws);
      app.use(api_prefix+'gender', gender_ws);
  */

  //routes names
  var routes = {
    discipline      : 'discipline',
    subddiscipline  : 'subddiscipline',
    competition     : 'competition',
    season          : 'season',
    category        : 'category',
    gender          : 'gender',
    contact         : 'contact',
    organization    : 'organization',
    phase           : 'phase',
    group           : 'group',
    round           : 'round',
    team            : 'team',
    match           : 'match',
    rule            : 'rule',
    ruleset         : 'ruleset'
  }

  //Middleware
  var allowCrossDomain = function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
    res.header('origins','*');
    // res.header('origins','https://herokuapp.com:* https://somosportpocdev.herokuapp.com:* https://somosport-competition-dev.herokuapp.com:*');
    res.header('Access-Control-Allow-Credentials', 'true');
  	next();
  };

	app.use(allowCrossDomain);
	// parse application/json
	app.use(bodyParser.json());

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({type: 'application/vnd.api+json'}));

	//app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  //Non Token Route
  app.use(api_prefix+'user', user_ws);

  //Token Route
  app.use(`${api_prefix}${routes.discipline}`, discipline_ws);
  app.use(`${api_prefix}${routes.competition}`, competition_ws);
  app.use(`${api_prefix}${routes.season}`, season_ws);
  app.use(`${api_prefix}${routes.category}`, category_ws);
  app.use(`${api_prefix}${routes.gender}`, gender_ws);
  app.use(`${api_prefix}${routes.phase}`, phase_ws);
  app.use(`${api_prefix}${routes.group}`, group_ws);
  app.use(`${api_prefix}${routes.round}`, round_ws);
  app.use(`${api_prefix}${routes.team}`, team_ws);

  // app.use(api_prefix+'competition', competition_ws);
  // app.use(api_prefix+'season', season_ws);
  // app.use(api_prefix+'category', category_ws);
  // app.use(api_prefix+'gender', gender_ws);

  app.get(api_prefix, function(request, response){
    // app._router.stack.forEach(function(r){
    //   if (r.route && r.route.path){
    //     console.log(r.route.path)
    //   }
    // });

    response.send({api:'api'});
  });

  var port = process.env.PORT;
  console.log('Port is: ', process.env.PORT);
  console.log('Environment is: ', process.env.NODE_ENV);
  app.listen(port, function(){
    console.log('Running on port ' + port);
  });