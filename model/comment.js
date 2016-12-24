if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model'
	,'./index'
	,'./entity'
	],(DB, Models) => {
	let Comment = DB.Model.extend({
		tableName: 'comments'
		,hasTimestamps: true
		,initialize: function() {
			this.on('created', () => {
				const entity =
					new DB._models.Entity({
						object_type: 'comments'
						,object_id: this.id
					})
				entity.save()
			}, this)

			this.on('saving', () => {
				return this.load('entity')
			})
		}
		,entity : function(){
		  return this.morphOne('Entity', 'object');
		}
	},{
		//metodos estaticos
	})

	return DB.model('Comment', Comment);
});
