if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','../util/knex_util' ], (DB, Knex) => {
	var StandingTable = DB.Model.extend({
		tableName: 'standing_tables',
		hasTimestamps: true
		,team: function () {
			return this.belongsTo('Team', 'team_id');
		}
		,phase: function () {
			return this.belongsTo('Phase', 'phase_id');
		}
		,group: function () {
			return this.belongsTo('Group', 'group_id');
		}
	},{
		getPositions: function(groupId){
			const query = 'select team_id, group_id, points, row_number() over (partition by group_id order by points desc) as position'
			+ ' from standing_tables '
			+ ' where group_id in (?) '
			return Knex.raw(query, [groupId])
		}
	})
	return DB.model('StandingTable', StandingTable)
});
