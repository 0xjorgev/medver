/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    //List of competitions
    router.get('/', function (req, res) {

        console.log('Competition List');
        return Models.competition
        .query(function(qb){})
        .fetchAll({withRelated: ['discipline','subdiscipline', 'competition_type', 'season']})
        .then(function (result) {
            console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Competition by Id
    router.get('/:competition_id', function (req, res) {

        var comp_id = req.params.competition_id;
        return Models.competition
        .where({'id':comp_id})
        .fetch( {withRelated: ['discipline','subdiscipline', 'competition_type', 'season']} )
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Seasons by Competition_Id -> Returns array of result
    router.get('/:competition_id/season/', function (req, res) {
        var competition_id = req.params.competition_id;
        return Models.season
        .where({competition_id:competition_id})
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Create Competition
    router.post('/create', function (req, res) {

        //Model Instance

        var Competition = Models.competition;
        var competition_post = req.body;

        console.log('Req Values:' + req.body);

        var name = competition_post.name;
        var discipline_id = competition_post.discipline_id;
        var subdiscipline_id = competition_post.subdiscipline_id;
        var competition_type_id = competition_post.competition_type_id;
        var description = competition_post.description;

        console.log('------------------------------');
        console.log('name: ', competition_post.name);
        console.log('discipline_id: ', competition_post.discipline_id);
        console.log('subdiscipline_id: ', competition_post.subdiscipline_id);
        console.log('competition_type_id: ', competition_post.competition_type_id);
        console.log('description: ', competition_post.description);
        console.log('competition_post: '+ competition_post);

        console.log('------------------------------');

        new Competition({
            name: name,
            description: description,
            discipline_id:discipline_id,
            subdiscipline_id:subdiscipline_id,
            competition_type_id:competition_type_id
        }).save().then(function(new_competition){
            console.log(`{new_competition: ${new_competition}}`);
            Message(res, 'Success', '0', new_competition);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });


    //Competition Update
    router.post('/:competition_id/update', function(req, res){
        //Model Instance
        var competition = Models.competition;

        var competition_id = req.params.competition_id;
        var competition_upd = req.body;

        // Knex(competition.tableName)
        Knex('competitions')
        .where('id','=',competition_id)
        .where('active','=',1)
        .update(competition_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                console.log(`{error: ${error}}`);
                Message(res, 'Username or email not found', '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    return router;
});