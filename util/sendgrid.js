/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['sendgrid'], function (Sendgrid) {
	var send = Sendgrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
    return send;
});