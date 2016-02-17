// var bookshelf = require("../config/bookshelf");
// var discipline = require('./discipline');
// var subdiscipline = bookshelf.Model.extend({
// 	//Model / Table  Name
//   	tableName: 'Subdiscipline',
//     Discipline: function(){
//       return this.belongsTo(Discipline, 'disciplineId');
//     }
// });

// module.export = subdiscipline;

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
        subdiscipline: function(){
            return this.hasMany('Subdiscipline');
        },
    });

    // uses Registry plugin
    return DB.model('Discipline', Discipline);
});