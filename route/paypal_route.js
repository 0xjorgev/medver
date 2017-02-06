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

      console.log("payPal Response:", req);
      logger.debug(req);

      //logger.debug("payPal Objects:", req);
      //logger.debug(req)
      // var match_id = req.params.match_id;
      //return Models.match
      // .where({'id': match_id})
      // .fetch({withRelated: [
      //   'home_team.match_player_team.player.player_team.position'
      //   ,'visitor_team.match_player_team.player.player_team.position'
      //   ,'events.event'
      //   ,'events.player_in'
      //   ,'events.player_out'
      //   ,'group']
      // })
      // .then((result) => {
        Response(res, 'This was posted on paypal service');
      // })
      // .catch((error) => {
      //   Response(res, null, error);
      // });
    });

    return router;
});
