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
				const entity = new DB._models.Entity({
					object_type: 'matches'
					,object_id: this.id })
				return entity.save()
			}, this)

			this.on('fetched', () => {
				const currentRelations = Object.keys(this.relations)
				if(currentRelations.indexOf('home_team') < 0 && currentRelations.indexOf('visitor_team') < 0){
					return this.load(['home_team','visitor_team'])
				}
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
		,events: function(){
			return this.hasMany('Event_match_player', 'match_id');
		}
		//toma los eventos del partido
		,getScore: function(){
			return `${this.relations.home_team.attributes.name}:${this.attributes.home_team_score}  - ${this.relations.visitor_team.attributes.name}:${this.attributes.visitor_team_score}`
		}
		,updateScore: function(){
			//TODO: antes de ejecutar la funcion, deberia verificarse si las
			//relaciones utilizadas fueron cargadas
			const homeTeamId = this.attributes.home_team_id
			const visitorTeamId = this.attributes.visitor_team_id

			//se extraen los eventos pertenecientes a los goles
			const score = this.relations.events.toJSON()
			.filter(e => e.event.code == '#GOL' || e.event.code == '#AGOL')
			.reduce((score,goal) => {
				if(goal.event.code == '#GOL'){
					if(goal.team_id == homeTeamId)
						score.home_team_score += 1
					else
						score.visitor_team_score += 1
				}
				else{
					if(goal.team_id == homeTeamId)
						score.visitor_team_score += 1
					else
						score.home_team_score += 1
				}
				return score
			}, {home_team_score: 0, visitor_team_score: 0})
			// logger.lme.e(score)

			this.attributes.home_team_score = score.home_team_score
			this.attributes.visitor_team_score = score.visitor_team_score
			//se salva el score recien calculado
			return this.save()
		}
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
