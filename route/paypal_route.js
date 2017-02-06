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

    let router = express.Router();
    //=========================================================================
    // Returns the player list for a given match
    //=========================================================================
    router.post('/', (req, res) => {
      var body = req.body;
      var json = JSON.parse(body.custom);
      var cat_id = json.category_id;
      var team_id = json.team_id;
      //Add Search for Competition
      //Update the team - Competition payment status
      console.log("*****************************");
      console.log("payPal Response:", , "cat:", cat_id, "team:", team_id);
      console.log("*****************************");
      logger.debug(Object.keys(req));
      console.log("*****************************");

        Response(res, 'This was posted on paypal service');

    });

    return router;
});
