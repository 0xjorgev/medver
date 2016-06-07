/**
 * Created by George on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
	'./util',
    './paciente',
    './historia',
    './consulta'
    // './category',
    // './gender'
], function (Util, Paciente, Historia, Consulta) {
    //, Category, Gender

    return {
    	util : Util,
    	paciente: Paciente,
        historia: Historia,
        consulta: Consulta
        // category: Category,
        // gender: Gender
    };
});