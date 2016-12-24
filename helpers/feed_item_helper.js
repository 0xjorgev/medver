if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['../util/logger_util'],
	(logger) => {

	var feedItemHelper = {}


	const createFeedItemFromEvent = function(result){
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
			let entities = _entities.toJSON()
			let teams = entities.filter(ent => ent.object_type === 'teams')
			let team = teams[0]
			let match = entities.filter(ent => ent.object_type === 'matches')[0]
			let player = entities.filter(ent => ent.object_type === 'players')[0]
			let event = entities.filter(ent => ent.object_type === 'events')[0]

			let homeTeam = teams.filter(
				t => match.object.home_team.id === t.object.id )[0]
			let visitorTeam = teams.filter(
				t => match.object.visitor_team.id === t.object.id )[0]

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
			if(player){
				feedItemData.info.push({ placeholder: '$PLAYER'
					,messages: {
						en: `${player.object.first_name} ${player.object.last_name}`
						,es: `${player.object.first_name} ${player.object.last_name}`
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



	return feedItemHelper
})
