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
	],(
		express
		,Response
		,aws
		,auth
		,Models
		,logger
		,Knex
		,FeedItemHelper
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
		const chk = auth.checkPermissions(req._currentUser, [])
		if(chk.code !== 0){
			Response(res, null, chk)
			return
		}

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

	})

	router.get('/classification_type', (req, res) => {
		Models.classification
		.fetchAll()
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	return router
})
