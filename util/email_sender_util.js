/**
 * Created by george on 24/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['sendgrid'], function (Email) {
    var sendgrid = Email(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
	var email_sender = function(sender){
        // console.log(`sender: ${sender}`);
		return function(email, subject, content){
            console.log(`email: ${email}, subject:${subject}, content:${content}`);
			sendgrid.send({
                to:       `${email}`,
                from:     sender,
                subject:  `${subject}`,
                text:     `${content}`
            }, function(err, json) {
                if (err) { return console.error(err); }
                    console.log(`Success! json:${json}`);
            });
		}
    }
    return email_sender;
});