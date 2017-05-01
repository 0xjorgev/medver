if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['sendgrid', './logger_util'], function (Email, logger) {
	const sendgrid = Email(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
	const emailSender = function(sender){
		return function(email, subject, content){
			//sendgrid 2.0.0
			// sendgrid.send({
			// 	to:       `${email}`,
			// 	from:     sender,
			// 	subject:  `${subject}`,
			// 	html:     `${content}`
			// }, function(err, json) {
			// 	if (err) { return console.error('Email Error:', err); }
			// 	console.log(`Email sent:`, json);
			// });


			//sendgrid 5.0.0 syntax
			var helper = Email.mail;
			var fromEmail = new helper.Email(sender);
			var toEmail = new helper.Email(email);
			var subject = subject
			var content = new helper.Content('text/html', content);
			var mail = new helper.Mail(fromEmail, subject, toEmail, content);

			var sg = Email(process.env.SENDGRID_APIKEY);
			var request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: mail.toJSON()
			});

			sg.API(request, function (error, response) {
				if (error) {
					console.log('Error response received');
					console.error(error)
				}
				console.log(response.statusCode);
				console.log(response.body);
				console.log(response.headers);
			})

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
