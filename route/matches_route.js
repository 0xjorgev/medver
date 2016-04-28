if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util'], function (express, Models, Message) {

    var router = express.Router();

    router.get('/', function (req, res) {

        // tapping into Knex query builder to modify query being run
        return Models.match
        .query(function(qb){})
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.get('/:match_id', function (req, res) {

        var match_id = req.params.match_id;
        // tapping into Knex query builder to modify query being run
        return Models.match
        .where({'id':match_id})
        .fetch()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.post('/', function (req, res) {
        console.log('Creating match', req.body);

        var data = req.body;

        new Models.match({
            location: data.location,
            home_team_id: data.home_team_id,
            visitor_team_id: data.visitor_team_id,
            round_id: data.round_id,
            date: data.date
        }).save().then(function(item){
            console.log(`Match ${item}}`);
            Message(res, 'Success', '0', item);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
     });

    return router;
});