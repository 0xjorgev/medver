
if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model', './discipline', './subdiscipline', './competition_type', './season'], function (DB) {

	var Competition = DB.Model.extend({
		tableName: 'competitions',
		hasTimestamps: true,
		initialize: function() {
			this.on('created', match => {
				const entity =
				new DB._models.Entity({
					object_type: 'competitions'
					,object_id: this.id
				})
				entity.save()
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
