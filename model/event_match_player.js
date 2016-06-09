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

define(['./base_model','./player', './match', './event'], function (DB) {

    var Event_match_player = DB.Model.extend({
        tableName: 'events_matches_players',
        hasTimestamps: true,

        //relations
        player_in: function(){
            return this.belongsTo('Player', 'player_in');
        },

        player_out: function(){
            return this.belongsTo('Player', 'player_out');
        },

        match_id: function(){
            return this.belongsTo('Match');
        },
        event_id: function(){
            return this.belongsTo('Event');
        }
    });

    // uses Registry plugin
    return DB.model('Event_match_player', Event_match_player);
});