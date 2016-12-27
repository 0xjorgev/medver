if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express',
        '../model/index',
        '../util/request_message_util',
        '../util/response_message_util',
        '../util/knex_util',
		'../helpers/app_helper.js'],
    function (express,
        Models,
        Message,
        Response,
        Knex,
		Util) {

    var router = express.Router();

    function teamMap(team){
        return team.relations;
    }

    function groupMap(group){
        var innerObject = group.relations.category_group_phase_team.models;
        var delta_group = group;
        delta_group.relations = null;
        return { group:delta_group, teams:innerObject.map(innerMap)  };
    }

    function innerMap(inner){
        return inner.relations.team;
    }

    //Teams by Phase
    router.get('/:phase_id/team', function (req, res) {
        var phase_id = req.params.phase_id;

        return Models.category_group_phase_team
        .where({phase_id:phase_id,active:true})
        .fetchAll({withRelated:['team']})
        .then(function (result) {
            Response(res, result.models.map(teamMap))
        })
        .catch(function(error){
            Response(res, null, error)
        });
    });

    //Groups & teams by Phase
    router.get('/:phase_id/group_team', function (req, res) {
        var phase_id = req.params.phase_id;

        return Models.group
        .query(function(qb){})
        .where({'phase_id':phase_id, active:true})
        .fetchAll({withRelated: ['category_group_phase_team.team']})
        .then(function(result) {
            Response(res, result.models.map(groupMap))
        }).catch(function(error){
            Response(res, null, error)
        });
    });


    //Phase, group, round team by Phase_id
    router.get('/:phase_id/group_round_match', function (req, res) {
        var phase_id = req.params.phase_id;
		//FIXME: este servicio deberia traer los matches por grupo, no por round.
		//esto afectaria la pantalla de schedules en competition
        return Models.group
        .query(function(qb){})
        .where({'phase_id':phase_id, active:true})
        .fetchAll({withRelated: ['rounds.matches.home_team', 'rounds.matches.visitor_team','rounds.matches.referee.user']})
        .then(function (result) {
            Response(res, result)
        })
        .catch(function(error){
            Response(res, null, error)
        });
    });

    router.get('/', function (req, res) {
        return Models.phase
        .query(function(qb){
            // qb.limit(25);
        })
        .where({active:true})
        .fetchAll({withRelated: ['category' , { groups: function(qb) { qb.where('active', true) }}], debug: false})
        .then(function (result) {
            Response(res, result)
        })
        .catch(function(error){
            Response(res, null, error)
        });
    });

    //Phase by phase_id
    router.get('/:phase_id', function (req, res) {
        var phase_id = req.params.phase_id;
        return Models.phase
        .where({'id':phase_id, active:true})
        .fetch({withRelated: ['groups']})
        .then(function (result) {
            Response(res, result)
        })
        .catch(function(error){
            Response(res, null, error)
        });
    });

    router.post('/', function (req, res) {
    	var Phase = Models.phase;
    	var phase_post = req.body;

    	console.log('Req Values:' , req.body);
        var category_id = phase_post.category_id;
    	var name = phase_post.name;
    	var position = phase_post.position;

        new Phase(phase_post)
        .save()
        .then(function(new_phase){
            Response(res, new_phase)
        })
        .catch(function(error){
            Response(res, null, error)
        });
    });

    router.put('/:phase_id', function (req, res) {

        //Model Instance
        var Phase = Models.phase;
        var phase_id = req.params.phase_id;
        var phase_upd = req.body;

        console.log('Req body', phase_upd)

        Knex('phases')
        .where('id','=',phase_id)
        .update(phase_upd, ['id'])
        .then(function(result){
			Response(res, result)
        })
        .catch(function(err){
            Response(res, null, err)
        });
    });



    return router;

});
