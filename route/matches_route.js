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
        var Match = Models.match

        console.log('POST /match', data)

        var matchData = {
            number: data.number,
            location: data.location,
            home_team_id: data.home_team_id,
            visitor_team_id: data.visitor_team_id,
            home_team_score: data.home_team_score,
            visitor_team_score: data.visitor_team_score,
            round_id: data.round_id,
            date: data.date
        }

        var categoryData = {
            category_id: data.category_id,
            phase_id: data.phase_id,
            group_id: data.group_id
        }

        var refereeData = {
            referee_id: data.referee_id
        }

        var roundData = {
            group_id: data.group_id,
            name: `Round of Group ${data.group_id}`
        }

        if(data.round_id){
            roundData.id = data.round_id
        }

        //para almacenar el match creado
        var _match = undefined

        //dado que no se están utilizando las rondas, se crea una ronda si el grupo recibido no tiene una creada
        //en caso de que la ronda exista, solo se hace update
        new Models.round(roundData).save().then(function(round){
            console.log('round saved')
            matchData.round_id = round.attributes.id
            return new Match(matchData).save()
        })
        .then(function(match){
            console.log(`saved match`, match)
            _match = match.attributes
            return match
        })
        .then(function(result){
            console.log('saving referee')
            refereeData.match_id = _match.id
            return new Models.match_referee(refereeData).save()
        })
        .then(function(result){
            //finally
            _match.referee_id = result.attributes.referee_id
            Message(res, 'Match created', '0', _match)
        })
        .catch(function(error){
            console.log(`{error:}`, error);
            Message(res, error.detail, error.code, null);
        })
     })

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