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
  ,'http'
	],
	(express
	,Models
	,Message
	,Knex
	,util
	,Response
	,utilities
	,logger
  ,http
	) => {

    let router = express.Router();

    const fetchPaymentStatus = (res, status, cat_id, team_id) => {

      return Models.status_type
      .where({'description':status})
      .fetch()
      .then(function(result){
        updateCompetitionCategory(res, cat_id, team_id, result.id);
      })
      .catch(function(err){
        console.log("Error on status Fetch");
      });
    }

    const updateCompetitionCategory = (res, cat_id, team_id, status_id) => {

        var pre_reg = new Models.category_group_phase_team;

        return Knex(pre_reg.tableName)
        .where('category_id','=',cat_id)
        .where('active','=',1)
        .where('team_id','=', team_id)
        .update({'payment' : true, 'status_id':status_id}, ['id'])
        .then(function(result){
          Response(res, 'Paypal');
        })
        .catch(function(err){
          Response(res, 'Paypal');
        });
    }

    const requestPaypalCompletion = (option, cat_id, team_id) => {
      console.log('Before testReq');
      http.request(option, function(res) {

        console.log('Inside testReq');
        res.on('error', function(error) {
          console.error(error);
        });

        //response.on('data', function(chunk){
            let body = res.body;
            console.log('response Body:', body);
            if (res.statusCode === 200) {
                 //Inspect IPN validation result and act accordingly
                 if (body.substring(0, 8) === 'VERIFIED') {

                   //The IPN is verified
                   console.log('Verified IPN!');
                   //updateCompetitionCategory(cat_id, team_id);
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
          //})
        })
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
      	//url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
        host: 'https://ipnpb.sandbox.paypal.com',
        path: '/cgi-bin/webscr',
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

      console.log('IPN FROM PAYPAL');

      if (payment_status == "Completed") {
        console.log('Status is completed');
        //fetchPaymentStatus(res, 'Paid', cat_id, team_id);

        //updateCompetitionCategory(cat_id, team_id);
        // requestPaypalCompletion(options, cat_id, team_id)
        requestPaypalCompletion(options, 1, 1)
        console.log('Status is completed 2');
        // console.log('After 200');
        //post to thirdparty service

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
