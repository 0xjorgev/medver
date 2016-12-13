if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model'
	,'./entity'],
	(DB) => {

		var Feed_item = DB.Model.extend({
			tableName: 'feed_items'
			,hasTimestamps: true
		})

		// Feed_item.createstuff = (feedItemData, relatedEntities) => {
		// 	console.log('creating feeditem', feedItemData)
		// 	return this.save(feedItemData)
		// }

		// uses Registry plugin
		return DB.model('Feed_item', Feed_item)
	}
)
