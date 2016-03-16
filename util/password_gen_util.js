/**
 * Created by george on 23/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['randomstring'], function (Random) {
	var password_generator = Random.generate({
            length: 8,
            charset:'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ1234567890@#$%*&'
    });

    return password_generator;
});