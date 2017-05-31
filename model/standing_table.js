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
		getPositionsByPhase: function(phaseId){
			const query = 'select team_id, group_id, points, row_number() over (partition by group_id order by points desc, (goals_in_favor - goals_against) desc, goals_in_favor desc, goals_against desc, matches_won desc, matches_lost desc, matches_draw desc) as position'
			+ ' from standing_tables '
			+ ' where phase_id in (?) '
			return Knex.raw(query, [phaseId])
		}
	})
	return DB.model('StandingTable', StandingTable)
});
