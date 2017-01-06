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
	) => {

    var router = express.Router();

    //matches index
    router.get('/', (req, res) => {
        return Models.match
        .query((qb) => {})
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
        .fetch({withRelated: ['home_team', 'visitor_team', 'round.group']})
        .then( (result) => {
            Response(res, result)
        })
		.catch((error) => {
            Response(res, null, error)
        });
    });

	//=========================================================================
	// Returns the player list for a given match
	//=========================================================================
	router.get('/:match_id/player', (req, res) => {
		var match_id = req.params.match_id;
		return Models.match
		.where({'id': match_id})
		.fetch({withRelated: [
			'home_team.match_player_team.player.player_team.position'
			,'visitor_team.match_player_team.player.player_team.position'
			,'events.event'
			,'events.player_in'
			,'events.player_out'
			,'group']
		})
		.then((result) => {
			Response(res, result);
		})
		.catch((error) => {
			Response(res, null, error);
		});
	});

	router.get('/:match_id/team', (req, res) => {
		var match_id = req.params.match_id;
		return Models.match
		.where({'id': match_id})
		.fetch({withRelated: [
			'events.event',
			'events.player_in',
			'events.player_out',
			'home_team.match_player_team',
			'visitor_team.match_player_team',
			'round.group.phase.category.category_type',
			'round.group.phase.category.season.competition',
			'home_team.summoned.player.gender',
			'home_team.summoned.player.player_team.position',
			{ 'home_team.summoned': function(qb) {
				qb.innerJoin('matches', 'categories_teams_players.team_id', 'matches.home_team_id')
				qb.innerJoin('groups', 'matches.group_id', 'groups.id')
				qb.innerJoin('phases', 'groups.phase_id', 'phases.id')
				qb.where(Knex.raw('categories_teams_players.category_id = phases.category_id'))
				qb.where('matches.id',  match_id)
			}},
			'visitor_team.summoned.player.gender',
			'visitor_team.summoned.player.player_team.position',
			{ 'visitor_team.summoned': function(qb) {
				qb.innerJoin('matches', 'categories_teams_players.team_id', 'matches.visitor_team_id')
				qb.innerJoin('groups', 'matches.group_id', 'groups.id')
				qb.innerJoin('phases', 'groups.phase_id', 'phases.id')
				qb.where(Knex.raw('categories_teams_players.category_id = phases.category_id'))
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
            team_id: req.params.team_id,
            player_id: req.params.player_id
        }

        console.log('GET /:match_id/team/:team_id/player', data)

        return Models.match_team_player
            .where({match_id: data.match_id, team_id: data.team_id})
            .fetchAll()
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
        if(req.body.position != undefined) data.position = req.body.position
        if(req.body.number != undefined) data.number = req.body.number
        if(req.body.active != undefined) data.active = req.body.active

        console.log('PUT /:match_id/team/:team_id/player/', data)

        return new Models.match_team_player(data).save()
            .then( (result) => {
                Response(res, result)
            })
			.catch( (error) => {
				Response(res, null, error)
        	})
    });

    const saveMatch = (req, res) => {
        //http://stackoverflow.com/questions/34969701/knex-js-incorporating-validation-rules-in-create-update-and-delete-queries
        //https://github.com/tgriesser/checkit
        var data = req.body;

        console.log('saveMatch', data)

        var Match = Models.match

        var matchData = {}
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

		//datos para los placeholders
		// si se envia un team_id, para home o visitor, se elimina la informacion del placeholder correspondiente
		if(data.home_team_id == undefined || data.home_team_id == null){
			if(data.placeholder_home && data.placeholder_home.group_id != undefined)
				matchData.placeholder_home_team_group = data.placeholder_home.group_id
			if(data.placeholder_home && data.placeholder_home.position != undefined)
				matchData.placeholder_home_team_position = data.placeholder_home.position
		}
		else {
			matchData.placeholder_home_team_group = null
			matchData.placeholder_home_team_position = null
		}

		if(data.visitor_team_id == undefined || data.visitor_team_id == null){
			if(data.placeholder_visitor && data.placeholder_visitor.group_id != undefined)
				matchData.placeholder_visitor_team_group = data.placeholder_visitor.group_id
			if(data.placeholder_visitor && data.placeholder_visitor.position != undefined)
				matchData.placeholder_visitor_team_position = data.placeholder_visitor.position
		}
		else {
			matchData.placeholder_visitor_team_group = null
			matchData.placeholder_visitor_team_position = null
		}

        var categoryData = {}
        if(data.category_id != undefined)   categoryData.category_id = data.category_id
        if(data.phase_id != undefined)      categoryData.phase_id = data.phase_id
        if(data.group_id != undefined)      categoryData.group_id = data.group_id

        var refereeData = {}
        if(data.referee_id != undefined) refereeData.referee_id = data.referee_id

        var roundData = {}
        if(data.group_id){
            var roundData = {
                group_id: data.group_id,
                name: `Round of Group ${data.group_id}`
            }
        }

        if(data.round_id) roundData.id = data.round_id
		roundData.name = 'Round'

        //para almacenar el match creado
        let _match = null
        //dado que no se están utilizando las rondas, se crea una ronda si el grupo recibido no tiene una creada
        //en caso de que la ronda exista, solo se hace update
        new Models.round(roundData)
		.save()
        .then((round) => {
			//se salvan los datos del match
            matchData.round_id = round.attributes.id
            return new Match(matchData).save()
        })
		.then((match) => {
            // //TODO: asignacion temporal, mientras elimino round_id de esta tabla
            // _match.group_id = match.round.group_id
            return Models.match
            .query((qb) => {
                qb.select(Knex.raw('matches.*, matches_referees.id as matches_referee_id'))
                qb.leftJoin('matches_referees', 'matches.id', 'matches_referees.match_id')
                qb.where({'matches.id': match.attributes.id})
            })
            .fetch()
        })
        .then((result) => {
            _match = result.attributes
            refereeData.match_id = _match.id

            if( _match.matches_referee_id != null || _match.matches_referee_id != undefined)
                refereeData.id = _match.matches_referee_id

			//TODO: se está duplicando el referi cuando se actaliza el registro;
			//para evitar eso es necesario devolver el id de la tabla referee_match
            return new Models.match_referee(refereeData).save()
        })
        .then((result) => {
			//se obtiene el ID del referee para devolverlo en la respuesta del servicio
			if(result.attributes.referee_id)
				_match.referee_id = result.attributes.referee_id

			//se actualiza el standing_table del grupo del match
			if(data.played && data.played === true){
				console.log(_match);
				logger.debug(_match);

				StandingTable.calculateByGroup(_match.group_id)
                .then(r => {
                    return PlaceholdersHelper
                        .replacePlaceholders(_match.group_id)
                })
			}
			return result
		})
		.then(result => Response(res, _match))
        .catch(error => Response(res, null, error))
    }

    //match create
    router.post('/', (req, res) => {
        console.log('POST /match', req.body)
        saveMatch(req, res)
     })

    //match update
    router.put('/:match_id', (req, res) => {
        console.log('PUT /match', req.body)
		req.body.id = req.params.match_id
        saveMatch(req, res)
    });

	router.get('/:match_id/event', (req, res) => {
		var match_id = req.params.match_id
		return Models.event_match_player
		.where({match_id: match_id, active: true})
		.fetchAll({withRelated: ['match_id'
			,'event_id'
			,'player_in.player_team'
			,'player_out.player_team'
			,'team']
			, debug: false})
		.then(result => Response(res, result))
		.catch((error) => Response(res, null, error))
	})

	//servicio para almacenar los eventos de un partido; genera feed items
	router.post('/:match_id/event', (req, res) => {
		//Model Instance
		//{match_id:5, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }
		const matchId = req.params.match_id
		logger.debug(req.body)
		const body = utilities.isArray(req.body) ? req.body : [req.body]
		const matchResult = body.map(_event => {
			let event = _event
			event.match_id = matchId
			return event
		})

		return Promise.all(matchResult.map(mr => {
			return new Models.event_match_player(mr)
			.save()
			// .then(createFeedItemFromEvent)
			.then(FeedItemHelper.createFeedItemFromEvent)
		}))
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

	//para importarlo desde core route, e utilizarlo para rebuild feed
	router.createFeedItemFromEvent = createFeedItemFromEvent

	//feed de un match
	router.get('/:match_id/feed', (req, res) => {
		Models.match
		.where({id: req.params.match_id})
		.fetch({withRelated: [
			'entity.feed_items'], debug: false})
		.then(result => {
			logger.debug(result.toJSON())
			return 'hulefante'
		})
		.then(user => {
			//ahora con las entidades relacionadas a este user,
			//traigo los feeds asociados a ellas o al mismo usuario
			//se extraen los ids de las entidades
			let ids = null
			if(user.related_entities){
				ids = user.related_entities.filter(rel => {
					return rel.entity_id && rel.entity_id !== null
				})
				.map(rel => rel.entity_id)

				//obtengo las relaciones de las entidades
				return Models.entity_relationship
				.query(qb => {
					qb.whereIn('ent_ref_to_id', ids)
					//filtrar solamente por tipo 3 -> feed item
					qb.where('relationship_type_id', 3)
				})
				.fetchAll({withRelated: ['from.object', 'to.object']})
				.then(rel => {
					//proceso el resultado, para retornar solamente los feeds
					return rel.toJSON()
					.map(r => {
						let fi = r.from.object
						//TODO: un FI puede tener varias entidades asociadas, este codigo debe ir en un map
						if(fi){
							tmpTo.object_type = r.to.object_type
							fi.related_entities = [r.to.object]
						}
						return fi
					})
				})
			}
			else {
				return []
			}
		})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	return router;
});
