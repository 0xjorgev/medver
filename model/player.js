/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./gender', './player_team'], function (DB) {

    var Player = DB.Model.extend({
        tableName: 'players',
        hasTimestamps: true,

        //relations
        gender: function(){
            return this.belongsTo('Gender', 'gender_id');
        },

        player_team: function(){
            return this.hasMany('Player_team');
        }

    });

    // uses Registry plugin
    return DB.model('Player', Player);
});