/**
 * Created by George on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    './discipline',
    './subdiscipline',
    './user'
], function (Discipline, Subdiscipline, User) {

    return {
    	user: User,
    	discipline: Discipline,
        subdiscipline: Subdiscipline
    };
});