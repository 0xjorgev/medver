if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model'
	,'./entity'],
	(DB) => {
		var Feed_item = DB.Model.extend({
			initialize: function(){
				this.on('created', attrs => {
					// this.set('number', 99)
					new DB._models.Entity({
						object_type: 'feed_items'
						,object_id: this.id
					})
					.save()
				})
			}
			,tableName: 'feed_items'
			,hasTimestamps: true
		}
		,{
			getTemplate: function(eventType){
				let template = null
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
			,create: function(data){
				// console.log('creating feed item', data)
			}
		})

		return DB.model('Feed_item', Feed_item)
	}
)
