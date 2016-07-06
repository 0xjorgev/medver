/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

var _ = require('lodash')

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util', '../helpers/standing_table_helper'], function (express, Models, Message, Knex, StandingTable) {

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

		console.log("Teams by Category");
		var category_id = req.params.category_id;

		return Models.category_group_phase_team
		.where({category_id:category_id})
		.where({active:true})
		.fetchAll({withRelated:['team']})
		.then(function (result) {
			Message(res,'Success', '0', result);
		}).catch(function(error){
			Message(res,error.details, error.code, []);
		});
	});

	//List of seasons (doesn't seems to be needed) -> Returns Array of result
	router.get('/', function (req, res) {
		return Models.category
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['gender', 'phases', 'classification']})
		.then(function (result) {
			 // console.log('result: ' + result);
			Message(res,'Success', '0', result);
		}).catch(function(error){
			// console.log('Error: ' + error);
			Message(res,error.details, error.code, []);
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
				Message(res,'Success', '0', result);
			}).catch(function(error){
				Message(res,error.details, error.code, []);
			});
	});

	router.post('/', function (req, res) {
		//Model Instance
		var Category = Models.category;
		var category_post = req.body;
		// var gender_id = category_post.gender_id;
		// var season_id = category_post.season_id;
		// var name = category_post.name;
		// var description = category_post.description;
		// var image_url = category_post.image_url;
		// var inscription_init_at = category_post.inscription_init_at;
		// var inscription_ends_at = category_post.inscription_ends_at;
		// //V 1.1
		// var minimum_value = category_post.minimum_value;
		// var maximum_value = category_post.maximum_value;

		// console.log('--------------------');
		// console.log("season_id: " + competition_id);
		// console.log("name: " + name);
		// console.log("gender_id: " + gender_id);
		// console.log("inscription_init_at: " + inscription_init_at);
		// console.log("inscription_ends_at: " + inscription_ends_at);
		// console.log("minimum_value: " + minimum_value);
		// console.log("maximum_value: " + maximum_value);
		// console.log("image_url: " + image_url);
		// console.log('--------------------');

		new Category(category_post
		// {
		//     name: name,
		//     description:description,
		//     image_url:image_url,
		//     inscription_init_at:inscription_init_at,
		//     inscription_ends_at:inscription_ends_at,
		//     gender_id: gender_id,
		//     season_id: season_id,
		//     minimun_value: minimum_value,
		//     maximun_value: maximum_value
		// }
		).save().then(function(new_category){
			console.log(`{new_category: ${new_category}}`);
			Message(res, 'Success', '0', new_category);
		}).catch(function(error){
			console.log(`{error: ${error}`);
			Message(res, error.detail, error.code, null);
		});
	});


	router.put('/:category_id', function(req, res, next){
		//Model Instance
		var category = new Models.category;

		//URL Request, Season Id
		var category_id = req.params.category_id;
		var category_upd = req.body;

		console.log('--------------------');
		// console.log("season_id: " + competition_id);
		// console.log("name: " + name);
		// console.log("gender_id: " + gender_id);
		// console.log("inscription_init_at: " + inscription_init_at);
		// console.log("inscription_ends_at: " + inscription_ends_at);
		// console.log("minimum_value: " + minimum_value);
		// console.log("maximum_value: " + maximum_value);
		// console.log("image_url: " + image_url);
		console.log('--------------------');

		Knex(category.tableName)
		.where('id','=',category_id)
		.where('active','=',1)
		.update(category_upd, ['id'])
		.then(function(result){
			if (result.length != 0){
				console.log('result is not null');
				console.log(`result: ${result[0]}`);
				Message(res, 'Success', '0', result);
			} else {
				Message(res, 'Category not found', '404', result);
			}
		})
		.catch(function(err){
			console.log(`error: ${err}`);
		  Message(res, err.detail, err.code, null);
		});
	});

	//Cascade delete for Phases -> Groups
	router.delete('/:category_id', function(req, res, next){
		var category_id = req.params.category_id;

		console.log('--------------------');
		console.log(`-----Category / Phase / ${category_id} Delete-----`);
		console.log('--------------------');

		return Models.phase
		.query(function(qb){})
		.where('category_id','=',category_id)
		.where({active:true})
		.fetchAll({withRelated:['groups']})
		.then(function(result){
		  console.log('result: delete cascade');
		  result.map(mapper);
		  //this.phaseDelete(result.attributes.id);
		  Message(res, 'Delete successful', 0, {});
		}).catch(function(err){
			console.log(`error: ${err}`);
			Message(res, err.detail, err.code, null);
		});
	});

	router.get('/:category_id/standing_table', function(req, res){
		var categoryId = req.params.category_id;
		console.log('\n=======================================================\n')
		console.log('standing_table of category', categoryId)

		var matchSql = 'select categories.id as category_id, phases.id as phase_id, rounds.id as round_id, groups.id as group_id, matches.id as match_id, matches.home_team_id as home_team_id , matches.visitor_team_id as visitor_team_id from matches inner join rounds on rounds.id = matches.round_id inner join groups on groups.id = rounds.group_id inner join phases on phases.id = groups.phase_id inner join categories on categories.id = phases.category_id where categories.id = ' + categoryId

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
				Message(res, 'Success', 0, result)
			}).catch(function(err){
				console.log(`error: ${err}`);
				Message(res, err.detail, err.code, null)
			})
	})

	return router;

});
