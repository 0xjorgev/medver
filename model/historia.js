/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './paciente', './consulta'], function (DB) {

    var Historia = DB.Model.extend({
        tableName: 'historias',
        hasTimestamps: true,

        //relations
        // user n:m
        // organization n:m

        paciente : function(){
            return this.hasOne('Paciente', 'historia_id');
        },

        consultas : function(){
          return this.hasMany('Consulta');
        }

        //TODO Consultas -> R


        // gender: function(){
        //     return this.belongsTo('gender');
        // },

        // season: function(){
        //     return this.belongsTo('season');
        // }
    });

    // uses Registry plugin
    return DB.model('Historia', Historia);
});