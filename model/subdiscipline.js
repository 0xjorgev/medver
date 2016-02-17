// var bookshelf = require("../config/bookshelf");
// var subdiscipline = require('./subdiscipline');
// var discipline = bookshelf.Model.extend({
// 	//Model / Table  Name
//   	tableName: 'Discipline',
//     Subdiscipline: function() {
//        return this.hasMany(Subdiscipline, 'disciplineId');
//     }
// });

/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './discipline'], function (DB) {

    var Subdiscipline = DB.Model.extend({
        tableName: 'subdisciplines',
        hasTimestamps: true,

        // relations
        discipline: function(){
            return this.belongsTo('Discipline');
        },
    });

    // uses Registry plugin
    return DB.model('Subdiscipline', Subdiscipline);
});