if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './index' ,'./entity' ,'./round', './event_match_player']
, function (DB, Models) {
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
		// ,category: function() {
		//   return this.hasMany('Category_group_phase_team')
		// }
	}
	,{
		//metodos estaticos
		getMatchNumber: function(){
			return 567
		}
	})

	// uses Registry plugin
	return DB.model('Match', Match);
});
