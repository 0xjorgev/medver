if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['./base_model', './discipline'], function (DB) {

	var Subdiscipline = DB.Model.extend({
		tableName: 'subdisciplines',
		hasTimestamps: true,

		// relations
		discipline: function(){
			return this.belongsTo('Discipline');
		},
		event: function(){
			return this.hasMany('Event');
		}
	});

	// uses Registry plugin
	return DB.model('Subdiscipline', Subdiscipline);
});
