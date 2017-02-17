
if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model'
	,'../util/logger_util'
	,'./discipline'
	,'./subdiscipline'
	,'./competition_type'
	,'./season'
], (DB, logger)  => {
	var Competition = DB.Model.extend({
		tableName: 'competitions',
		hasTimestamps: true,
		initialize: function() {
			this.on('created', savedObject => {

				const entity = new DB._models.Entity({
					object_type: 'competitions'
					,object_id: this.id
				})

				const savedCompetition = this
				return entity.save()
				.then(competitionEntity => {
					//se busca la entidad del usuario creador de la comp
					return DB._models.User
					.where({id: savedCompetition.attributes.created_by_id})
					.fetch({withRelated: ['entity'], debug: true})
					.then(competitionOwner => {
						//se salva la relacion OWNER entre el user y la comp
						return DB._models.Entity_relationship.forge({
							ent_ref_from_id: competitionOwner.relations.entity.id
							,ent_ref_to_id: competitionEntity.id
							,relationship_type_id: 1
							,comment: 'OWNER'
						})
						.save()
					})
				})
			}
		)},
		discipline: function(){
			return this.belongsTo('Discipline', 'discipline_id');
		},
		subdiscipline: function(){
			return this.belongsTo('Subdiscipline', 'subdiscipline_id');
		},
		seasons: function(){
			return this.hasMany('Season');
		},
		competition_type: function(){
			return this.belongsTo('Competition_type','competition_type_id');
		},
		competition_user: function(){
			return this.hasMany('Competition_user','competition_id');
		}
	});

	// uses Registry plugin
	return DB.model('Competition', Competition);
});
