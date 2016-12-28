if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
,'./index'
,'../util/logger_util'
,'./entity'
,'./round'
,'./event_match_player']
, function (DB, Models, logger) {
    var Match = DB.Model.extend({
        tableName: 'matches'
        ,hasTimestamps: true
        ,initialize: function() {
            this.on('saving', this.validate, this);

			//hay un problema para retornar distintas columnas al
            //hacer update
            //ver https://github.com/tgriesser/bookshelf/issues/507
			// no funciona, aunque genera el query correcto
			// this.on('saving', function(model, attrs, options) {
			// 	options.query.returning([
			// 		'id'
			// 		,'location'
			// 		,'number'
			// 		,'home_team_id'
			// 		,'home_team_score'
			// 		,'visitor_team_id'
			// 		,'visitor_team_score'
			// 		,'round_id'
			// 		,'played'
			// 		,'date'
			// 		,'active'
			// 		,'created_at'
			// 		,'updated_at'
			// 		,'placeholder_home_team_group'
			// 		,'placeholder_home_team_position'
			// 		,'placeholder_visitor_team_group'
			// 		,'placeholder_visitor_team_position'
			// 		,'group_id'
			// 	])
			// })

			this.on('created', match => {
				// this.set('number', 99)
				const entity =
					new DB._models.Entity({
						object_type: 'matches'
						,object_id: this.id
					})
				entity.save()
			}, this)

			this.on('fetched', () => {
				const currentRelations = Object.keys(this.relations)

				if(currentRelations.indexOf('home_team') < 0 && currentRelations.indexOf('visitor_team') < 0)
					return this.load(['home_team','visitor_team'])
			})
		}

		,validations: {
			// round_id: ['required', 'numeric','greaterThan:0']
			// ,number: ['required', 'numeric','greaterThan:0']
		}
		,validate: function(model, attrs, options) {
			return DB.checkit(this.validations).run(this.toJSON());
		}

		//relations
		,round: function(){
			return this.belongsTo('Round', 'round_id');
		}
		,home_team: function(){
			return this.belongsTo('Team', 'home_team_id');
		}
		,visitor_team: function(){
			return this.belongsTo('Team', 'visitor_team_id');
		}
		,result: function(){
			return this.hasMany('Event_match_player');
		}
		,referee: function(){
			return this.hasMany('Match_referee');
		}
		,entity: function(){
			return this.morphOne('Entity', 'object');
		}
		,group: function(){
			return this.belongsTo('Group', 'group_id');
		}
		// ,feedItems: function(){
		// 	return this.hasMany('Feed_item', 'object');
		// }
		//TODO: esta deberia tener una relacion through
		// ,category: function() {
		//   return this.hasMany('Category_group_phase_team')
		// }
	},{
		//metodos estaticos
		//TODO: implementar generador de numeros de match
		getMatchNumber: function(){
			console.log('implementar generador aqui')
			return 567
		}
	})

	// uses Registry plugin
	return DB.model('Match', Match);
});
