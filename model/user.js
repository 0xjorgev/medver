/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], function (DB) {

    var User = DB.Model.extend({
        tableName: 'users',
        hasTimestamps: true,

        // relations
        // discipline: function(){
        //     return this.belongsTo('Discipline');
        // },
    });

    // uses Registry plugin
    return DB.model('User', User);
});