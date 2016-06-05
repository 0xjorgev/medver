/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./historia'], function (DB) {

    var Paciente = DB.Model.extend({
        tableName: 'pacientes',
        hasTimestamps: true,

        //relations
        // user n:m
        // organization n:m
        historia: function(){
            return this.belongsTo('Historia', 'historia_id');
        }
        // gender: function(){
        //     return this.belongsTo('gender');
        // },

        // season: function(){
        //     return this.belongsTo('season');
        // }
    });

    // uses Registry plugin
    return DB.model('Paciente', Paciente);
});

/*
URB LOS CHORROS AV PPAL RES LOS CHORROS
PALACE P 2 APTO 2/B MUNICIPIO SUCRE
CARACAS, MIRANDA 1071
Venezuela
*/