/**
 * Created by george on 24/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['sendgrid'], function (Email) {
    var sendgrid = Email(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
	var email_sender = function(sender){
		return function(email, subject, content){
            sendgrid.send({
                to:       `${email}`,
                from:     sender,
                subject:  `${subject}`,
                html:     `${content}`
            }, function(err, json) {
                if (err) { return console.error('Email Error:', err); }
                console.log(`Email sent:`, json);
            });
		}
    }
        return email_sender;
});
