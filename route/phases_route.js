/**
 * Created by george on 25/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    console.log('Phases Route');

    //List of competitions
    router.get('/', function (req, res) {

        console.log('Phase List');

        return Models.phase
        .query(function(qb){
            qb.limit(25);
        })
        .fetchAll({withRelated: ['group']} )
        .then(function (result) {
            console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Phase by phase_id
    router.get('/:phase_id', function (req, res) {
        console.log('phase_id List');
         var phase_id = req.params.phase_id;
        return Models.phase
        .where({'id':phase_id})
        .fetch({withRelated: ['group']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    // //Groups by Phase_id
    // router.get('/:phase_id/group/', function (req, res) {

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
    	var Phase = Models.phase;
    	var phase_post = req.body;


    	console.log('Req Values:' + req.body);
        var category_id = phase_post.category_id;
    	var name = phase_post.name;
    	var position = phase_post.position;

        console.log('------------------------------');
        console.log(`name:${name}`);
        console.log(`position:${position}`);
        console.log('------------------------------');

        new Phase({
            name: name,
            position: position,
            category_id:category_id
        }).save().then(function(new_phase){
            console.log(`{new_phase: ${new_phase}}`);
            Message(res, 'Success', '0', new_phase);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });

    });


    router.put('/:phase_id', function (req, res) {

        console.log('update /:phase_id');
        //Model Instance
        var Phase = Models.phase;

        var phase_id = req.params.phase_id;
        var phase_upd = req.body;

        // Knex(competition.tableName)
        Knex('phases')
        .where('id','=',phase_id)
        .update(phase_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                console.log(`{error: ${error}}`);
                Message(res, 'Wrong phase_id', '404', result);
            }
        })
        .catch(function(err){
            console.log(`Catch Error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    return router;
});