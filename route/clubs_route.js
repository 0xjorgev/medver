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

	//==========================================================================
	// Get all active clubs
	//==========================================================================
	router.get('/', function (req, res) {
		return Models.club
		.query(function(qb){})
		.where({active:true})
		.fetchAll()
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});
	
	//==========================================================================
	// Get all active clubs that are related to the user
	//==========================================================================
	router.get('/query/by_user', (req, res) => {
        //se verifica unicamente que haya un usuario valido en el request
        //no se requiere ningun permiso especial

        const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'clubs'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

        Models.user
        .query(qb => qb.where({id: req._currentUser.id}) )
        .fetch({withRelated: [
             'entity.related_from.relationship_type'
            ,'entity.related_from.to.entity_type'
        ]})
        .then(result => {
            var user = result.toJSON()
            //con esto se filtran las relaciones para que sean los clubs

            logger.debug(user)

            return user.entity.related_from
                .filter(rel => {
                    return rel.to.object_type == 'clubs'
                })
                //y con este map se extraen los ids de los clubs
                .map(clubs => clubs.to.object_id)
        })
        .then(result => {
            return Models.club
                .query(qb => qb.whereIn('id', result))
                .fetchAll()
        })
        .then(result => Response(res, result) )
        .catch(error => Response(res, null, error))
    })

    //==========================================================================
	// Get a club by his id
	//==========================================================================
	router.get('/:club_id', function (req, res) {
		
		var clubId = req.params.club_id
		return Models.club
		.query(function(qb){})
		.where({id:clubId})
		.where({active:true})
		.fetch({withRelated: [
             'entity'
        ]})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

    //==========================================================================
	// CRUD functions
	//==========================================================================
	var saveClub = function(data, res){

		return Models.club.saveClub(data)
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	}

	//creacion de club
	router.post('/', (req, res) => {
		// //Verificacion de permisos
  		const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'clubs'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		var data = req.body
		data._currentUser = req._currentUser
		saveClub(data, res)
	});

	//actualizacion de club
	router.put('/:club_id', function(req, res, next){
		//Verificacion de permisos
        const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'clubs'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		var data = req.body
		data._currentUser = req._currentUser
		//setting the ID on the object to be saved is the way to signal bookshelf to create or update
		data.id = req.params.club_id
		saveClub(data, res)
	});

	//inactivates the club
	router.delete('/:club_id', function(req, res){
		var clubId = req.params.club_id
		var clubData = {}
		//Requiere autorizacion por token
        logger.debug(clubId)
        const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'clubs'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		if (clubId != undefined) clubData.id = clubId
		
		clubData.active = false

		return new Models.club(clubData).save()
		.then(result => {
			return Models.club
			.where({id:clubId})
			.fetch()
		})
		.then((result) => Response(res, result))
		.catch((error) => Response(res, null, error))
	})

	//==========================================================================
	// Get all teams of a club
	//==========================================================================
	router.get('/:club_id/team', (req, res) => {
		var clubId = req.params.club_id
        return Models.team
            .query(qb => qb.where('club_id', clubId))
            .fetchAll({withRelated: ['category_type'
				,'gender'
				,'category_group_phase_team.category.season.competition'
				,'category_group_phase_team.status_type'
				,'subdiscipline'
				,'club'
			]})
        .then(result => Response(res, result) )
        .catch(error => Response(res, null, error))
    })

    //==========================================================================
	// Get all Matches of a club
	//==========================================================================
	router.get('/:club_id/match', (req, res) => {
		var clubId = req.params.club_id
		var currentDate = new Date()
		var pastMatches
		var nextMatch
		var futureMatches
        //no se requiere ningun permiso especial
        //Obtengo la entidad de un club
        Models.team
        .query(qb => qb.where({club_id: clubId}) )
        .fetchAll()
        .then(teams => {
        	var teamsID = teams.toJSON(teams).map(team => {
    			return team.id
    		})
			// logger.debug(teamsID)
			return Models.match
		        .query(qb => 
					qb.whereIn('home_team_id', teamsID)
					.orWhereIn('visitor_team_id', teamsID)
					.whereNot({date: null})
					.where({active: true})
					.orderBy('date')
				)
		        .fetchAll({withRelated: ['home_team'
		        	, 'visitor_team'
		        	, 'group.phase.category'
		        	, 	{ 'result': function(qb) {
							qb.whereIn('team_id',  teamsID)
						}}
					, 'result.event'
		        	, 'result.player_in'
		        	, 'result.player_out'
		        	, 'home_team.club'
		        	, 'visitor_team.club'
		        	]})
        })
        .then(matches => {

        	var allmatches = matches.toJSON()

			// logger.debug(allmatches)
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
	// Get all Event_Calendar of a club
	//==========================================================================
	router.get('/:club_id/event_calendar', (req, res) => {
		let club ={}
		club.id = req.params.club_id
        
        //Obtengo los datos del club y su entidad
        return Models.club
			.query(function(qb){})
			.where({id:club.id})
			.where({active:true})
			.fetch({withRelated: [
	             'entity'
	        ]})
		.then(_club => {
        	club = _club.toJSON()
			//Con los datos de la entidad del club se obtienes los eventos asociados
			return Models.entity_relationship
				.query(function(qb){})
				.where({ent_ref_to_id:club.entity.id})
				.where({relationship_type_id:8})
				.where({active:true})
				.fetchAll({withRelated: [
		            'from.object'
		        ]})
        })
        .then(_entRel => {
        	let eventCalendar = _entRel.toJSON()
        	// logger.debug(eventCalendar)
        	//Se va a crear un objeto que va a ser el club con todos sus eventos de calendario parametro tipo arreglo con el nombre de eventsCalendars
        	club.eventsCalendars = []

        	club.eventsCalendars =  eventCalendar.map(eventCalendar => eventCalendar.from.object)

        	return club
        })
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
    })


	return router;
});
