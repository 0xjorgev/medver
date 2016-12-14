if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model'
	,'../util/logger_util'
	,'./entity'],
	(DB, logger) => {

		const Feed_item = DB.Model.extend({
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
			,entity : function(){
			  return this.morphOne('Entity', 'object');
			}
		},{
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
							message_en: 'Something has happened on $DATE',
							message_es: 'Algo ha ocurrido el $DATE',
						}
				}
				return template
			}
			,create: function(data){
				let event = data.data
				DB._models.Event.forge({id: event.object_id})
				.fetch()
				.then(e => {
					//con el evento, se obtiene el codigo
					let msg = this.getTemplate(e.attributes.code)
					let team =
						data.related_entities
						.filter(ent => ent.object_type === 'teams')[0]
					let match =
						data.related_entities
						.filter(ent => ent.object_type === 'matches')[0]

					if(team){
						msg = {
							message_en: msg.message_en.replace('$TEAM', team.object.name)
							,message_es: msg.message_es.replace('$TEAM', team.object.name)
						}
					}

					if(match){
						msg = {
							message_en: msg.message_en.replace('$MATCH', `Match #${match.object.number}`)
							,message_es: msg.message_es.replace('$MATCH', `Partido #${match.object.number}`)
						}
					}

					return new DB._models.Feed_item(msg).save()
						.then(feedItem => feedItem.load(['entity']))

				})
				.then(feedItem => {
					const _feedItem = feedItem.toJSON()
					return Promise.all(
						data.related_entities
						.map(targetEntity => {
							const saveObj = {
								ent_ref_from_id: _feedItem.entity.id
								,relationship_type_id: 3 //feed item
								,ent_ref_to_id: targetEntity.id
								,comment: `FEED ITEM OF ${targetEntity.object_type} ${targetEntity.id}`
							}
							// logger.debug(saveObj)
							return new DB._models.Entity_relationship(saveObj)
								.save()
					}))
				})
			}
		})

		return DB.model('Feed_item', Feed_item)
	}
)
