/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './paciente'], function (DB) {

    var Consulta = DB.Model.extend({
        tableName: 'consultas',
        hasTimestamps: true,

        //relations
        // user n:m
        // organization n:m

        historia: function(){
            return this.belongsTo('Historia', 'historia_id');
        }




        // tipo_consulta : function(){
        //     return this.belongsTo('Tipo', 'historia_id');
        // }

        //TODO Consultas -> R


        // gender: function(){
        //     return this.belongsTo('gender');
        // },

        // season: function(){
        //     return this.belongsTo('season');
        // }
    });

    // uses Registry plugin
    return DB.model('Consulta', Consulta);
});