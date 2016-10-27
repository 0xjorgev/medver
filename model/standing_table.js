if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], (DB) => {
	var StandingTable = DB.Model.extend({
		tableName: 'standing_tables',
		hasTimestamps: true,
		team: function () {
			return this.belongsTo('Team', 'team_id');
		},
		phase: function () {
			return this.belongsTo('Phase', 'phase_id');
		},
		group: function () {
			return this.belongsTo('Group', 'group_id');
		},
	})
	return DB.model('StandingTable', StandingTable)
});
