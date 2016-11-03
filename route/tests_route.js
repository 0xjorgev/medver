/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

var _log = (obj) => console.log(inspect(obj, {colors: true, depth: Infinity }))

define(['express',
	'../model/index',
	'../util/request_message_util',
	'../util/knex_util'
	], function (express, Models, Message, Knex) {

    var router = express.Router();

        router.get('/entities', (req, res) => {

            Models.user
            .query((qb) => {
                qb.where({id: 2})
            })
            .fetch({withRelated: [
                 'entity.related_from.relationship_type'
                ,'entity.related_from.to.entity_type'
                // ,'entity.related_from.from.entity_type'
            ]})
            .then((result) => {
                var user = result.toJSON()
                // _log(user)
                //con esto se filtran las relaciones tipo 'coach'
                return user.entity.related_from
                .filter((rel) => rel.relationship_type.name == 'COACH')
                //y con este map se extraen los ids de los teams
                .map((teams) => teams.to.object_id)
            })
            .then((result) => {
                _log(result)
                return Models.team
                .query((qb) => qb.whereIn('id', result))
                .fetchAll()
            })
            .then((result) => {
                Message(res, 'Success', '0', result)
            })

            // Models.entity
            // .query((qb) => {
            //     //filtrar por tipo de entidad de usuario
            //     qb.where({object_id: 2, entity_type_id: 1})
            // })
            // .fetchAll({withRelated: ['entity_type'
            //     ,'related_to.relationship_type'
            //     ,'related_from.relationship_type'
            // ]})
            // .then((result) => _log(result.toJSON()) )


        })


      var getTeamByName = function(name1, name2){

        return Models.team.query(function(qb){
          qb.where({name:name1})
          qb.orWhere({name: name2})
          qb.where({active:true})
        })
        .fetchAll({debug: false})
        .then(function(team){
            console.log(`Team: ${{ team }}`,team)
            return team
        }).catch(function(error){
           console.log('Failed:',error)
            return null
        })
      }

    router.get('/:category_id', function (req, res) {

        console.log('Set Data for testing');
        //Cholitas 10
        //Archi 15
        var category_id = req.params.category_id;
        var Category = Models.category_group_phase_team
        //Model Instance
        new Category(
            {
              team_id:10,
              category_id:category_id

            }
        ).save().then(function(new_team){
            console.log(`{new_team: ${new_team}}`);
            // Message(res, 'Success', '0', new_team);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            // Message(res, error.detail, error.code, null);
        });

        new Category(
            {
              team_id:15,
              category_id:category_id

            }
        ).save().then(function(new_team){
            console.log(`{new_team: ${new_team}}`);
            // Message(res, 'Success', '0', new_team);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            // Message(res, error.detail, error.code, null);
        });

        Message(res,'Success', '0', {a:'Done'});
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


    //TODO: Esto parece no estar en uso, deberia arrojar error al probar
    router.post('/organization/:org_id/category/:cat_id', function (req, res) {

        console.log('Team Create');
        //Model Instance
        var Team        = Models.team;
        var team_post   = req.body;
        var org_id      = req.params.org_id;
        var cat_id      = req.params.cat_id;
        var logo_url    =  req.params.logo_url;
        var short_name  =  req.params.short_name;
        var description =  req.params.description;
        var name        = group_post.name;

        new Team(
            team_post
        ).save().then(function(new_team){
            console.log(`{new_team: ${new_team}}`);
            Message(res, 'Success', '0', new_team);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });

    router.post('/', function (req, res) {
        var teamData = req.body
        console.log('\n\n\n\n\n\nTeam create params\n\n\n', teamData)

        var orgData = {}

        if(teamData.organization_id){
            orgData.id = teamData.organization_id
        }
        else{
            orgData = {
                //TODO: reemplazar el id por un code, en lugar del ID directo de base de datos
                organization_type_id: 3, //organizacion tipo club
                name: teamData.name + ' Club',
                description: teamData.description,
            }
        }

        teamData.short_name = teamData.short_name ? teamData.short_name : teamData.name.substr(0,2).toUpperCase()
        teamData.description = teamData.description ? teamData.description : teamData.name

        console.log('saving/updating org', orgData)
        //TODO: Aqui se esta haciendo update de la org si existe... no he encontrado la forma de hacer un promise chain condicional
        //dado que se debería hacer el save solo en el caso de que la org no exista.
        new Models.organization(orgData).save().then(function(result){
            teamData.organization_id = result.attributes.id
            console.log('org created/updated', result)
            return teamData
        })
        .then(function(teamData){
            return new Models.team(teamData).save()
        })
        .then(function(new_team){
            console.log('saved team:', new_team.attributes)
            Message(res, 'Success', '0', new_team)
        })
        .catch(function(error){
            console.log('error', error)
            Message(res, error.detail, error.code, null)
        })

    });

    router.put('/:team_id', function(req, res, next){

        console.log('Team Update');
        //Model Instance
        var group = new Models.group;

        //URL Request, Season Id
        var team_id = req.params.team_id;
        var team_upd = req.body;

        Knex(group.tableName)
        .where('id','=',team_id)
        .where('active','=',1)
        .update(team_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
            Message(res, 'Success', '0', result);
            } else {
                Message(res, 'team not found', '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    //----------------------------------
    // Match update
    // Temporary
    //----------------------------------

    router.put('/match/:match_id', function (req, res) {

        var match_id = req.params.match_id;
        var updt = req.body;
        console.log('>>>>>>>>>>>>>>>>>>>>>>>', match_id);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>', req.body);
        Knex('matches')
        .where('id','=',match_id)
        .update(updt, ['id'])
        .then(function(result){
          console.log('Success', result);
          Message(res, 'Success', '0', result);
        })
        .catch(function(err){
          console.log('inside catch');
          res.code = err.code;
          res.json({message:err.detail, code: err.code, data: {} });
        });

          // .where('id','=',match_id)
          // .update(updt, ['id'])
          // .then(function(result){
          //   Message(res, 'Success', '0', result);
          // })
          // .catch(function(error){
          //   res.json({message:error.detail, code: error.code, data: {} });
          // });
      });
    return router;
});
