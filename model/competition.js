
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
			this.on('created', result => {
				const entity = new DB._models.Entity({
					object_type: 'competitions'
					,object_id: this.id
				})

				return entity.save()
				.then(result => {
					logger.debug('entity of competition saved')
					logger.debug(result)
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
