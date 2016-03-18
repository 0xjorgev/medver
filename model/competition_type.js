/**
 * Created by george on 08/03/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], function (DB) {

    var Competition_type = DB.Model.extend({
        tableName: 'competitions_types',
        hasTimestamps: true

        //relations
        // user n:m
        // organization n:m
        // organizations: function(){
        //     return this.hasMany('Organization');
        // }
    });

    // uses Registry plugin
    return DB.model('Competition_type', Competition_type);
});