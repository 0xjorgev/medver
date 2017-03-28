if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
		,'../util/response_message_util'
		,'aws-sdk'
		,'../helpers/auth_helper'
		,'../model/index'
		,'../util/logger_util'
		,'../util/knex_util'
		,'../helpers/feed_item_helper'
		,'sha.js'
	],(
		express
		,Response
		,aws
		,auth
		,Models
		,logger
		,Knex
		,FeedItemHelper
		,createHash
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
		//se genera un hash con sha256 al nombre de archivo + el tiempo actual en segundos
		//esto se hace para evitar colisiones con los nombres de archivo al hacer upload
		const getFileExtension = (a) => {
			const idx = a.lastIndexOf('.')
			return idx == -1 ? '' : a.substring(idx, a.length)
		}
		const tmp = req.query.file_name + (new Date()).getTime()
		const ext = getFileExtension(req.query.file_name)
		const fileName = createHash('sha256').update(tmp, 'utf8').digest('hex') + ext

		aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY })

		const s3 = new aws.S3()
		const s3_params = {
			Bucket: S3_BUCKET,
			Key: fileName,
			Expires: 60,
			ContentType: req.query.file_type,
			//FIXME: esto debe ser configurado para que sea accesible solo por somosport
			ACL: 'public-read'
		}

		s3.getSignedUrl('putObject', s3_params, (err, data) => {
			if(err){
				logger.error('err', err);
				return Response(res, null, err)
			}
			else{
				return Response(res, {
					signed_request: data
					,url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
				})
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

		Knex('entities_relationships')
		.where({relationship_type_id: 3}) //solo feed items
		.del()
		.then(result => {
			logger.debug(`deleted ${result} feed item relations`)
			return Knex('feed_items').del()
		})
		.then(result => {
			logger.debug(`deleted ${result} feed items`)
			return Models.event_match_player
			.fetchAll()
			.then(events => {
				return Promise.all(events.map(e => {
					return e.load(['event','match', 'player_in', 'player_out'])
				}))
			})
		})
		.then(events => {

			logger.debug(FeedItemHelper)

			// return events.map(MatchRoute.createFeedItemFromEvent)
			return events.map(FeedItemHelper.createFeedItemFromEvent)
		})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	//crea las entidades de todos los objetos que lo requieran
	router.post('/entities/build', (req, res) => {
		// const chk = auth.checkPermissions(req._currentUser, [])
		// if(chk.code !== 0){
		// 	Response(res, null, chk)
		// 	return
		// }

		//construir entidades
		// ,'Event'
		// ,'User'
		// ,'Team'
		// ,'Category'
		// ,'Feed_item'
		// ,'Player'
		// ,'Comment'
		// ,'Competition'
		// ,'Match'
		// ,'Club'

		//construir relaciones

		//competition_user
		//user -[OWNER]-> competition

		//ubicar competiciones que NO tengan relaciones de owner y que existean
		//en la tabla comp_user

		//ubicar entidades de las competiciones y de los usuarios

		//crear relacion (user)-[owner]->(competition)

		Models.entity.getOrphanEntities('competitions')
		.then(result => {
			//ids de objetos sin entidad
			const ids = result.map(e => e.id)
			return Models.competition.query(qb => {
				qb.whereIn('id', ids)
			})
			.fetchAll()
		})
		.then(competitions => {
			return Promise.all(competitions.map(competition => competition.createEntity()))
		})
		.then(result => {
			//busqueda de entidades de competicion sin owners
			return Models.entity.query(qb => {
				qb.joinRaw('left join entities_relationships on (entities.id = entities_relationships.ent_ref_to_id and entities_relationships.relationship_type_id = 1)')
				qb.whereRaw(`object_type = 'competitions' and ent_ref_from_id is null`)
			})
			//esto devuelve las competitions como relacion de las entidades
			.fetchAll({withRelated: 'object.created_by.entity'})
		})
		.then(entities => {
			//filtrar las comps que no tienen un creator_id
			return entities.toJSON()
				.filter(ent => ent.object.created_by_id != null)
		})
		.then(entities => {
			return entities.map(ent => {
				return {competition_entity_id: ent.id
					,competition_id: ent.object.id
					,creator_id: ent.object.created_by_id
					,creator_entity_id: ent.object.created_by.entity.id
				}
			})
		})
		.then(entities => {
			return Promise.all(entities.map(ent => {
				return Models.entity_relationship.forge({
					ent_ref_from_id: ent.creator_entity_id
					,ent_ref_to_id: ent.competition_entity_id
					,relationship_type_id: 1
					,comment: 'OWNER - created by script'
				}).save()
			}))
		})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	router.get('/classification_type', (req, res) => {
		Models.classification
		.fetchAll()
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	return router
})
