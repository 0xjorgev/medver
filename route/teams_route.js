if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
		,'../model/index'
		,'../util/request_message_util'
		,'../util/knex_util'
		,'../util/response_message_util'
		,'../util/logger_util'
        ,'../helpers/auth_helper'
	],
	function (express
		,Models
		,Message
		,Knex
		,Response
		,logger
        ,auth){

	var router = express.Router();

	//List of teams
	router.get('/', function (req, res) {
		return Models.team
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['category_type'
			,'organization'
			,'player_team.player'
			,'subdiscipline'
			,'gender'
			,'entity'
			,'club']})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

	router.get('/:team_id/player', function (req, res) {
		var team_id = req.params.team_id;

		return Models.player_team
		.where({team_id:team_id})
		.where({active:true})
		.fetchAll({withRelated: ['player', 'position'], debug: false})
		.then(function (result) {
			//calculo la edad de cada jugador
			//var players = result.map(s)
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	router.get('/:team_id', function (req, res) {
		var team_id = req.params.team_id;
		return Models.team
		.where({id:team_id, active:true})
		.fetch({withRelated: ['category_type'
			,'organization'
			,'player_team.player'
			,'subdiscipline'
			,'gender'
			,'entity'
			,'player_team.position'
			,'club']})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error));

	});

	router.get('/:team_id/player/:player_id', function (req, res) {
		var team_id = req.params.team_id;
		var player_id = req.params.player_id;

		return Models.player_team
		.where({team_id:team_id})
		.where({player_id:player_id})
		.where({active:true})
		.fetch({withRelated: ['player', 'position'], debug: false})
		.then(function (result) {
			//calculo la edad de cada jugador
			//var players = result.map(s)
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});
	//TODO: Esto parece no estar en uso, deberia arrojar error al probar
	router.post('/organization/:org_id/category/:cat_id', function (req, res) {

		console.log('Team: ', req.body);
		//Model Instance
		var Team        = Models.team;
		var team_post   = req.body;
		var org_id      = req.params.org_id;
		var cat_id      = req.params.cat_id;
		var logo_url    =  req.params.logo_url;
		var short_name  =  req.params.short_name;
		var description =  req.params.description;
		var subdiscipline_id =  req.params.subdiscipline_id;
		var gender_id 	=  req.params.gender_id;
		var name        = group_post.name;

		new Team(team_post).save()
		.then((new_team) => Response(res, new_team) )
		.catch((error) => Response(res, null, error));
	});

	//==========================================================================
	// CRUD functions
	//==========================================================================
	var saveTeam = function(data, res){

		let teamData = {}
		let clubData = {}

		if (data.name != undefined) teamData.name = data.name.trim()
		if (data.logo_url != undefined) teamData.logo_url = data.logo_url
		if (data.portrait_url != undefined) teamData.portrait_url = data.portrait_url
		if (data.category_type_id != undefined) teamData.category_type_id = data.category_type_id
		if (data.subdiscipline_id != undefined) teamData.subdiscipline_id = data.subdiscipline_id
		if (data.gender_id != undefined) teamData.gender_id = data.gender_id
		if (data.meta != undefined) teamData.meta = data.meta
		if (data.short_name != undefined) teamData.short_name = data.short_name
		if (data.description != undefined) teamData.description = data.description
		if (data.club_id != undefined) teamData.club_id = data.club_id
		if (data.id != undefined) teamData.id = data.id

		//let's lookup for the club by id 
		return Models.club.query(qb => {
			qb.where({id: teamData.club_id})
		})
		.fetch()
		.then(found => {
			//if found, let's put its id on clubData
			if(found){
				return found
			}
			else
			{
				//Seteamos el club en base al los datos del equipo y lo salvamos
				clubData.name = teamData.name
				clubData.short_name = teamData.short_name
				clubData.description = ''
				clubData.logo_url = teamData.logo_url
				clubData.portrait_url = teamData.portrait_url
				clubData._currentUser = data._currentUser
				return Models.club.saveClub(clubData)
			}
		})
		.then(club => {
			// logger.debug(club)
			clubData.id  = club.attributes.id
			teamData.club_id = clubData.id
			teamData._currentUser = data._currentUser
			return Models.team.saveTeam(teamData)
		})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	}

	//creacion de team
	router.post('/', (req, res) => {
		var data = req.body
		data._currentUser = req._currentUser
		saveTeam(data, res)
	});

	//actualizacion de team
	router.put('/:team_id', function(req, res, next){
		var data = req.body
		data._currentUser = req._currentUser
		//setting the ID on the object to be saved is the way to signal bookshelf to create or update
		data.id = req.params.team_id
		saveTeam(data, res)
	});

	//inactivates the team
	router.delete('/:team_id', function(req, res){
		var teamId = req.params.team_id
		var teamData = {}
		if (teamId != undefined) teamData.id = teamId

		teamData.active = false

		return new Models.team(teamData).save()
		.then(result => {
			return Models.team
			.where({id:teamId})
			.fetch({withRelated: ['category_type'
				,'organization'
				,'player_team.player'
				,'subdiscipline'
				,'gender'
				,'entity'
				,'player_team.position']})
		})
		.then((result) => Response(res, result))
		.catch((error) => Response(res, null, error))
	})

	var savePlayerTeam = (playerTeamData, res) => {
		// logger.debug('savePlayerTeam')
		// logger.debug(playerTeamData)

		//chequeo de tipo array
		if(!(Object.prototype.toString.call( playerTeamData ) === '[object Array]')) {
			playerTeamData = [playerTeamData]
		}

		//TODO: check player existance
		Promise.all(playerTeamData.map(data => {
			//se escribe la tabla de jugador
			return new Models.player(data.player)
			.save()
			.then( savedPlayer => {
				//se escribe el roster del equipo
				var ptData = {
					number	: data.team_player.number
					,player_id : savedPlayer.attributes.id
					,position_id : data.team_player.position_id
					,team_id : data.team_player.team_id
				}

				if(data.team_player.id !== undefined && data.team_player.id !== null){
					ptData.id = data.team_player.id
				}

				return new Models.player_team(ptData)
				.save()
			})
		}))
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error) )
	}

	// Saves into players_teams, the roster of this team
	router.post('/:team_id/player', function(req, res){
		var data = req.body
		//TODO: validar que en el objeto de entrada no se estén enviando IDs de player y o de player team ... esto haría un update ne lugar de un create
		console.log('POST team - team_id', req.params, 'data', data )
		savePlayerTeam(data, res)
	})

	// updates players_teams, the roster of this team
	router.put('/:team_id/player/:player_id', function(req, res){
		var data = req.body
		data.id = req.params.team_id
		data.player.id = parseInt(req.params.player_id)
		console.log('PUT team - team_id', req.params, 'data', data )
		savePlayerTeam(data, res)
	})

	//inactivates the player from the roster
	router.delete('/:team_id/player/:player_id', function(req, res){
		var PlayerTeam = new Models.player_team()
		var playerId = req.params.player_id
		var teamId = req.params.team_id

		console.log('DELETE team - team_id', req.params )

		var _found = undefined

		PlayerTeam.where({team_id: teamId, player_id: playerId})
		.fetch()
		.then((result) => {
			return new Models
				.player_team({id: result.attributes.id, active: false})
				.save()
		})
		.then((result) => Response(res, result))
		.catch((error) => Response(res, null, error))
	})

	//TODO: es necesario filtrar las competiciones recibidas por organizacion
	router.get('/:team_id/competition', (req, res) => {
		Models.category_group_phase_team
		.query(qb => qb.where({team_id: req.params.team_id}) )
		.fetchAll({withRelated: ['team','category.season.competition']})
		.then(result => Response(res, result) )
		.catch(error => Response(res, null, error) )
	})

	//List of teams by category Type and gender
	router.get('/category_type/:category_type_id/gender/:gender_id', function (req, res) {
		return Models.team
		.query(function(qb){})
		.where({category_type_id:req.params.category_type_id})
		.where({gender_id:req.params.gender_id})
		.where({active:true})
		.fetchAll({withRelated: ['category_type', 'organization', 'player_team.player', 'subdiscipline', 'gender', 'entity']})
		.then((result) => Response(res, result))
		.catch((error) =>  Response(res, null, error))
	});

	//==========================================================================
	// Create a team request for participation in a category
	//==========================================================================
	router.post('/:team_id/category/:category_id/request', (req, res) => {
		var category_id = req.params.category_id
		var team_id = req.params.team_id

		//Obtengo el id de las entidades Team y category
		var teamEntity = null
		var categoryEntity = null
		var status = {}

		Models.status_type
		.where({code: 'request-pending'})
		.fetch()
		.then(found => {
			status = found.attributes.id
			return status
		})
		.then(status => {
			Models.entity
			.query(qb => {
				qb.where({object_id: team_id,
					object_type: 'teams' })
				qb.orWhere({object_id: category_id})
				qb.where({object_type: 'categories'})
			})
			.fetchAll()
			.then((result) => {
				var tmp = result.toJSON()
				teamEntity = tmp.filter(e => e.object_type == 'teams')
				categoryEntity = tmp.filter(e => e.object_type == 'categories')
				//Salvamos en la tabla de request
				new Models.entity_request({
					ent_ref_from_id: teamEntity[0].id
					,ent_ref_to_id: categoryEntity[0].id
					,status_id: status
				})
				.save()
				.then((result) => Response(res, result))
				.catch((error) =>  Response(res, null, error))
			})
			.catch(error => Response(res, null, error))
		})
		.catch(error => Response(res, null, error))
	})

	//==========================================================================
	// Get all active teams that are related to the user
	//==========================================================================
	router.get('/query/by_user', (req, res) => {
		//se verifica unicamente que haya un usuario valido en el request
		//no se requiere ningun permiso especial
		let currentUser = req._currentUser
		// logger.debug(currentUser)
		const permissionCheck = auth.checkPermissions({
			user: currentUser
			,object_type: 'teams'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		Models.user
		.query(qb => qb.where({id: currentUser.id}) )
		.fetch({withRelated: [
			'entity.related_from.relationship_type'
			,'entity.related_from.to.entity_type'
		]})
		.then(result => {
			const user = result.toJSON()
			//con esto se filtran las relaciones para que solo sean los equipos
			return user.entity.related_from
			.filter(rel => rel.to.object_type == 'teams')
			//y con este map se extraen los ids de los teams
			.map(teams => teams.to.object_id)
		})
		.then(result => {
			return Models.team
			.query(qb => qb.whereIn('id', result))
			.fetchAll({withRelated: ['category_type'
				,'gender'
				,'category_group_phase_team.category.season.competition'
				,'category_group_phase_team.status_type'
				,'subdiscipline']
			})
	})
	.then(result => Response(res, result) )
	.catch(error => Response(res, null, error))
})

	//==========================================================================
	// Get all the matches of a team
	//==========================================================================
    router.get('/:team_id/match', (req, res) => {
    	//Se buscan todos los matches por el team_id
		// logger.debug('Get all the matches of the team ' + req.params.team_id)
		var team_id = req.params.team_id
		var currentDate = new Date()
		var pastMatches
		var nextMatch
		var futureMatches
		// logger.debug('currentDate ' + currentDate)
		//conseguimos los matches pasados
        return Models.match
        .query(qb => {
			qb.where({home_team_id: team_id})
			.orWhere({visitor_team_id: team_id})
			.whereNot({date: null})
			.where({active: true})
			.orderBy('date')
		})
        .fetchAll({withRelated: ['home_team'
		    , 'home_team.category_type'
		    , 'home_team.gender'
		    , 'visitor_team'
		    , 'visitor_team.category_type'
		    , 'visitor_team.gender'
        	, 'group.phase.category'
        	, 'result.event'
        	, 'result.player_in'
        	, 'result.player_out'
		    , 'home_team.club'
		    , 'visitor_team.club'
        	]})
        .then(past => {
        	var allmatches = past.toJSON()
			futureMatches = allmatches.filter(function(g){
							return g.date >= currentDate
						})
			nextMatch = futureMatches[0]
			pastMatches = allmatches.filter(function(g){
							return g.date < currentDate
						})
			var schedule = {
					nextMatch: nextMatch,
					futureMatches: futureMatches,
					pastMatches: pastMatches
				}
			return schedule
        })
        .then(result => Response(res, result) )
        .catch(error => Response(res, null, error))
    })

    //==========================================================================
	// Get all Event_Calendar of a team
	//==========================================================================
	router.get('/:team_id/event_calendar', (req, res) => {
		let team ={}
		team.id = req.params.team_id
        
        //Obtengo los datos del team y su entidad
        return Models.team
			.query(function(qb){})
			.where({id:team.id})
			.where({active:true})
			.fetch({withRelated: [
	             'entity'
	        ]})
		.then(_team => {
        	team = _team.toJSON()
			//Con los datos de la entidad del team se obtienes los eventos asociados
			return Models.entity_relationship
				.query(function(qb){})
				.where({ent_ref_to_id:team.entity.id})
				.where({relationship_type_id:8})
				.where({active:true})
				.fetchAll({withRelated: [
		            'from.object'
		        ]})
        })
        .then(_entRel => {
        	let eventCalendar = _entRel.toJSON()
        	logger.debug(eventCalendar)
        	//Se va a crear un objeto que va a ser el team con todos sus eventos de calendario parametro tipo arreglo con el nombre de eventsCalendars
        	team.eventsCalendars = []

        	team.eventsCalendars =  eventCalendar.map(eventCalendar => eventCalendar.from.object)

        	return team
        })
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
    })


	return router;
});
