/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

    var router = express.Router();

    //List of seasons (don't seem to be needed) -> Returns Array of result
    router.get('/', function (req, res) {

        console.log('Groups List');
        return Models.group
        .query(function(qb){})
        .where({active:true})
        .fetchAll({withRelated: ['rounds']})
        //.fetchAll({withRelated: ['gender', 'season']})
        .then(function (result) {
            console.log('result: ' + result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            console.log('Error: ' + error);
            Message(res,error.details, error.code, []);
        });
    });

    //Group by Id -> Returns 1 result
    router.get('/:group_id', function (req, res) {

        console.log('Group by id');

        var group_id = req.params.group_id;

        return Models.group
        .where({id:group_id})
        .where({active:true})
        .fetch({withRelated: ['rounds']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.get('/:group_id', function (req, res) {

        console.log('Rounds by group_id');

         var group_id = req.params.group_id;
        return Models.round
        .where({'group_id':group_id})
        .fetch({withRelated: ['group']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    ///:group_id

    router.post('/', function (req, res) {

        console.log('Groups Create');
        //Model Instance
        var Group = Models.group;
        var group_post = req.body;
        var phase_id = group_post.phase_id;
        var name = group_post.name;

        new Group({
            name: name,
            phase_id: phase_id
        }).save().then(function(new_group){
            console.log(`{new_group: ${new_group}}`);
            Message(res, 'Success', '0', new_group);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });


    router.put('/:group_id', function(req, res, next){

        console.log('Groups Update');
        //Model Instance
        var group = new Models.group;

        //URL Request, Season Id
        var group_id = req.params.group_id;
        var group_upd = req.body;

        Knex(group.tableName)
        .where('id','=',group_id)
        .where('active','=',1)
        .update(group_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
            Message(res, 'Success', '0', result);
            } else {

                Message(res, 'group not found', '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    return router;
});