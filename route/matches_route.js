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
	) => {

    var router = express.Router();

    //matches index
    router.get('/', (req, res) => {
        return Models.match
        .query((qb) => {})
        .fetchAll({withRelated: ['home_team', 'visitor_team']} )
        .then((result) => {
            Response(res, result)
        })
		.catch((error) => {
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
        .fetch({withRelated: ['home_team.match_player_team.player', 'visitor_team.match_player_team.player']})
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
            'home_team.match_player_team.player.gender',
            'visitor_team.match_player_team.player.gender',
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

    var saveMatch = (req, res) => {
        //http://stackoverflow.com/questions/34969701/knex-js-incorporating-validation-rules-in-create-update-and-delete-queries
        //https://github.com/hapijs/joi
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
        var _match = undefined
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
			//se guardan los datos del match para retornarse al final de la cadena
            // _match = match.attributes
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

            var _match = result.attributes

            refereeData.match_id = _match.id

            if( _match.matches_referee_id != null || _match.matches_referee_id != undefined)
                refereeData.id = _match.matches_referee_id

			//TODO: se está duplicando el referi cuando se actaliza el registro;
			//para evitar eso es necesario devolver el id de la tabla referee_match
            return new Models.match_referee(refereeData).save()
        })
        .then((result) => {
			//se obtiene el ID del referee para devolverlo en la respuesta del servicio
			_match.referee_id = result.attributes.referee_id

			//se actualiza el standing_table del grupo del match
			if(data.played && data.played === true){
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

	router.post('/:match_id/event', (req, res) => {
		//Model Instance
		//{match_id:5, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }
		let matchId = req.params.match_id
		let matchResult = req.body.map(_event => {
			let event = _event
			event.match_id = matchId
			return event
		})

		return Promise.all(matchResult.map(mr => {
			return new Models.event_match_player(mr)
			.save()
			.then(result => {
				//creacion del feed item asociado a este evento
				// logger.debug(result.toJSON())

				//obtener entidades de los involucrados
				//FIXME: se deberian buscar solo una vez las entidades team y match
				return Models.entity.query(qb => {
					qb.where({
						object_id: result.attributes.team_id
						,object_type: 'teams'
					})
					.orWhere({
						object_id: result.attributes.match_id
						,object_type: 'match'
					})
					//TODO: agregar busqueda de entidades de las personas
				})
				.fetchAll()
				.then(entities => {

					//FIXME: la creacion del feed item debe hacerse en el modelo
					// y disparar la creacion del entity y de sus elementos relacionados

					//TODO: de acuerdo al tipo de evento, deberia cambiar el mensaje. Adicionalmente, no todo evento requiere de un feedItem
					//inicialmente voy a filtrar los goles y el fin del partido
					return new Models.feed_item({
						message_en: `(EN) feed item of + ${result.attributes.event_id} + ${result.attributes.player_in} + ${result.attributes.player_out} + ${result.attributes.instant} + ${result.attributes.team_id} + ${result.attributes.match_id}`
						,message_es: `(ES) feed item de + ${result.attributes.event_id} + ${result.attributes.player_in} + ${result.attributes.player_out} + ${result.attributes.instant} + ${result.attributes.team_id} + ${result.attributes.match_id}`
					})
					.save()
					.then(feedItem => {
						//crear la entidad del Feed item
						return new Models.entity({
							object_id: feedItem.attributes.id
							,object_type: 'feed_items'
						})
						.save()
					})
					.then(feedItem => {

						// logger.debug(entities.toJSON())

						//crear las relaciones correspondientes del feed con las entidades
						return Promise.all(entities.toJSON().map(entity => {

							return new Models.entity_relationship({
								ent_ref_from_id: feedItem.attributes.id
								,relationship_type_id: 1 //TODO: reemplazar x relacion apropiada
								,ent_ref_to_id: entity.id
								,comment: `FEED ITEM OF ${entity.object_type} ${entity.id}`
							})
							.save()
						}))
					})
				})

			})
		}))
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

	return router;
});
