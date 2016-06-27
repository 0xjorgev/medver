if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util','../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    //matches index
    router.get('/', function (req, res) {

        // tapping into Knex query builder to modify query being run
        return Models.match
        .query(function(qb){})
        .fetchAll({withRelated: ['home_team', 'visitor_team']} )
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //matches show
    router.get('/:match_id', function (req, res) {

        var match_id = req.params.match_id;
        // tapping into Knex query builder to modify query being run
        return Models.match
        .where({'id':match_id})
        .fetch({withRelated: ['home_team', 'visitor_team']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //match create
    router.post('/', function (req, res) {

        var data = req.body;

        new Models.match(data
        // {
        //     location: data.location,
        //     home_team_id: data.home_team_id,
        //     visitor_team_id: data.visitor_team_id,
        //     round_id: data.round_id,
        //     date: data.date
        // }
        ).save().then(function(item){
            console.log(`Match ${item}`);
            Message(res, 'Success', '0', item);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
     });

    //match update
    router.put('/:match_id', function (req, res) {

        var data = req.body;

        console.log(data);

        var match_id = req.params.match_id;

        Knex('matches')
        .where('id','=', match_id)
        // .where('active','=',1) lets think this through
        .update(data, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                console.log(`{error: ${error}}`);
                Message(res, error, '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
            Message(res, err.detail, err.code, null);
        })
    });


    return router;
});