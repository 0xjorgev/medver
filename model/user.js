/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./entity', './organization'], function (DB, Entity) {
    var User = DB.Model.extend({
        tableName: 'users'
        ,hasTimestamps: true
        ,referee: function(){
            return this.hasMany('Match_referee');
        }
        ,competition_user: function(){
            return this.hasMany('Competition_user','user_id');
        }
		,entity : function(){
		  return this.morphOne(Entity, 'object');
		}
    });
    // uses Registry plugin
    return DB.model('User', User);
});
