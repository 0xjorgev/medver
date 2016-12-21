if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['express'
		,'../model/index'
		,'../util/response_message_util'
		,'../node_modules/lodash/lodash.min'
		,'../util/logger_util'
		],
	function (express
		,Models
		,Response
		,_
		,logger){

	let router = express.Router()

	router.get('/:feedItemId/comment', (req, res) => {
		Models.feed_item.forge({id: req.params.feedItemId})
		.fetch({debug: true})
		.then(feedItem => {
			// logger.debug(feedItem)
			return feedItem
		})
		.then(feedItem => Response(res, feedItem))
	})

	router.post('/:feedItemId/comment', (req, res) => {
		Response(res, 'not yet implemented')
	})

	return router
})
