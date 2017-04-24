if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['sendgrid', './logger_util'], function (Email, logger) {
	const sendgrid = Email(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
	const emailSender = function(sender){
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

	const dummyEmailSender = (sender) => {
		return (email, subject, content) => {
			const headers = `From: ${sender}, To: ${email}, Subject: ${subject}`
			logger.lme.sline()
			logger.lme.i(`Dummy email sent: ${headers}`)
			logger.lme.d(content)
			logger.lme.i(`Dummy email sent: ${headers}`)
			logger.lme.sline()
		}
	}

	return (process.env.NODE_ENV == 'development') ? dummyEmailSender : emailSender;
});
