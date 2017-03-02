if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['./base_model','./category', './group', './category_group_phase_team'], function (DB) {

	var Phase = DB.Model.extend({
		tableName: 'phases'
		,hasTimestamps: true
		,initialize: function() {
			this.on('saving', this.validate, this)
		}
		,validations: {
			name: ['required']
			,classified_team: ['required', 'numeric','greaterThan:0']
			,participant_team: ['required', 'numeric','greaterThan:0']
			,position: ['required', 'numeric','greaterThan:0']
		}
		,validate: function(model, attrs, options) {
			return DB.checkit(this.validations).run(this.toJSON());
		}
		,groups:  function(){
			return this.hasMany('Group');
		}
		,category: function () {
			return this.belongsTo('Category', 'category_id');
		}
		,category_group_phase_team: function () {
			return this.hasMany('Category_group_phase_team', 'phase_id');
		}
	});

	// uses Registry plugin
	return DB.model('Phase', Phase);
});
