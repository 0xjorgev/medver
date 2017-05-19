if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'
	,'../model/index'
	,'../util/request_message_util'
	,'../util/knex_util'
	,'util'
	,'../util/response_message_util'
	,'../helpers/standing_table_helper'
	,'../helpers/team_placeholders_helper'
	,'../util/generic_util'
	,'../util/logger_util'
	,'../helpers/feed_item_helper'
  , 'bookshelf'
	],
	(express
	,Models
	,Message
	,Knex
	,util
	,Response
	,StandingTable
	,PlaceholdersHelper
	,utilities
	,logger
	,FeedItemHelper
	,bookshelf
	) => {

	let router = express.Router();

	//matches index
	router.get('/', (req, res) => {

		return Models.match
		.query((qb) => {})
    // .fetchPage({
    //   pageSize: 5, // Defaults to 10 if not specified
    //   page: 1, // Defaults to 1 if not specified
    //   withRelated: ['home_team','visitor_team'] // Passed to Model#fetchAll
    // })
		.fetchAll({withRelated: ['home_team', 'visitor_team']} )
		.then(result => {
			Response(res, result)
		})
		.catch(error => {
			Response(res, null, error)
		});
	});

	//matches show
	router.get('/:match_id', (req, res) => {
		var match_id = req.params.match_id;
		return Models.match
		.where({'id':match_id})
		.fetch({withRelated: [
			 {'home_team.summoned': function(qb){
				qb.innerJoin('matches', 'category_summoned.team_id', 'matches.home_team_id')
 				qb.innerJoin('groups', 'matches.group_id', 'groups.id')
 				qb.innerJoin('phases', 'groups.phase_id', 'phases.id')
 				qb.where(Knex.raw('category_summoned.category_id = phases.category_id'))
 				qb.where('matches.id',  match_id)
 				qb.where('category_summoned.active',  true)
			 }}
			,{'visitor_team.summoned': function(qb){
				qb.innerJoin('matches', 'category_summoned.team_id', 'matches.visitor_team_id')
 				qb.innerJoin('groups', 'matches.group_id', 'groups.id')
 				qb.innerJoin('phases', 'groups.phase_id', 'phases.id')
 				qb.where(Knex.raw('category_summoned.category_id = phases.category_id'))
 				qb.where('matches.id',  match_id)
				qb.where('category_summoned.active',  true)
			}}
			,'home_team.summoned.player.person.gender'
			,'home_team.summoned.player.position'
			,'visitor_team.summoned.player.person.gender'
			,'visitor_team.summoned.player.position'
			,'group'
			,'events.event'
			,'events.team'
		]})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

	//=========================================================================
	// Returns the player list for a given match
	//=========================================================================
	router.get('/:match_id/player', (req, res) => {
		var match_id = req.params.match_id;
		return Models.match
		.where({'id': match_id})
		.fetch({withRelated: [
			'home_team.match_player.player.position'
			,'home_team.match_player.player.person.gender'
			,'visitor_team.match_player.player.position'
			,'visitor_team.match_player.player.person.gender'
			,'events.event'
			,'events.player_in'
			,'events.player_out'
			,'group']
		})
		.then(result => Response(res, result) )
		.catch(error => Response(res, null, error) );
	});

	router.get('/:match_id/team', (req, res) => {
		var match_id = req.params.match_id;
		return Models.match
		.where({'id': match_id, active: true})
		.fetch({withRelated: [
			'events.event',
			'events.player_in',
			'events.player_out',
			{ 'home_team.match_player': function(qb) {
				qb.where('match_id',  match_id)
			}},
			{ 'visitor_team.match_player': function(qb) {
				qb.where('match_id',  match_id)
			}},
			// 'round.group.phase.category.category_type',
			// 'round.group.phase.category.season.competition',
			{ 'home_team.summoned': function(qb) {
				qb.innerJoin('matches', 'category_summoned.team_id', 'matches.home_team_id')
				qb.innerJoin('groups', 'matches.group_id', 'groups.id')
				qb.innerJoin('phases', 'groups.phase_id', 'phases.id')
				qb.where(Knex.raw('category_summoned.category_id = phases.category_id'))
				qb.where('matches.id',  match_id)
			}},
			'home_team.summoned.player.person.gender',
			'home_team.summoned.player.position',
			'visitor_team.summoned.player.person.gender',
			'visitor_team.summoned.player.position',
			{ 'visitor_team.summoned': function(qb) {
				qb.innerJoin('matches', 'category_summoned.team_id', 'matches.visitor_team_id')
				qb.innerJoin('groups', 'matches.group_id', 'groups.id')
				qb.innerJoin('phases', 'groups.phase_id', 'phases.id')
				qb.where(Knex.raw('category_summoned.category_id = phases.category_id'))
				qb.where('matches.id',  match_id)
			}},
		], debug: false})
		.then( result => Response(res, result) )
		.catch( error => Response(res, null, error) );
	});


    //==========================================================================
    // gets the player list for a given match & team
    //==========================================================================
    router.get('/:match_id/team/:team_id/player', (req, res) => {

        var data = {
            match_id: req.params.match_id,
            team_id: req.params.team_id
        }

        console.log('GET /:match_id/team/:team_id/player', data)

        return Models.match_player
            .where({match_id: data.match_id, team_id: data.team_id})
            .fetchAll({withRelated: [
            		'team'
		            ,'player.person.gender'
		            ,'player.position'
		        	]})
            .then((result) => {
                Response(res, result)
            })
			.catch((error) => {
                Response(res, null, error)
        })
    });

    //==========================================================================
    // updates the player list for a given match & team
    //==========================================================================

    router.put('/:match_id/team/:team_id/player', (req, res) => {
        var data = {}
        if(req.body.id != undefined) data.id = req.body.id
        if(req.params.match_id != undefined) data.match_id = req.params.match_id
        if(req.params.team_id != undefined) data.team_id = req.params.team_id
        if(req.body.player_id != undefined) data.player_id = req.body.player_id
        if(req.body.position_id != undefined) data.position_id = req.body.position_id
        if(req.body.number != undefined) data.number = req.body.number
        if(req.body.active != undefined) data.active = req.body.active

        console.log('PUT /:match_id/team/:team_id/player/', data)

        return new Models.match_player(data).save()
            .then( (result) => {
                Response(res, result)
            })
			.catch( (error) => {
				Response(res, null, error)
        	})
    });

    //==========================================================================
    // Set the initial player list for a given match
    // WIP
    //==========================================================================

    router.post('/:match_id/team/:team_id/player', (req, res) => {
		let data = {}
		// | number | position | team_id | player_id | match_id |
		let match_id = req.params.match_id;
		let team_id = req.params.team_id;


		const body = utilities.isArray(req.body.data) ? req.body.data : [req.body.data]
		const initial_player = body.map(_initial_player_list => {

			logger.debug(team_id)
			logger.debug(match_id)

			let initialPlayer = _initial_player_list
			initialPlayer.match_id = match_id   //_initial_player_list.match_id
			initialPlayer.team_id = team_id   //_initial_player_list.team_id
			initialPlayer.number = _initial_player_list.number
			initialPlayer.player_id = _initial_player_list.player_id
			initialPlayer.position_id = _initial_player_list.position_id
			initialPlayer.is_initial = _initial_player_list.is_initial
			return initialPlayer
		})

		return Promise.all(initial_player.map(ip => {
			return new Models.match_player(ip)
			.save()
			// .then(createFeedItemFromEvent)
		}))
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	const saveMatch = (req, res) => {
		//http://stackoverflow.com/questions/34969701/knex-js-incorporating-validation-rules-in-create-update-and-delete-queries
		//https://github.com/tgriesser/checkit
		const data = req.body;
		logger.debug(data)

		let matchData = {}
		if(data.id != undefined)                    matchData.id = data.id
		if(data.number != undefined)                matchData.number = data.number
		if(data.location != undefined)              matchData.location = data.location
		if(data.home_team_id != undefined)          matchData.home_team_id = data.home_team_id
		if(data.visitor_team_id != undefined)       matchData.visitor_team_id = data.visitor_team_id
		if(data.home_team_score != undefined)       matchData.home_team_score = data.home_team_score
		if(data.visitor_team_score != undefined)    matchData.visitor_team_score = data.visitor_team_score
		if(data.group_id != undefined)              matchData.group_id =  data.group_id
		if(data.round_id != undefined)              matchData.round_id =  data.round_id
		if(data.date != undefined)                  matchData.date =  data.date
		if(data.played != undefined)                matchData.played =  data.played
		if(data.active != undefined)                matchData.active =  data.active

		//datos para los placeholders
		// si se envia un team_id, para home o visitor, se elimina la informacion del placeholder correspondiente
		if(data.home_team_id == undefined || data.home_team_id == null){
			if(data.placeholder_home_team_group != undefined)
				matchData.placeholder_home_team_group = data.placeholder_home_team_group
			if(data.placeholder_home_team_position != undefined)
				matchData.placeholder_home_team_position = data.placeholder_home_team_position
		}
		//por el momento no voy a a eliminar los campos
		// else {
		// 	matchData.placeholder_home_team_group = null
		// 	matchData.placeholder_home_team_position = null
		// }

		if(data.visitor_team_id == undefined || data.visitor_team_id == null){
			if(data.placeholder_visitor_team_group != undefined)
				matchData.placeholder_visitor_team_group = data.placeholder_visitor_team_group
			if(data.placeholder_visitor_team_position != undefined)
				matchData.placeholder_visitor_team_position = data.placeholder_visitor_team_position
		}
		// else {
		// 	matchData.placeholder_visitor_team_group = null
		// 	matchData.placeholder_visitor_team_position = null
		// }

		let refereeData = {}
		if(data.referee_id != undefined) refereeData.referee_id = data.referee_id

		//para almacenar el match creado
		let _match = null

		Models.match
		.forge(matchData)
		.save()
		.then(match => {
			return Models.match
			.query(qb => {
				qb.select(Knex.raw('matches.*, matches_referees.id as matches_referee_id'))
				qb.leftJoin('matches_referees', 'matches.id', 'matches_referees.match_id')
				qb.where({'matches.id': match.attributes.id})
			})
			.fetch()
		})
		.then(result => {
			_match = result.attributes
			refereeData.match_id = _match.id

			if( _match.matches_referee_id != null || _match.matches_referee_id != undefined)
			refereeData.id = _match.matches_referee_id

			//TODO: se está duplicando el referee cuando se actaliza el registro;
			//para evitar eso es necesario devolver el id de la tabla referee_match
			return new Models.match_referee(refereeData).save()
		})
		.then(result => {
			//se obtiene el ID del referee para devolverlo en la respuesta del servicio
			if(result.attributes.referee_id)
				_match.referee_id = result.attributes.referee_id

			//se actualiza el standing_table del grupo del match
			if(data.played && data.played === true){
				StandingTable.calculateByGroup(_match.group_id)
				//TODO: revisar esta llamada
				.then(r =>  PlaceholdersHelper.replacePlaceholders(_match.group_id) )
			}
			return result
		})
		.then(result => Response(res, _match))
		.catch(error => Response(res, null, error))
	}

	//match create
	router.post('/', (req, res) => {
		saveMatch(req, res)
	})

	//match update
	router.put('/:match_id', (req, res) => {
		req.body.id = req.params.match_id
		saveMatch(req, res)
	});

	router.get('/:match_id/event', (req, res) => {
		var match_id = req.params.match_id
		return Models.event_match_player
		.where({match_id: match_id, active: true})
		.fetchAll({withRelated: ['match_id'
			,'event_id'
			,'event'
			,'player_in.person.gender'
			,'player_out.person.gender'
			,'team']
			, debug: false})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	//servicio para almacenar los eventos de un partido; genera feed items
	//actualiza el score del match
	router.post('/:match_id/event', (req, res) => {
		//Model Instance
		//{match_id:5, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }
		const matchId = req.params.match_id
		// logger.debug(req.body)
		const body = utilities.isArray(req.body) ? req.body : [req.body]
		const matchResult = body.map(_event => {
			let event = _event
			event.match_id = matchId
			event.player_out = (_event.player_out !== undefined && _event.player_out !== null) ? _event.player_out : null
			event.player_in = (_event.player_in !== undefined && _event.player_in !== null) ? _event.player_in : null
			return event
		})
		// logger.debug(matchResult)
		return Promise.all(matchResult.map(mr => {
				logger.debug(mr)
				return new Models.event_match_player(mr)
					.save()
				.then(FeedItemHelper.createFeedItemFromEvent)
			}))
		.then(result => {
			return Models.match.forge({id: matchId})
				.fetch({withRelated: ['events.event'
									,'events.player_in.person.gender'
									,'events.player_out.person.gender']})
		})
		.then(match => match.updateScore())
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

	const createFeedItemFromEvent = result => {
		//creacion del feed item asociado a este evento
		//Se ubican las entidades involucradas con el evento
		return Models.entity.query(qb => {
			const match = result.related('match')
			qb.where({
				object_type: 'matches',
				object_id: result.attributes.match_id
			})
			if(match.related('home_team').get('id')){
				qb.orWhere({ object_id: match.related('home_team').get('id') })
				qb.where({ object_type: 'teams' })
			}
			if(match.related('visitor_team').get('id')){
				qb.orWhere({ object_id: match.related('visitor_team').get('id') })
				qb.where({ object_type: 'teams' })
			}
			if(result.attributes.player_in){
				qb.orWhere({ object_id: result.attributes.player_in })
				qb.where({ object_type: 'players' })
			}
			if(result.attributes.player_out){
				qb.orWhere({ object_id: result.attributes.player_out })
				qb.where({ object_type: 'players' })
			}
			if(result.attributes.event_id){
				qb.orWhere({ object_id: result.attributes.event_id })
				qb.where({ object_type: 'events' })
			}
		})
		.fetchAll({withRelated: 'object', debug: false})
		.then(_entities => {
			//creacion de un feed item para el evento recién salvado
			//esto debería disparar un hilo separado de ejecucion
			const entities = _entities.toJSON()
			const teams = entities.filter(ent => ent.object_type === 'teams')
			const players = entities.filter(ent => ent.object_type === 'players')
			const match = entities.filter(ent => ent.object_type === 'matches')[0]
			const event = entities.filter(ent => ent.object_type === 'events')[0]

			const team = teams.filter(
				t => result.attributes.team_id === t.object.id )[0]
			const homeTeam = teams.filter(
				t => match.object.home_team.id === t.object.id )[0]
			const visitorTeam = teams.filter(
				t => match.object.visitor_team.id === t.object.id )[0]

			const playerIn = players.filter(
				t => result.attributes.player_in === t.object.id )[0]
			const playerOut = players.filter(
				t => result.attributes.player_out === t.object.id )[0]

			let feedItemData = {}
			feedItemData.data = {
				object_type: 'events'
				,object_id: result.attributes.event_id
			}
			//Estas son las entidades que serán relacionadas con el FI
			feedItemData.related_entities = entities

			//En feedItemData.info se envian los datos que serán reemplazados en el template del FI
			feedItemData.info = []
			if(team){
				feedItemData.info.push({ placeholder: '$TEAM'
					,messages: {en: team.object.name, es: team.object.name}
				})
			}

			if(homeTeam){
				feedItemData.info.push({ placeholder: '$HOME_TEAM'
					,messages: {en: homeTeam.object.name, es: homeTeam.object.name}
				})
			}

			if(visitorTeam){
				feedItemData.info.push({ placeholder: '$VISITOR_TEAM'
					,messages: {en: visitorTeam.object.name, es: visitorTeam.object.name}
				})
			}

			if(match){
				feedItemData.info.push({ placeholder: '$MATCH'
					,messages: {
						en: `Match #${match.object.number ? match.object.number : match.object.id}`
						,es: `Partido #${match.object.number ? match.object.number : match.object.id}`
					}
				})
			}

			if(playerIn){
				feedItemData.info.push({ placeholder: '$PLAYER_IN'
					,messages: {
						en: `${playerIn.object.first_name} ${playerIn.object.last_name}`
						,es: `${playerIn.object.first_name} ${playerIn.object.last_name}`
					}
				})
			}

			if(playerOut){
				feedItemData.info.push({ placeholder: '$PLAYER_OUT'
					,messages: {
						en: `${playerOut.object.first_name} ${playerOut.object.last_name}`
						,es: `${playerOut.object.first_name} ${playerOut.object.last_name}`
					}
				})
			}
			feedItemData.info.push({ placeholder: '$INSTANT'
				,messages: {
					en: result.attributes.instant
					,es: result.attributes.instant
				}
			})

			feedItemData.info.push({ placeholder: '$DATE'
				,messages: {
					en: `on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
					,es: `el ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
				}
			})

			Models.feed_item.create(feedItemData)
			return result
		})
	}

	return router;
});
