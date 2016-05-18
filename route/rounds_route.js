/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    console.log('Rounds Route');

    //List of rounds
    router.get('/', function (req, res) {

        console.log('Rounds List');

        return Models.round
        .query(function(qb){})
        .fetchAll({withRelated: ['match']} )
        .then(function (result) {
            console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Round by round_id
    router.get('/:round', function (req, res) {
        console.log('round_id List');
         var round_id = req.params.round_id;
        return Models.round
        .where({'id':round_id})
        .fetch({withRelated: ['match']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    // //Groups by Phase_id
    // router.get('/:group_id/group/', function (req, res) {

    //     console.log('Group by phase_id');

    //     var phase_id = req.params.phase_id;

    //     return Models.group
    //     .where({phase_id:phase_id})
    //     .where({active:true})
    //     .fetch({withRelated: ['phase']})
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    // //Phases by category_id -> Returns array of result
    // router.get('/category/:category_id', function (req, res) {
    //     console.log('/category/:category_id/');
    //     var category_id = req.params.category_id;
    //     return Models.phase
    //     .where({category_id:category_id})
    //     .fetchAll()
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });


    router.post('/', function (req, res) {
    	var Round = Models.round;
    	var round_post = req.body;
    	var group_id = round_post.group_id;
    	var name = round_post.name;
    	var start_date = round_post.start_date;
    	var end_date = round_post.end_date;

        console.log('------------------------------');
        console.log(`name:${name}`);
        console.log(`start_date:${start_date}`);
        console.log(`end_date:${end_date}`);
        console.log(`group_id:${group_id}`);
        console.log('------------------------------');

        new Round({
            name: name,
            start_date: start_date,
            end_date:end_date,
            group_id:group_id
        }).save().then(function(new_round){
            console.log(`{new_round: ${new_round}}`);
            Message(res, 'Success', '0', new_round);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });

    });


    router.put('/:round_id', function (req, res) {

        console.log('update /:round_id');
        //Model Instance
        var Round = Models.round;

        var round_id = req.params.round_id;
        var round_upd = req.body;

        // Knex(competition.tableName)
        Knex('rounds')
        .where('id','=',round_id)
        .update(round_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                console.log(`{error: ${error}}`);
                Message(res, 'Wrong round_id', '404', result);
            }
        })
        .catch(function(err){
            console.log(`Catch Error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    return router;
});