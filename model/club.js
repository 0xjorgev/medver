if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
,'./index'
,'../util/logger_util'
,'./entity'
]
, function (DB, Models, logger) {
    var Club = DB.Model.extend({
        tableName: 'clubs'
        ,hasTimestamps: true
        ,initialize: function() {
            this.on('saving', this.validate, this);

			this.on('created', match => {
				// // everytime that a club is create will create his entity relation
				// const entity =
				// 	new DB._models.Entity({
				// 		object_type: 'clubs'
				// 		,object_id: this.id
				// 	})
				// entity.save()
			}, this)

			this.on('fetched', () => {
				const currentRelations = Object.keys(this.relations)
				//Este if se coloca en el caso de que se solicite la relacion, en la consulta y no se sobreescriba
				// if(currentRelations.indexOf('home_team') < 0 && currentRelations.indexOf('visitor_team') < 0)
				// 	return this.load(['home_team','visitor_team'])
			})
		}

		,validations: {
			// round_id: ['required', 'numeric','greaterThan:0']
			// ,number: ['required', 'numeric','greaterThan:0']
		}
		,validate: function(model, attrs, options) {
			return DB.checkit(this.validations).run(this.toJSON());
		}

		,entity: function(){
			return this.morphOne('Entity', 'object');
		}
	})

	// uses Registry plugin
	return DB.model('Club', Club);
});
