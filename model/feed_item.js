if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model'
	,'./entity'],
	(DB) => {

		var Feed_item = DB.Model.extend({
			tableName: 'feed_items'
			,hasTimestamps: true
		})

		Feed_item.getTemplate = eventType => {

			let template = null

			//TODO: pasar a un json/yml o similar
			switch (eventType) {
				case '#GOL':
					template =  {
						message_en: '$PLAYER of $TEAM scored a goal against $RIVAL_TEAM on $DATE',
						message_es: '$PLAYER de $TEAM anotó un gol contra $RIVAL_TEAM el $DATE',
					}
					break;
				case '#GEND':
					template =  {
						message_en: '$PLAYER of $TEAM scored a goal against $RIVAL_TEAM on $DATE',
						message_es: '$PLAYER de $TEAM anotó un gol contra $RIVAL_TEAM el $DATE',
					}
					break;
				default:
					template =  {
						message_en: 'Something has happenened on $DATE',
						message_es: 'Algo ha ocurrido el $DATE',
					}
			}

			return template
		}

		// uses Registry plugin
		return DB.model('Feed_item', Feed_item)
	}
)
