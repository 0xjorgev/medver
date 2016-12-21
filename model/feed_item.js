if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model'
	,'../util/logger_util'
	,'./entity'],
	(DB, logger) => {

		const Feed_item = DB.Model.extend({
			initialize: function(){
				this.on('created', attrs => {
					//por problemas de asincronia, se crea la entidad con el metodo create
				})
			}
			,tableName: 'feed_items'
			,hasTimestamps: true
			// ,relatedEntities: function(){
			// 	console.log('related entity');
			// 	return DB._models.Entity_relationship
			// 	.query(qb => {
			// 		qb.where({ent_ref_from_id: this.id})
			// 	})
			// 	.fetchAll({withRelated: 'object'})
			// }
			,relatedEntities: function(){
				return this
					.hasMany('Entity_relationship', 'ent_ref_from_id')
					.through('Entity', 'object_id')
			}
			//la entidad del feed item
			,entity : function(){
			  return this.morphOne('Entity', 'object');
			}
		},{
			getTemplate: function(eventType){
				let template = null
				//TODO: cargar desde un JSON o YML
				switch (eventType) {
					case '#GOL':
						template =  {
							message_en: '$PLAYER of $TEAM scored a goal on $INSTANT\' of $MATCH',
							message_es: '$PLAYER de $TEAM anotó un gol el $INSTANT\' de $MATCH',
						}
						break;
					case '#GEND':
						// template =  {
						// 	message_en: 'The $MATCH has ended: $SCORE',
						// 	message_es: 'El $MATCH ha terminado: $SCORE',
						// }
						template =  {
							message_en: 'The $MATCH has ended',
							message_es: 'El $MATCH ha terminado',
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
					let msg = processData(data.info, this.getTemplate(e.attributes.code))

					let _feedItem = null
					return new DB._models.Feed_item(msg)
						.save()
						.then(feedItem => {
							_feedItem = feedItem.toJSON()
							return new DB._models.Entity({
								object_type: 'feed_items'
								,object_id: _feedItem.id
							})
							.save()
						})
						.then(entity => {
							_feedItem.entity = entity.toJSON()
							return _feedItem
						})
				})
				.then(feedItem => {
					const _feedItem = feedItem
					return Promise.all(
						data.related_entities
						.map(targetEntity => {
							const saveObj = {
								ent_ref_from_id: _feedItem.entity.id
								,relationship_type_id: 3 //feed item
								,ent_ref_to_id: targetEntity.id
								,comment: `FEED ITEM OF ${targetEntity.object_type} ${targetEntity.id}`
							}

							return new DB._models.Entity_relationship(saveObj)
								.save()

					}))
				})
			}
		})

		//toma un objeto info {placeholder: '$EJEMPLO', messages: {}}
		const processData = (info, _template) => {
			let template = _template

			info.forEach((i, idx) => {
				template = replaceValues(template, i.placeholder, i.messages)
			})

			return template
		}

		//reemplaza los valores en un template
		const replaceValues = (template, placeholder, values) => {
			return {
				//TODO: se debería recorrer un arreglo de keys de idioma, para hacerlo generico
				message_en: template.message_en.replace(placeholder, values['en'])
				,message_es: template.message_es.replace(placeholder, values['es'])
			}
		}

		return DB.model('Feed_item', Feed_item)
	}
)
