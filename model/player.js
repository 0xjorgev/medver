/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./gender', './player_team', './event_match_player'], function (DB) {

    var Player = DB.Model.extend({
        tableName: 'players'
        ,hasTimestamps: true
		,initialize: function(){
			this.on('created', attrs => {
				new DB._models.Entity({
					object_type: 'players'
					,object_id: this.id
				})
				.save()
			})
		}

        //relations
        ,gender: function(){
            return this.belongsTo('Gender', 'gender_id');
        }

        ,player_team: function(){
            return this.hasMany('Player_team');
        }

        ,player_in: function(){
            return this.hasMany('Event_match_player', 'player_in');
        }

        ,player_out: function() {
         return this.hasMany('Event_match_player', 'player_out');
        }

    });

    // uses Registry plugin
    return DB.model('Player', Player);
});
