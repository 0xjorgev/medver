/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

var _ = require('lodash')

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util'], function (express, Models, Message, Knex) {

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
      Knex('phases')
      .where({id:phase}, ['id'])
      .del().then(function(del_phase){
        console.log('del_phase', del_phase);
      }).catch(function(error){
        console.log('del_phase error:', error);
      })
    };

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

    //List of seasons (don't seem to be needed) -> Returns Array of result
    router.get('/', function (req, res) {
        return Models.category
        .query(function(qb){})
        .where({active:true})
        //.fetchAll({withRelated: []})
        .fetchAll({withRelated: ['gender', 'phases', 'classification']})
        //.fetchAll({withRelated: ['gender', 'season']})
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
        //.fetch({withRelated: []})
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
        var gender_id = category_post.gender_id;
        var season_id = category_post.season_id;
        var name = category_post.name;
        var description = category_post.description;
        var image_url = category_post.image_url;
        var inscription_init_at = category_post.inscription_init_at;
        var inscription_ends_at = category_post.inscription_ends_at;
        var team_quantity = category_post.team_quantity;
        //V 1.1
        var minimum_value = category_post.minimum_value;
        var maximum_value = category_post.maximum_value;

        var category_type_id = category_post.category_type_id;
        var participant_minimum = category_post.participant_minimum;
        var participant_maximum = category_post.participant_maximum;
        var other_minimum_participant = category_post.other_minimum_participant;
        var other_maximum_participant = category_post.other_maximum_participant;
        var player_minimum_participant = category_post.player_minimum_participant;
        var player_maximum_participant = category_post.player_maximum_participant;
        var coach_minimum_participant = category_post.coach_minimum_participant;
        var coach_maximum_participant = category_post.coach_maximum_participant;

        console.log('--------------------');
        // console.log("season_id: " + competition_id);
        console.log("name: " + name);
        console.log("gender_id: " + gender_id);
        console.log("season_id: " + season_id);
        console.log("inscription_init_at: " + inscription_init_at);
        console.log("inscription_ends_at: " + inscription_ends_at);
        console.log("team_quantity: " + team_quantity);
        console.log("minimum_value: " + minimum_value);
        console.log("maximum_value: " + maximum_value);
        console.log("image_url: " + image_url);
        console.log("category_type_id: " + category_type_id);
        console.log("participant_minimum: " + participant_minimum);
        console.log("participant_maximum: " + participant_maximum);
        console.log("other_minimum_participant: " + other_minimum_participant);
        console.log("other_maximum_participant: " + other_maximum_participant);
        console.log("player_minimum_participant: " + player_minimum_participant);
        console.log("player_maximum_participant: " + player_maximum_participant);
        console.log("coach_minimum_participant: " + coach_minimum_participant);
        console.log("coach_maximum_participant: " + coach_maximum_participant);
        console.log('--------------------');

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
            console.log(`{error: ${error}}`);
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
          Message(res, 'Delete successful', 0, null);
        }).catch(function(err){
            console.log(`error: ${err}`);
            Message(res, err.detail, err.code, null);
        });
    });

    //==========================================================================
    // Standing table service
    //==========================================================================

    router.get('/:category_id/standing_table', function(req, res){

        var category_id = req.params.category_id;

        console.log('\n=======================================================\n')
        console.log('standing_table of category', category_id)

        //TODO:  all the functions used in this method should be in a separate js file

        var dummy_data = [ { team_id: 1, points: 6, goals: 3, matches: 3 },
                          { team_id: 2, points: 7, goals: 4, matches: 3 },
                          { team_id: 3, points: 0, goals: 2, matches: 3 },
                          { team_id: 4, points: 4, goals: 3, matches: 3 } ];

        //TODO: se puede colocar la logica de negocio en el model?

        //==========================================================================
        //  inner functions
        //==========================================================================

        //dados los resultados de un match, se reducen a un objeto
        var summarizeMatchResults = function(events){
            return function(match){
                events.forEach(function(event){
                    // console.log('>>>>>>>> summarizeMatchResults', match)
                    if(event.match_id == match.match_id){


                        match.home_team_goals = (event.team_id == match.home_team_id) ? event.goals : match.home_team_goals
                        match.visitor_team_goals = (event.team_id == match.visitor_team_id) ? event.goals : match.visitor_team_goals
                    }
                })
                return match
            }
        }

        //dado un match, se le coloca dos propiedades para los scores de cada equipo
        var prepMatch = function(match){
            match.home_team_goals = 0
            match.visitor_team_goals = 0
            return match
        }

        //filtro que obtiene los eventos dado un match
        var filterByMatch = function(match){
            return function(event){
                return event.match_id == match.id
            }
        }

        var assignPointsByMatch = function(m){
            if(m.home_team_goals == m.visitor_team_goals){
                m.home_team_points = 1
                m.visitor_team_points = 1
            }
            else{
                m.home_team_points = m.home_team_goals > m.visitor_team_goals ? 3 : 0
                m.visitor_team_points = m.home_team_goals < m.visitor_team_goals ? 3 : 0
            }
            return m
        }

        //sacar todos los ids de equipo, en home y visitor, then uniq
        var buildStandingTable = function(table,match){
            table.find(function(team){
                return team.team_id == match.home_team_id
            })
        }

        //se extraen los matches donde ha participado el equipo y se normaliza en una estructura estandar
        var normalizeTeamResults = function(matchesWithResults){
            return function(team){
                var pointsPerMatch = matchesWithResults.map(function(match){
                    var result = {team_id: team.id, points: 0, goals: 0, matches: 0, data: team}
                    if(match.home_team_id == team.id){
                        result.points = match.home_team_points
                        result.goals = match.home_team_goals
                        result.matches = 1
                    }else if(match.visitor_team_id == team.id){
                        result.points = match.visitor_team_points
                        result.goals = match.visitor_team_goals
                        result.matches = 1
                    }
                    return result
                })
                return pointsPerMatch
            }
        }

        var calculateStandingTable = function(results){
            return results.reduce(function(total, result){
                total.team_id = result.team_id
                total.points += result.points
                total.goals += result.goals
                total.matches += result.matches
                total.data = result.data
                return total
            },{team_id: null, points: 0, goals: 0, matches: 0})
        }

        var pickTeams = function(match){
            return [match.home_team_id, match.visitor_team_id]
        }

        //==========================================================================
        //  DB interaction phase
        //==========================================================================

        var matchesByCategorySQL = 'select categories.id as category_id, phases.id as phase_id, rounds.id as round_id, groups.id as group_id, matches.id as match_id, matches.home_team_id as home_team_id , matches.visitor_team_id as visitor_team_id from matches inner join rounds on rounds.id = matches.round_id inner join groups on groups.id = rounds.group_id inner join phases on phases.id = groups.phase_id inner join categories on categories.id = phases.category_id where categories.id = ' + category_id;

        //TODO: encadenar promises
        var matchesByCategory = Knex.raw(matchesByCategorySQL).then(function(result){
            // console.log('call result\n---->',result.rows)
            matches = result.rows

            var matchIds = matches.map((e) => e.match_id)
            // console.log('flat', matchIds)
            var goalsByMatchSQL = `select match_id, event_id, team_id, count(*) as goals from events_matches_players where active = true and event_id = 1 and match_id in (${matchIds.join(',')}) group by 1,2,3 order by 1,2,3`

            var standing_table = Knex.raw(goalsByMatchSQL).then(function(result){
                goals = result.rows
                goals.map((g) => g.goals = parseInt(g.goals))

                // console.log('goals', goals)

                var matchesWithResults = matches
                    .map(prepMatch)
                    .map(summarizeMatchResults(goals))
                    .map(assignPointsByMatch)

                // console.log('matchesWithResults', matchesWithResults)

                //extraigo los ID de teams
                var teams = matchesWithResults.map(pickTeams)
                teams = _(teams).flatten().uniq().value()


                Models.team
                    .where({active: true})
                    .where('id', 'in', teams)
                    .fetchAll({withRelated: ['category_type', 'organization', 'player_team.player'], debug: true})
                    .then(function (result) {
                        teams = result.models.map(function(m){
                            return m.attributes
                        })

                        //se sumarizan los resultados normalizados de los partidos
                        var standingTable = teams
                            .map(normalizeTeamResults(matchesWithResults))
                            .map(calculateStandingTable)

                        return Message(res, 'Success', 0, standingTable)

                    }).catch(function(error){
                        console.log(error)
                    });
            })
        });
    });


    return router;
});
