if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], (DB) => {
	var StandingTable = DB.Model.extend({
		tableName: 'standing_tables',
		hasTimestamps: true,
		team: function () {
			return this.belongsTo('Team', 'team_id');
		}
	})
	return DB.model('StandingTable', StandingTable)
});
