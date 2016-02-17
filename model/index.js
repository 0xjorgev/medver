/**
 * Created by George on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    './discipline',
    './subdiscipline'
], function (Discipline, Subdiscipline) {

    return {
    	discipline: Discipline,
        subdiscipline: Subdiscipline
    };
});