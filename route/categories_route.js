/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

//logging lib, reaaaaally useful
var inspect = require('util').inspect
//log helper function
var _log = (obj) => console.log(inspect(obj, {colors: true, depth: Infinity }))


define(['express',
		'../model/index',
		'../util/request_message_util',
		'../util/knex_util',
		'../helpers/standing_table_helper',
		'../util/response_message_util',
		'../node_modules/lodash/lodash.min'],
	function (express,
		Models,
		Message,
		Knex,
		StandingTable,
		Response, _) {

	var router = express.Router();

	var mapper = function(phase) {
		// console.log('Phase:', phase.attributes);
		phase.relations.groups.models.map(groupMapper);
		phaseDelete(phase.attributes.id);
	}

	var groupMapper = function(group){
		groupDelete(group);
	}

	var groupDelete = function(group){
		console.log('Group Delete');
		Knex(group.tableName)
		.where({id:group.id})
		.del().then(function(del_group){
		console.log('del_group', del_group);
		}).catch(function(error){
		console.log('del_group error:', error);
		})
	}

	var phaseDelete = function(phase){
		console.log('Phase Delete');
		//console.log('Phase id:', phase.attributes);
		Knex('phases')
		.where({id:phase}, ['id'])
		.del().then(function(del_phase){
		console.log('del_phase', del_phase);
		}).catch(function(error){
		console.log('del_phase error:', error);
		})
	}

	//Teams by Category
	router.get('/:category_id/team', function (req, res) {
		var category_id = req.params.category_id;
		return Models.category_group_phase_team
			.where({category_id:category_id})
			.where({active:true})
			.fetchAll({withRelated:['team','category','group','phase']})
			.then(function (result) {
				Response(res, result)
			}).catch(function(error){
				Response(res, null, error)
			});
	});

	//List of seasons (doesn't seems to be needed) -> Returns Array of result
	router.get('/', function (req, res) {
		return Models.category
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['gender', 'phases', 'classification']})
		.then(function (result) {
			Response(res, result)
		}).catch(function(error){
			Response(res, null, error)
		});
	});

	//Categories by Id -> Returns 1 result
	router.get('/:category_id', function (req, res) {
		var category_id = req.params.category_id;
		return Models.category
			.where({id:category_id})
			.where({active:true})
			.fetch({withRelated: ['gender','phases', 'classification']})
			.then(function (result) {
				Response(res, result)
			}).catch(function(error){
				Response(res, null, error)
			});
	});

	router.post('/', function (req, res) {
		//Model Instance
		var Category = Models.category;
		var category_post = req.body;

		console.log('category_post', category_post);
		new Category(category_post)
		.save()
		.then(function(new_category){
			Response(res, new_category)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	router.put('/:category_id', function(req, res, next){
		//Model Instance
		var category = new Models.category;

		//URL Request, Season Id
		var category_id = req.params.category_id;
		var category_upd = req.body;

		console.log('Req body', category_upd);

		var name = category_upd.name
		var participant_minimum = category_upd.participant_minimum
		var participant_maximum = category_upd.participant_maximum
		var other_minimum_participant = category_upd.other_minimum_participant
		var other_maximum_participant = category_upd.other_maximum_participant
		var player_minimum_participant = category_upd.player_minimum_participant
		var player_maximum_participant = category_upd.player_maximum_participant
		var player_minimum_summoned = category_upd.player_minimum_summoned
		var player_maximum_summoned = category_upd.player_maximum_summoned
		var coach_minimum_participant = category_upd.coach_minimum_participant
		var coach_maximum_participant = category_upd.coach_maximum_participant
		var team_quantity = category_upd.team_quantity
		var gender_id = category_upd.gender_id
		var season_id = category_upd.season_id
		var category_type_id = category_upd.category_type_id
		var classification_type_id = category_upd.classification_type_id
		var inscription_init_at = category_upd.inscription_init_at
		var inscription_ends_at = category_upd.inscription_ends_at
		var image_url = category_upd.image_url
		var is_published = category_upd.is_published
		var meta = category_upd.meta

		Knex(category.tableName)
		.where('id','=',category_id)
		.where('active','=',1)
		.update({
			'name' : name,
			'participant_minimum' : participant_minimum,
			'participant_maximum' : participant_maximum,
			'other_minimum_participant' :  other_minimum_participant,
			'other_maximum_participant' :  other_maximum_participant,
			'player_minimum_participant' : player_minimum_participant,
			'player_maximum_participant' : player_maximum_participant,
			'player_minimum_summoned' : player_minimum_summoned,
			'player_maximum_summoned' : player_maximum_summoned,
			'coach_minimum_participant' : coach_minimum_participant,
			'coach_maximum_participant' : coach_maximum_participant,
			'team_quantity' : team_quantity,
			'gender_id' : gender_id,
			'season_id' : season_id,
			'is_published' : is_published,
			'category_type_id' : category_type_id,
			'classification_type_id' : classification_type_id,
			'inscription_init_at' : inscription_init_at,
			'inscription_ends_at' : inscription_ends_at,
			'meta': meta,
			'image_url' : image_url }, ['id'])
		.then(function(result){
			if (result.length != 0){
				Response(res, result)
			} else {
				//TODO: Reemplazar por mensaje de response
				Message(res, 'Category not found', '404', result);
			}
		})
		.catch(function(err){
			Response(res, null, err)
		});
	});

	//Cascade delete for Phases -> Groups
	router.delete('/:category_id', function(req, res, next){
		var category_id = req.params.category_id;

		return Models.phase
		.query(function(qb){})
		.where('category_id','=',category_id)
		.where({active:true})
		.fetchAll({withRelated:['groups']})
		.then(function(result){
			result.map(mapper);
			Response(res, result)
		})
		.catch(function(err){
			Response(res, null, err)
		});
	});

	router.get('/:category_id/standing_table', function(req, res){
		var categoryId = req.params.category_id;
		// console.log('standing_table of category', categoryId)
		var matchSql = 'select categories.id as category_id, phases.id as phase_id, rounds.id as round_id, groups.id as group_id, matches.id as match_id, matches.home_team_id as home_team_id , matches.visitor_team_id as visitor_team_id from matches inner join rounds on rounds.id = matches.round_id inner join groups on groups.id = rounds.group_id inner join phases on phases.id = groups.phase_id inner join categories on categories.id = phases.category_id where matches.played = true and categories.id = ' + categoryId

		//todo: promisify this
		StandingTable.getStandingTableByMatches(matchSql, res)
	});


    //==========================================================================
    // Competition by Simple Elimination
    //==========================================================================

    router.post('/:category_id/se', function(req, res){

        var category_id = req.params.category_id;
        var team_quantity = req.body.team_quantity;
        var postitionMSE = 1;
        console.log('\n=======================================================\n')
        console.log('Category by SE of category ', category_id)
        console.log('Category by SE with teams ', team_quantity)

        var phaseCount = Math.log2(team_quantity)

        for (var i = 0; i < phaseCount; i++)
        {
            //Creo una fase
            var numberOfPhase = i+1
            var name = "Fase " + numberOfPhase
            var p = {
                            name            : name,
                            position        : numberOfPhase,
                            active          : true,
                            category_id     : category_id
                        }
            //phase.participant_team = $scope.currentCategory.team_quantity/numberOfPhase
            if(phaseCount == (i+1))
            {
                //SOLO ENTRA EN LA FINAL
                p.name = "Final"
                p.participant_team = 4
                p.classified_team = 0
            }
            else if(phaseCount == (i+2))
            {
                //SOLO ENTRA EN LA SEMIFINAL
                p.name = "Semifinal"
                p.participant_team = 4
                p.classified_team = 4
            }
            else
            {
                console.log('Teams '+ team_quantity +' number of phase '+(numberOfPhase-1))
                console.log('potencia de dos ' + Math.pow(2, numberOfPhase-1))
                p.participant_team = team_quantity/(Math.pow(2, numberOfPhase-1));
                p.classified_team = p.participant_team/2
            }
            console.log('createPhase');

            var Phase = Models.phase;
            console.log('------------------------------');
            console.log(`name               :${p.name}`);
            console.log(`position           :${p.position}`);
            console.log(`category           :${p.category_id}`);
            console.log(`participant_team   :${p.participant_team}`);
            console.log(`classified_team    :${p.classified_team}`);
            console.log('------------------------------');
            new Phase(p).save().then(function(new_phase)
            {
                console.log('CREAMOS LOS GRUPOS PARA LA FASE ', new_phase.id);
                //Se crean los grupos por fase
                console.log('participant_team' + new_phase.attributes.participant_team);
                var maxGroups = new_phase.attributes.participant_team/4
                var locPhase = new_phase.attributes.position
                console.log ('postitionMSE:' + postitionMSE)
                console.log('maxGroups' + maxGroups);
                for (var j = 0; j < maxGroups; j++)
                {
                    var numberOfGroup = j+1;
                    var groupName = "Grupo " + numberOfGroup;
                    //SE CREA EL OBJETO GRUPO
                    var group_post = {
                                    name             : groupName,
                                    active           : true,
                                    phase_id         : new_phase.id,
                                    participant_team : 4,
                                    classified_team  : 2
                                }
                    //Model Instance
                    var Group = Models.group;
                    console.log('createGroup');
                    new Group(group_post).save().then(function(new_group)
                    {
                        console.log('locPhase: ' , locPhase)
                        console.log('numberOfGroup: ' , numberOfGroup)

                        console.log(`CREAMOS LOS ROUNDS PARA El GRUPO ${new_group.id}`);
                        //SE CREA UN ROUND POR GRUPO
                        var Round = Models.round;
                        var round_post = {
                            group_id : new_group.id,
                            name : "Ronda 1"
                        };

                        console.log(`------------------------------`);
                        console.log(`name:       ${round_post.name}`);
                        console.log(`start_date: ${round_post.start_date}`);
                        console.log(`end_date:   ${round_post.end_date}`);
                        console.log(`group_id:   ${round_post.group_id}`);
                        console.log(`------------------------------`);

                        new Round(round_post).save().then(function(new_round)
                        {
                            console.log(`Create round successful ${new_round.id}`);
                            //SE CREAN LOS PARTIDOS DOS PARTIDOS POR ROUND QUE SON CUATRO EQUIPO MINIMO POR GRUPO
                            console.log(`Create a empty match`);
                            for (var i = 2; i > 0; i--)
                            {
                                var m = {
                                    number   : postitionMSE,
                                    round_id : new_round.id,
                                    location : "",
                                    active   : true
                                }
                                console.log(`------------------------------`);
                                console.log(`number:       ${postitionMSE}`);
                                console.log(`round_id: ${m.round_id}`);
                                console.log(`location:   ${m.location}`);
                                console.log(`------------------------------`);
                                postitionMSE++
                                new Models.match(m).save().then(function(item){

                                    console.log(`Match ${item}`);
                                    if(postitionMSE > team_quantity)
                                    {
                                        Message(res, 'Create Simple Elimination successful', 0, {});
                                    }
                                }).catch(function(error){
                                    console.log(`{error: ${error}}`);
                                    Message(res, error.detail, error.code, null);
                                });
                            }

                        }).catch(function(error){
                            console.log(`error: ${error}`);
                            Message(res, error.detail, error.code, null);
                        });
                    }).catch(function(error){
                        console.log(`{error: ${error}}`);
                        Message(res, error.detail, error.code, null);
                    });
                }
            }).catch(function(error){
                console.log(`{error: ${error}}`);
                Message(res, error.detail, error.code, null);
            });
        }
    });

	//==========================================================================
	// Given a category and a team, returns the list of matches
	//==========================================================================

	router.get('/:category_id/teams/:team_id/matches', function(req, res){

		var categoryId = req.params.category_id
		var teamId = req.params.team_id

		return Models.match.query(function(qb){
				qb.innerJoin('rounds', 'rounds.id', 'matches.round_id')
				qb.innerJoin('groups', 'groups.id', 'rounds.group_id')
				qb.innerJoin('phases', 'phases.id', 'groups.phase_id')
				qb.innerJoin('categories', 'categories.id', 'phases.category_id')
				qb.where('categories.id', '=', categoryId)
				qb.where('matches.active', '=', true)
				qb.where('matches.home_team_id', '=', teamId)
				qb.orWhere('matches.visitor_team_id', '=', teamId)
			})
			.fetchAll({withRelated:['round',
				'round.group',
				'round.group.phase',
				'round.group.phase.category',
				'home_team',
				'visitor_team']})
			.then(function(result){
				Response(res, result)
			})
			.catch(function(err){
				Response(res, null, err)
			})
	})

	//==========================================================================
	// Create a category group phase team
	//==========================================================================
	router.post('/:category_id/team/:team_id/invite', function(req, res){
		var data = req.body
		console.log('POST', data)
		saveCategory_group_phase_team(data, res)
	})

	//==========================================================================
	// Update a category group phase team
	//==========================================================================
	router.put('/:category_id/team/:team_id/invite/:id', function(req, res){
		var data = req.body
		console.log('PUT', data)
		saveCategory_group_phase_team(data, res)
	})

	//==========================================================================
	// Save Category Group Phase Team
	//==========================================================================
	var saveCategory_group_phase_team = function(data, res){

		var spiderData = {
			category_id: data.category_id,
			team_id: data.team_id,
			phase_id: data.phase_id,
			group_id: data.group_id,
			active: data.active
		}

		if(data.id){
			console.log("data id: ", data.id)
			spiderData.id = data.id
		}

		return new Models.category_group_phase_team(spiderData).save().then(function(new_invitation){
			console.log(`new_invitation:`, new_invitation);
			Response(res, new_invitation);
		})
		.catch(function(error){
			Response(res, null, error);
		});
	}

	//==========================================================================
	// Get all player of one category and one team
	//==========================================================================
	router.get('/:category_id/team/:team_id/player', function (req, res) {

		var category_id = req.params.category_id;
		var team_id = req.params.team_id;

		return Models.category_team_player
			.where({category_id:category_id})
			.where({team_id:team_id})
			.where({active:true})
			.fetchAll({withRelated:['player']})
			.then(function (result) {
				Response(res, result)
			}).catch(function(error){
				// Message(res,error.details, error.code, []);
				Response(res, null, error)
			});
	});

	//==========================================================================
	// Get all players of one category
	//==========================================================================
	router.get('/:category_id/player', function (req, res) {

		var category_id = req.params.category_id;
		var team_id = req.params.team_id;

		return Models.category_team_player
			.where({category_id:category_id})
			.where({active:true})
			.fetchAll({withRelated:['player']})
			.then(function (result) {
				Response(res, result)
			})
			.catch(function(error){
				Response(res, null, error)
			});
	});

	//==========================================================================
	// Create a category team player
	//==========================================================================
	router.post('/:category_id/team/:team_id/player/:player_id', function(req, res){
		console.log('params: ', req.params)
		var data = {
			params: req.params,
			body: req.body
		}
		console.log('POST', data)
		saveCategory_team_player(data, res)
	})

	//==========================================================================
	// Update a category team player
	//==========================================================================
	router.put('/:category_id/team/:team_id/player/:player_id', function(req, res){
		var data = {
			params: req.params,
			body: req.body
		}
		console.log('PUT', data)
		saveCategory_team_player(data, res)
	})

	//==========================================================================
	// Save Category Group Phase Team
	//==========================================================================
	var saveCategory_team_player = function(data, res){

		console.log('params: ', data.params)
		var summonedData = {
			category_id: data.params.category_id,
			team_id: data.params.team_id,
			player_id: data.params.player_id,
			active: data.body.active = data.body.active !== false,
			number: data.body.number = (data.body.number == undefined) ? 0 : data.body.number,
			position: data.body.position = (data.body.position == undefined) ? "" : data.body.position
		}
		if(data.body.id){
			console.log("data id: ", data.body.id)
			summonedData.id = data.body.id
		}

		console.log('Summoned: ', summonedData);

		return new Models.category_team_player(summonedData)
		.save()
		.then(function(summoned) {
			console.log('Summoned response: ', summoned);
			Response(res, summoned)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	}

	//==========================================================================
	// Get all Phases with the teams of one category
	//==========================================================================
	router.get('/:category_id/phase/team', function (req, res) {

		var category_id = req.params.category_id;
		var phase_id = req.params.phase_id;
		var group_id = req.params.group_id;

		var category_id = req.params.category_id;
		return Models.category_group_phase_team
			.where({category_id:category_id})
			.where({active:true})
			.fetch({withRelated:[ 'category.phases.category_group_phase_team.team']})
			.then(function (result) {

				var x = result.toJSON().category.phases

				Response(res, x)
			}).catch(function(error){
				Response(res, null, error)
			});
	});

	return router;

});
