/**
 * Created by George on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
	'./util',
    './paciente',
    './historia'
    // './category',
    // './gender'
], function (Util, Paciente, Historia) {
    //, Category, Gender

    return {
    	util : Util,
    	paciente: Paciente,
        historia: Historia
        // category: Category,
        // gender: Gender
    };
});