/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './discipline', './subdiscipline', './competition_type', './season'], function (DB) {

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
        discipline: function(){
            return this.belongsTo('Discipline', 'discipline_id');
        },

        subdiscipline: function(){
            return this.belongsTo('Subdiscipline', 'subdiscipline_id');
        },

        season: function(){
            return this.hasMany('Season');
        },

        competition_type: function(){
            return this.belongsTo('Competition_type','competition_type_id');
        }
    });

    // uses Registry plugin
    return DB.model('Competition', Competition);
});