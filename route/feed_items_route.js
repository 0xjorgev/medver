if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['express'
		,'../model/index'
		,'../util/response_message_util'
		,'../node_modules/lodash/lodash.min'
		,'../util/logger_util'
		,'../helpers/auth_helper'
		],
	function (express
		,Models
		,Response
		,_
		,logger
		,auth
	){

	let router = express.Router()

	router.get('/:feedItemId/comment', (req, res) => {
		Models.feed_item.forge({id: req.params.feedItemId})
		.fetch({debug: true})
		.then(feedItem => {
			// logger.debug(feedItem)
			return feedItem
		})
		.then(feedItem => Response(res, feedItem))
		.catch(error => Response(res, null, error))
	})

	router.post('/:feedItemId/comment', (req, res) => {

		if(auth.checkPermissions(req._currentUser, []).code !== 0){
			Response(res, null, chk)
			return
		}

		Models.feed_item.forge({id: req.params.feedItemId})
		.fetch()
		.then( feedItem => {
			logger.debug('se esta trayendo el entity aqui?')
			logger.debug(feedItem)
			return feedItem.addComment({message: req.body.message})
		})
		.then(result => {
			logger.debug(result)
			Response(res, result)
		})
		.catch(error => Response(res, null,error))

	})

	return router
})
