/*

			table.string('name');
			table.string('logo_url');
			table.string('short_name');
			table.string('description');
			table.integer('category_id').references('categories.id').index();
			table.integer('organization_id').references('organizations.id').index();

*/

/**
 * Created by george on 27/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './player', './team'], function (DB) {

    var Player_team = DB.Model.extend({
        tableName: 'players_teams',
        hasTimestamps: true,

        // relations
        team: function(){
            return this.belongsTo('Team', 'team_id');
        },

        player: function(){
            return this.belongsTo('Player', 'player_id');
        }
    });

    // uses Registry plugin
    return DB.model('Player_team', Player_team);
});