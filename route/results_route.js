/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

    var router = express.Router();

    //List of Events
    //Event by Subdiscipline_id -> Returns array
    //
    router.get('/:match_id', function (req, res) {

        console.log('Match Player Events by match_id');

        var match_id = req.params.match_id;

        return Models.event_match_player
        .where({match_id:match_id, active: true})
        // TODO: @Jorge revisa lo comentado, estaba haciendo que todo llegara vacío
        .fetchAll({withRelated: ['match_id', 'event_id', 'player_in.player_team', 'player_out.player_team', 'team' /*, { player_in: function(qb) { qb.where('team_id', team.id) }}*/], debug: true})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.post('/', function (req, res) {

        console.log('Results Create');
        //Model Instance
        //{match_id:5, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }
        var Event_match_player        = Models.event_match_player;
        var match_result  = req.body;
        var match_id = match_result.match_id;
        console.log('Values: ', match_id)
        console.log('log:',Event_match_player)
        new Event_match_player(match_result).save().then(function(new_team){
            console.log(`{match_result: ${match_result}}`);
            Message(res, 'Success', '0', match_result);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });


    // //'category', 'organization'
    // router.get('/:org_id/organization/', function (req, res) {

    //     console.log('Rounds by group_id');

    //      var group_id = req.params.group_id;
    //     return Models.round
    //     .where({'group_id':group_id})
    //     .fetch({withRelated: ['group']})
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });



    // router.put('/:team_id', function(req, res, next){

    //     console.log('Team Update');
    //     //Model Instance
    //     var group = new Models.group;

    //     //URL Request, Season Id
    //     var team_id = req.params.team_id;
    //     var team_upd = req.body;

    //     Knex(group.tableName)
    //     .where('id','=',team_id)
    //     .where('active','=',1)
    //     .update(team_upd, ['id'])
    //     .then(function(result){
    //         if (result.length != 0){
    //             console.log('result is not null');
    //             console.log(`result: ${result[0]}`);
    //         Message(res, 'Success', '0', result);
    //         } else {

    //             Message(res, 'team not found', '404', result);
    //         }
    //     })
    //     .catch(function(err){
    //         console.log(`error: ${err}`);
    //       Message(res, err.detail, err.code, null);
    //     });
    // });

    return router;
});
