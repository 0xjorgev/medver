/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util','../helpers/standing_table_helper'], function (express, Models, Message, Knex, StandingTable) {

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
        // var name = group_post.name;

        new Group(group_post
        // {
        //     name: name,
        //     phase_id: phase_id
        // }
        ).save().then(function(new_group){
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
            if (result.length != 0)
            {
                console.log('result is not null');
                console.log('result: ',result[0]);
                //Message(res, 'Success', '0', result);
                var data = req.body
                updateFase(data, res, result)
            } else {

                Message(res, 'group not found', '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    router.get('/:group_id/standing_table', function(req, res){
        var group_id = req.params.group_id;
        var matchSql = 'select groups.id as group_id, matches.id as match_id, matches.home_team_id as home_team_id , matches.visitor_team_id as visitor_team_id from matches inner join rounds on rounds.id = matches.round_id inner join groups on groups.id = rounds.group_id where matches.played = true and groups.id = ' + group_id

        //TODO: promisify this
        StandingTable.getStandingTableByMatches(matchSql, res)
    })

    //FUNCION PARA ACTUALIZAR LOS VALORES DE LA TABLA FASE CUANDO SE CAMBIEN LOS VALORES DE UN GRUPO
    var updateFase = (data, res, group_result) => {
        console.log("-------Update Phase by group--------")
        console.log("Data: ", data)
        var phase_id = data.phase_id
        console.log("phase_id: ", phase_id)

        //Obtenemos todos los grupos de esa fase
        Models.group
        .where({phase_id:phase_id})
        .where({active:true})
        .fetchAll()
        .then(function (result)
        {
            var participant_teams = result.models.map((m) => m.attributes.participant_team)
            var classified_teams = result.models.map((m) => m.attributes.classified_team)
            console.log("participant_teams ", participant_teams)
            console.log("classified_teams ", classified_teams)
            var participant_team = participant_teams.reduce(function(pt, n) {
                                    return pt + n; })

            console.log("Phase participant_team ", participant_team)
            var classified_team = classified_teams.reduce(function(ct, n) {
                                    return ct + n; })
            console.log("Phase classified_team ", classified_team)
            console.log("phase_id: ", phase_id)

            //Se guarda los campos en la fase
            var phase_upd = {
                id              : phase_id,
                participant_team: participant_team,
                classified_team : classified_team
            };

            var Phase = Models.phase;
            Knex('phases')
                .where('id','=', phase_id)
                .update(phase_upd, ['id'])
                .then(function(phases_result){
                    if (result.length != 0){
                        // console.log('result is not null');
                        // console.log(`result: ${result[0]}`);
                        Message(res, 'Success', '0', group_result);
                    } else {
                        // console.log(`{error: ${error}}`);
                        Message(res, 'Wrong phase_id', '404', group_result);
                    }
                })
                .catch(function(err){
                    console.log(`Catch Error: ${err}`);
                  Message(res, err.detail, err.code, null);
                });

        }).catch(function(error){
            console.log('error', error)
            console.log('error', error.stack)
            res.status(500);
            res.json({message: error.name, code: 500, data: error.detail});
        })
    }

    ///

    return router;
});
