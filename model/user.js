/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './organization', './entity'], function (DB) {

    var User = DB.Model.extend({
        tableName: 'users'
        ,hasTimestamps: true
        ,entity: function(){
            return this.hasOne('Entity', 'object_id')
        }
        ,referee: function(){
            return this.hasMany('Match_referee');
        }
        ,competition_user: function(){
            return this.hasMany('Competition_user','user_id');
        }
    });

    // uses Registry plugin
    return DB.model('User', User);
});
