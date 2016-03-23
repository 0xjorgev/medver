/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './organization'], function (DB) {

    var User = DB.Model.extend({
        tableName: 'users',
        hasTimestamps: true,

        //relations
        // competition n:m
        // organizations: function(){
        //     return this.hasMany('Organization');
        // }
    });

    // uses Registry plugin
    return DB.model('User', User);
});