/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './user'], function (DB) {

    var Organization = DB.Model.extend({
        tableName: 'organizations',
        hasTimestamps: true,

        // relations
        // users: function(){
        //     return this.hasMany('users');
        // }
    });

    // uses Registry plugin
    return DB.model('Organization', Organization);
});