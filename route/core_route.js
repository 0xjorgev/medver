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
		,'redis'
		,'bluebird'
		,'lodash'
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
		,redis
		,bluebird
		,_
	) => {

	bluebird.promisifyAll(redis.RedisClient.prototype);
	bluebird.promisifyAll(redis.Multi.prototype);

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

	router.get('/classification_type', (req, res) => {
		Models.classification
		.fetchAll()
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
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

		//---------------------------------------------------------------
		// competition_user
		// user -[OWNER]-> competition
		// ubicar competiciones que NO tengan relaciones de owner y que existean
		// en la tabla comp_user
		// ubicar entidades de las competiciones y de los usuarios
		// crear relacion (user)-[owner]->(competition)
		//---------------------------------------------------------------
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
			//se filtran las competiciones que no tienen un creador
			return entities
				.toJSON()
				.filter(ent => ent.object.created_by_id != null)
		})
		.then(entities => {
			// se preparan los datos para salvar la relacion
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
		.then(relaciones => {
			//---------------------------------------------------------------
			// para normalizar los equipos que no tienen entidad en la spider
			//---------------------------------------------------------------
			return Models.category_group_phase_team
				.where({entity_id: null})
				.fetchAll({withRelated: ['team.entity']})
		})
		//filtro los equipos que tienen una entidad creada
		.then(result => result.toJSON().filter(t => t.team.entity != null))
		//se salva el id de entidad para cada equipo
		.then(result => {
			return Promise.all( result.map(t => {
				const data = {
					id: t.id
					,entity_id: t.team.entity.id
				}
				return Models.category_group_phase_team.forge(data).save()
			}))
		})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error) )

	})

	//
	router.post('/spider/build', (req,res) => {
		// -- ubicar grupos sin registro en spider
		// select groups.id
		// from groups
		// left join categories_groups_phases_teams on groups.id = categories_groups_phases_teams.group_id
		// where groups.active = true
		// 	and categories_groups_phases_teams.id is null
		// 	and participant_team is not null;

		//se obtienen los grupos que no tienen registros en la tabla spider
		//TODO: faltan los grupos que tienen registros en spider, pero son incompletos
		//TODO: al crear el grupo se debe escribir la spider
		//TODO: al eliminar el grupo debe eliminarse los registros en la spider
		//TODO: al actualizar el # de participantes en el grupo debe tambien actualizarse spider
		Models.group.query(qb => {
			qb.leftJoin('categories_groups_phases_teams', 'groups.id', 'categories_groups_phases_teams.group_id')
			qb.where('groups.active', true)
			qb.whereNull('categories_groups_phases_teams.id')
		})
		.fetchAll({withRelated: ['phase']})
		.then(groups => {
			return groups.map(group => {
				//un grupo debe tener al menos dos participantes, para que sea un "grupo"
				const participants = (group.get('participant_team') == null || group.get('participant_team') <= 1) ? 2 : group.get('participant_team')
				return { category_id: group.related('phase').get('category_id')
						,phase_id: group.related('phase').id
						,group_id: group.id
						,participants: participants }
			})
		})
		.then(rowsToInsert => {
			return rowsToInsert.reduce((promises, row) => {
				for(let i = 0; i < row.participants; i++){
					const spidey = {category_id: row.category_id
						,phase_id: row.phase_id
						,group_id: row.group_id
					}
					promises.push(Models.category_group_phase_team.forge(spidey).save())
				}
				return promises
			}, [])
		})
		.then(rowsToSave => {
			Response(res, rowsToSave)
		})
		.catch(e => Response(res, null, e))
	})

	router.get('/services/stats', (req, res) => {
		const redisUrl = (process.env.NODE_ENV == 'development') ? 'redis://127.0.0.1:6379' : process.env.REDIS_URL

		const client = redis.createClient(redisUrl)
		//obtiene todos los keys en redis
		client.keysAsync("*")
		.then(keys => Promise.all(keys.map(key => {
			return client.getAsync(key).then(value => [key, value])
		})))
		.then(result => {
			const tmp = result.reduce((stats, stat) => {
				stats[ stat[0] ] = stat[1]
				return stats
			}, {})
			client.quit()
			Response(res, tmp)
		})
	})

	return router
})
