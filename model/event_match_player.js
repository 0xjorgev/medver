/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

/*
        table.increments('id').primary();
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        //Relationships
        --table.integer('player_in').references('players.id').index();
        --table.integer('player_out').references('players.id').index();
        --table.integer('match_id').references('matches.id').index();
        --table.integer('event_id').references('events.id').index();
*/

define(['./base_model','./player', './match', './event', './team'], function (DB) {

    const Event_match_player = DB.Model.extend({
        tableName: 'events_matches_players'
        ,hasTimestamps: true
		,initialize: function(){
			this.on('saving', () => {
				return this.load(['event','match', 'player_in', 'player_out'])
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
