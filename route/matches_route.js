if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util','../util/knex_util', 'util'], function (express, Models, Message, Knex, util) {

    var router = express.Router();

    inspect = util.inspect

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

    //=========================================================================
    // Returns the player list for a given match
    //=========================================================================
    router.get('/:match_id/player', function (req, res) {
        var match_id = req.params.match_id;
        // tapping into Knex query builder to modify query being run
        return Models.match
        .where({'id': match_id})
        .fetch({withRelated: ['home_team.match_player_team.player', 'visitor_team.match_player_team.player']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.get('/:match_id/team', function (req, res) {

        var match_id = req.params.match_id;
        // tapping into Knex query builder to modify query being run
        return Models.match
        .where({'id':match_id})
        .fetch({withRelated: ['home_team.match_player_team.player.gender', 'visitor_team.match_player_team.player.gender', 'round.group.phase.category.category', 'round.group.phase.category.season.competition'], debug: false})
        .then(function (result) {

            // console.log(result.attributes)

            // console.log(result)
            // console.log(inspect(result, { colors: true, depth: Infinity }))

            Message(res,'Success', '0', result);

        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });


    //==========================================================================
    // gets the player list for a given match & team
    //==========================================================================

    router.get('/:match_id/team/:team_id/player', function (req, res) {

        var data = {
            match_id: req.params.match_id,
            team_id: req.params.team_id,
            player_id: req.params.player_id
        }

        console.log('GET /:match_id/team/:team_id/player', data)

        return Models.match_team_player
            .where({match_id: data.match_id, team_id: data.team_id})
            .fetchAll()
            .then(function (result) {
                Message(res,'Success', '0', result);
            }).catch(function(error){
                Message(res,error.details, error.code, [])
        })
    });

    //==========================================================================
    // updates the player list for a given match & team
    //==========================================================================

    router.put('/:match_id/team/:team_id/player', function (req, res) {

        var data = {}
        if(req.body.id != undefined) data.id = req.body.id
        if(req.params.match_id != undefined) data.match_id = req.params.match_id
        if(req.params.team_id != undefined) data.team_id = req.params.team_id
        if(req.body.player_id != undefined) data.player_id = req.body.player_id
        if(req.body.position != undefined) data.position = req.body.position
        if(req.body.number != undefined) data.number = req.body.number
        if(req.body.active != undefined) data.active = req.body.active

        console.log('PUT /:match_id/team/:team_id/player/', data)

        return new Models.match_team_player(data).save()
            .then(function (result) {
                Message(res,'Success', '0', result);
            }).catch(function(error){
                Message(res,error.details, error.code, [])
        })
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
        data.id = req.params.match_id
        var Match = Models.match

        console.log('PUT /match', data)

        var matchData = {}

        if(data.id) matchData.id = data.id
        if(data.number) matchData.number = data.number
        if(data.location) matchData.location = data.location
        if(data.home_team_id) matchData.home_team_id = data.home_team_id
        if(data.visitor_team_id) matchData.visitor_team_id = data.visitor_team_id
        if(data.home_team_score) matchData.home_team_score = data.home_team_score
        if(data.visitor_team_score) matchData.visitor_team_score = data.visitor_team_score
        if(data.round_id) matchData.round_id = data.round_id
        if(data.date) matchData.date = data.date
        if(data.played) matchData.played = data.played

        var refereeData = {}
        if(data.referee_id) refereeData.referee_id = data.referee_id

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
            console.log('round saved', round.attributes)
            matchData.round_id = round.attributes.id
            return new Match(matchData).save()
        })
        .then(function(match){
            console.log(`saved match`, match.attributes)
            _match = match.attributes
            return match
        })
        .then(function(result){
            console.log('saving referee')
            refereeData.match_id = _match.id
            return new Models.match_referee(refereeData).save()
        })
        .then(function(result){
            console.log(`saved referee`, result.attributes)
            //finally
            _match.referee_id = result.attributes.referee_id
            Message(res, 'Match created', '0', _match)
        })
        .catch(function(error){
            console.log(`{error:}`, error);
            Message(res, error.detail, error.code, null);
        })
    });
    return router;
});
