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
            var header = '<body style="background:#F6F6F6; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0;"><!-- header --><table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table" align="center" class="container-table"><tr style="background-color: #00796b; text-align: center;"><td><h5 style="line-height: 5px;text-align: center; font-size: 14px;"><img alt="SomoSport Logo"  href="${origin}" src="http://ss-management-dev.herokuapp.com/img/somosport-brand-small.png"></h5></td></tr></tr style="text-align: center; font-size: 12px;">'
            var footer = '</tr><!-- End Content --><tr style="background-color: #00796b;"><td><h5 class="closing-text" style="color: #f6f6f6; line-height: 5px;text-align: center; font-size: 14px;">Thank you, Somosport!</h5></td></tr></table><!-- End wrapper table --></body>'
            var content_html = header + content + footer
            
            sendgrid.send({
                to:       `${email}`,
                from:     sender,
                subject:  `${subject}`,
                html:     `${content_html}`
            }, function(err, json) {
                if (err) { return console.error(err); }
                console.log(`Email sent:`, json);
            });
		}
    }

        return email_sender;
});