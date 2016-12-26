/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './subdiscipline'], function (DB) {

    var Discipline = DB.Model.extend({
        tableName: 'disciplines',
        hasTimestamps: true,

        // relations
        subdisciplines: function(){
            return this.hasMany('Subdiscipline');
        },
    });

    // uses Registry plugin
    return DB.model('Discipline', Discipline);
});
