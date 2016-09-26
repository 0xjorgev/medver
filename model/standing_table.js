if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], (DB) => {
	var StandingTable = DB.Model.extend({
		tableName: 'standing_tables',
		hasTimestamps: true })
	return DB.model('StandingTable', StandingTable)
});
