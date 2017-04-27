/**
 * Created by Francisco on 2017/04/27
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./player', './match', './team'], function (DB) {

    var Match_player = DB.Model.extend({
        tableName: 'match_players',
        hasTimestamps: true,

        //relations
        player: function(){
            return this.belongsTo('Player', 'player_id');
        },

        match: function(){
            return this.belongsTo('Match', 'match_id');
        },

        team: function(){
            return this.belongsTo('Team', 'team_id');
        }
    });

    // uses Registry plugin
    return DB.model('Match_player', Match_player);
});