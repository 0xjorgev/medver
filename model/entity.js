if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model'
	,'./team'
	,'./user'
	,'./category'
	,'./entity_type'
	,'./feed_item'
	,'./entity_relationship'
	,'../util/knex_util'
	],(DB
		,Team
		,User
		,Category
		,Entity_type
		,FeedItem
		,Entity_relationship
		,knex) => {
			let Entity = DB.Model.extend({
				tableName: 'entities'
				,hasTimestamps: true
				,entity_type: function(){
					return this.belongsTo('Entity_type', 'entity_type_id');
				}
				,object: function() {
					return this.morphTo('object'
						//listado de objetos que tienen entidades asociadas
						,'Event'
						,'User'
						,'Team'
						,'Category'
						,'Feed_item'
						,'Player'
						,'Comment'
						,'Competition'
						,'Match'
						,'Club'
						,'Event_calendar')
				}
				,related_from: function() {
					return this.hasMany('Entity_relationship', 'ent_ref_from_id');
				}
				,related_to: function(){
					return this.hasMany('Entity_relationship', 'ent_ref_to_id');
				}
			})

			//Ubica las entidades de objectType que no tienen registros en la tabla
			//entities
			//objectType: string con el nombre de la tabla/modelo/object_type
			Entity.getOrphanEntities = objectType => {
				return knex
					.select(`${objectType}.id`)
					.from(objectType)
					.joinRaw(`left join entities on ${objectType}.id = entities.object_id and entities.object_type = '${objectType}'`)
					.where('entities.id', null)
			}

			return DB.model('Entity', Entity);
		}
)
