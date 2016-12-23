if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
		,'../util/response_message_util'
		,'aws-sdk'
		,'../helpers/auth_helper'
		,'../model/index'
		,'../util/logger_util'
	],(
		express
		,Response
		,aws
		,auth
		,Models
		,logger
	) => {
	const router = express.Router()

	/*
	 * Loads the S3 information from environment variables.
	 */
	const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
	const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
	const S3_BUCKET = process.env.S3_BUCKET;

	/*
	* Respond to GET requests to /s3_signed_url
	* Upon request, return JSON containing the temporarily-signed S3 request and the
	* anticipated URL of the image.
	*/
	router.get('/s3_signed_url', (req, res) => {

		aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY })
		const s3 = new aws.S3()
		const s3_params = {
			Bucket: S3_BUCKET,
			Key: req.query.file_name,
			Expires: 60,
			ContentType: req.query.file_type,
			//FIXME: esto deberia ser configurado para que no sea público
			ACL: 'public-read'
		}

		s3.getSignedUrl('putObject', s3_params, (err, data) => {
			if(err){
				logger.error('err', err);
				return Response(res, null, err)
			}
			else{
				var return_data = {
					signed_request: data,
					url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
				}
				return Response(res, return_data)
			}
		})
	})

	// Reconstruye los feeds basado en los eventos
	router.post('/feed/rebuild', (req, res) => {

		const chk = auth.checkPermissions(req._currentUser, [])
		if(chk.code !== 0){
			Response(res, null, chk)
			return
		}

		Models.entity_relationship
		.where({relationship_type_id: 3}) //solo feed items
		.fetchAll()
		.then(result => {
			return result.map(r => r.destroy())
		})
		.then(result => {
			return Models.feed_item
				.fetchAll()
				.then(fis => {
					return fis.map(r => r.destroy())
				})
		})
		.then(result => {
			return Models.event_match_player
			.fetchAll()
			.then(events => {
				return Promise.all(events.map(e => {
					return e.load(['event','match', 'player_in', 'player_out'])
				}))
			})
		})
		.then(events => {
			return events.map(result => {
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
			})
		})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	return router
})
