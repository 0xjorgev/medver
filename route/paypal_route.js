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

    var updateCompetitionCategory = function(res, cat_id, team_id){

        var pre_reg = new Models.category_group_phase_team;

        return Knex(pre_reg.tableName)
        .where('category_id','=',cat_id)
        .where('active','=',1)
        .where('team_id','=', team_id)
        .update({'payment' : true}, ['id'])
        .then(function(result){
          console.log("Success on Paypal Update");
          Response(res, result)
        })
        .catch(function(err){
          console.log("Error on Paypal Update");
          Response(res, null, err)
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

      updateCompetitionCategory(res, cat_id, team_id)
      //Add Search for Competition
      //Update the team - Competition payment status
       console.log("*****************************");
       console.log("payPal Response:", body.custom, "cat:", cat_id, "team:", team_id);
       console.log("*****************************");
       logger.debug(Object.keys(req));
       console.log("*****************************");
       logger.debug(body);
       console.log("*****************************");

        //Response(res, 'This was posted on paypal service');

    });

    return router;
});
