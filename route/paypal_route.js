if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'
	,'../model/index'
	,'../util/request_message_util'
	,'../util/knex_util'
	,'util'
	,'../util/response_message_util'
	,'../util/generic_util'
	,'../util/logger_util'
	],
	(express
	,Models
	,Message
	,Knex
	,util
	,Response
	,utilities
	,logger
	) => {

    var http = require("http");
    let router = express.Router();

    var updateCompetitionCategory = function(cat_id, team_id){

        var pre_reg = new Models.category_group_phase_team;

        return Knex(pre_reg.tableName)
        .where('category_id','=',cat_id)
        .where('active','=',1)
        .where('team_id','=', team_id)
        .update({'payment' : true}, ['id'])
        .then(function(result){
          console.log("Success on Paypal Update");
          // Response(res, result)
        })
        .catch(function(err){
          console.log("Error on Paypal Update");
          // Response(res, 'Paypal')
        });
    }


    //=========================================================================
    // Returns the player list for a given match
    //=========================================================================
    router.post('/', (req, res) => {
      var body = req.body;
      var json = JSON.parse(body.custom);
      var cat_id = json.category_id;
      var team_id = json.team_id;
      var payment_status = body.payment_status;
      var cmd_body = 'cmd=_notify-validate&' + body;
      var options = {
      	url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
      	method: 'POST',
      	headers: {
      		'Connection': 'close'
      	},
      	body: cmd_body,
      	strictSSL: true,
      	rejectUnauthorized: false,
      	requestCert: true,
      	agent: false
      };

      if (payment_status == "Completed") {
        console.log('Status is completed');
        Response(res, 'Paypal');
        //post to thirdparty service
        var testReq = http.post(options, function(res) {
          console.log('Inside testReq');
          let body = res.body;
          console.log('response Body:', body);
          if (res.statusCode === 200) {
               //Inspect IPN validation result and act accordingly
               if (body.substring(0, 8) === 'VERIFIED') {

                 //The IPN is verified
                 console.log('Verified IPN!');
                 updateCompetitionCategory(cat_id, team_id);
               } else if (body.substring(0, 7) === 'INVALID') {

                 //The IPN invalid
                 console.log('Invalid IPN!');
               } else {
                 //Unexpected response body
                 console.log('Unexpected response body!');
                 console.log(body);
               }
             }else{
               //Unexpected response
               console.log('Unexpected response!');
               console.log(response);
             }
        })
      } else {
        Response(res, 'Paypal');
      }
       //console.log("*****************************");
       //console.log("payPal Response:", body.custom, "cat:", cat_id, "team:", team_id);
       //console.log("*****************************");
       //logger.debug(Object.keys(req));
       console.log("*****************************");
       logger.debug(body);
       console.log("*****************************");

        //Response(res, 'This was posted on paypal service');

    });

    return router;
});
