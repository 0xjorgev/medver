/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./player', './category', './team'], function (DB) {

    var Category_team_player = DB.Model.extend({
        tableName: 'categories_teams_players',
        hasTimestamps: true,

        //relations
        player: function(){
            return this.belongsTo('Player', 'player_id');
        },

        category: function(){
            return this.belongsTo('Category', 'category_id');
        },

        team: function(){
            return this.belongsTo('Team', 'team_id');
        }
    });

    // uses Registry plugin
    return DB.model('Category_team_player', Category_team_player);
});