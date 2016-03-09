/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './discipline', './subdiscipline', './competition_type'], function (DB) {

    var Competition = DB.Model.extend({
        tableName: 'competitions',
        hasTimestamps: true,

        //relations
        // user n:m
        // organization n:m
        /*
            table.integer('discipline_id').references('disciplines.id').index();
            table.integer('subdiscipline_id').references('subdisciplines.id').index();
            table.integer('competition_type').references('competitions_types.id').index();

        */
        disciplines: function(){
            return this.hasOne('disciplines');
        },

        subdisciplines: function(){
            return this.hasOne('subdisciplines');
        },

        type: function(){
            return this.hasOne('competitions_types');
        }
    });

    // uses Registry plugin
    return DB.model('Competition', Competition);
});