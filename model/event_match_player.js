if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
	,'../util/logger_util'
	,'./player'
	, './match'
	, './event'
	, './team']
	, function (DB, logger) {

    const Event_match_player = DB.Model.extend({
        tableName: 'events_matches_players'
        ,hasTimestamps: true
		,initialize: function(){
			this.on('saving', () => {
				const relationsToLoad = []
				if(this.get('event_id') != undefined) relationsToLoad.push('event')
				if(this.get('player_in') != undefined) relationsToLoad.push('player_in')
				if(this.get('player_out') != undefined) relationsToLoad.push('player_out')
				if(this.get('match_id') != undefined) relationsToLoad.push('match')
				// if(this.get('team_id') != undefined) relationsToLoad.push('team')
				// return this.load(['event','match', 'player_in', 'player_out'])
				return this.load(relationsToLoad)
			})
		}
        //relations
        ,player_in: function(){
            return this.belongsTo('Player', 'player_in');
        }
        ,player_out: function(){
            return this.belongsTo('Player', 'player_out');
        }
		//FIXME: estas relaciones no se ajustan al estandar y deberían ser eliminadas
        ,match_id: function(){
            return this.belongsTo('Match');
        }
        ,event_id: function(){
            return this.belongsTo('Event');
        }
		,match: function(){
			return this.belongsTo('Match');
		}
        ,event: function(){
            return this.belongsTo('Event');
        }
        ,team: function(){
            return this.belongsTo('Team', 'team_id');
        }
    });

    // uses Registry plugin
    return DB.model('Event_match_player', Event_match_player);
});
