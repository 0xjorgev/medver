/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./player', './match', './event', './team'], function (DB) {

    const Event_match_player = DB.Model.extend({
        tableName: 'events_matches_players'
        ,hasTimestamps: true
		,initialize: function(){
			this.on('saving', () => {
				return this.load(['event','match', 'player_in.person', 'player_out.person'])
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
