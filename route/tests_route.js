/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

var _log = (obj) => console.log(inspect(obj, {colors: true, depth: Infinity }))

define(['express'
	,'../model/index'
	,'../util/request_message_util'
	,'../util/knex_util'
  ,'../util/response_message_util'
  ,'../util/object_map_util'
  ,'../util/email_sender_util'
  ,'../util/logger_util'
], function (express, Models, Message, Knex, Response, ReplaceHelper, Email, logger) {

    var router = express.Router();

	router.get('/update-score', (req, res) => {
		Models.match.forge({id: 192})
		.fetch({withRelated: ['events.event']})
		// .fetch()
		.then(match => {
			// logger.debug(match.toJSON())
			// logger.lme.w(`${match.relations.home_team.attributes.name}-${match.relations.visitor_team.attributes.name}`)
			// logger.lme.s(`${match.attributes.home_team_score}-${match.attributes.home_team_score}`)
			logger.lme.w(match.getScore())
			logger.lme.wline()
			match.updateScore()
			.then(result => {
				logger.lme.sline()
				logger.lme.s(result.getScore())
				Response(res, result)
			})
		})
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

    router.get('/doorduino/', function(req, res){
      Message(res,'sesame', '0', {a:'Done'});
    })

    const fecth_team_entity = (team_id) => {
          return Models.entity
            .where({object_id:team_id, active:true, object_type:'teams'})
            .fetch()
            .then(function(result){
              console.log("fn: ", result.attributes.object_id)
              return result
            })
            .catch(function(error){
              console.log("fne: ", 0)
              return {}
            });
    }

    const curring_function = (object_id) => {
      var sum = object_id + 1
      console.log("Inner fn: ", sum)
    }

    const fetch_father = (req, res, result) => {
      return Models.entity_relationship
      .where({ent_ref_to_id:result.attributes.object_id, relationship_type_id:1, active:true})
      .fetchAll({withRelated:['from', 'to']})
      .then(function(innerResult){
        console.log("Innder Result", result.innerResult)
        Response(res, innerResult)
      })
      .catch(function(innerError){
        Response(res, innerError)
      })
    }

    // Testing team - status chaged - email functionallity
    // router.get('/rel/:team_id', (req, res ) => {
    //     var team_id = req.params.team_id;
    //   	return Models.entity
    //   		.where({object_id:team_id, active:true, object_type:'teams'})
    //   		.fetch()
    //   		.then(function(result){
    //         console.log("Object_id", result.attributes.object_id)
    //         console.log("Entity_id", result.attributes.id)
    //         return Models.entity_relationship
    //         .where({ent_ref_to_id:result.attributes.id, relationship_type_id:1, active:true})
    //         .fetch({withRelated:['from', 'to']})
    //         .then(function(innerResult){
    //           console.log("Father Object_id: " , innerResult.relations.from.attributes.object_id)
    //           // console.log("Inner Result", InnerResult)
    //           return Models.user
    //           .where({id:innerResult.relations.from.attributes.object_id})
    //           .fetch()
    //           .then(function(user_result){
    //             console.log("User Found: ", user_result)
    //               Response(res, user_result)
    //           })
    //           .catch(function(user_error){
    //             console.log("No user Found!: ", user_error)
    //               Response(res, user_error)
    //           })
    //         })
    //         .catch(function(InnerError){
    //           Response(res, InnerError)
    //         })
    //   		})
    //   		.catch(function(error){
    //   			Response(res, error)
    //   		});
    // })

    router.get('/sendgrid/', function(req, res){
      Message(res,`User: ${process.env.SENDGRID_USERNAME}, Password:${process.env.SENDGRID_PASSWORD}`, '0', {a:'Done'});
    })

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
      });

	//crea un jugador falso en el roster del equipo seleccionado
	router.get('/fake/player/team/:team_id', (req, res) => {

	})

  //==========================================================================
  //---------------------- Email By Status Change tests ----------------------
  //==========================================================================

  router.get('/status/:team_id/category/:category_id', (req, res) => {
    console.log("Inside testing")
    var data = {}
    var teamid = req.params.team_id
    var categoryid = req.params.category_id

    data.team_id = teamid
    data.category_id = categoryid
    previous_registration_status(data)
  })


  //==========================================================================
  // Get previous team - competition - registration status
  //==========================================================================
  //
  const previous_registration_status = (data) => {
    return Models.category_group_phase_team
      .where({
        team_id: data.team_id
        ,category_id: data.category_id
      })
      .fetch({withRelated:['status_type']})
      .then(function(result){

        //console.log("Result: ", result)
        //return result
        //console.log("Status: ", result.relations.status_type.attributes.code)
        // if (result.attributes.status_id != data.status_id) {
          var email_template = email_status_template(result.relations.status_type.attributes.code)
          data.template = email_template
          var owner_email = team_owner_email(data)
          //TODO
          //Send Email ----> Send Email
        // }
      })
      .catch(function(err){
        return null
      })
  }

  //==========================================================================
  // Get previous status send Email by Status
  //==========================================================================
  const email_status_template = (status) => {
    switch (status) {
      case "pre-registration-in-progress":
        return './template/email/alianza_status_invited.html'
      case "pre-registration-approved":
        return './template/email/alianza_status_approved.html';
      case "pre-registration-rejected":
        return './template/email/alianza_status_rejected.html';
      case "pre-registration-paid":
        return './template/email/alianza_status_paid.html';
      default:
        return './template/email/alianza_status_registrated.html';
    }
  }

  //==========================================================================
  // Get previous status send Email by Status
  //==========================================================================

  const send_status_email = function(data){

    // console.log("Status Email ", data.template)
    var tag = {
      COACH_KEY: `${data.user.attributes.username}`
      ,TEAM_KEY: `${data.team.attributes.name}`
      ,TORNEO_KEY: `${data.category.relations.season.relations.competition.attributes.name}`
      ,CATEGORIA_KEY: `${data.category.attributes.name}`
      ,CIUDAD_KEY: `${JSON.parse(data.category.relations.season.attributes.meta).ciudad}`
    }

    var template = template_string_replace(data.template
        ,tag ,process.env.SENDER_EMAIL
        ,'Información de registro para Torneos'
        ,'jorgevmendoza@gmail.com')
        //,data.user.attributes.email)
}

//==========================================================================
// Get previous status send Email by Status
//==========================================================================

  const template_string_replace = function(file, tag, sender, subject, to){
  var fs = require('fs');
    fs.readFile(file, 'utf8', function(err, contents) {
      contents = ReplaceHelper(tag, contents)
      var send = Email(process.env.SENDER_EMAIL)
      send(to, subject, contents)
    });
  }

  //==========================================================================
  //Find current owner (User) based on team_id
  //==========================================================================
  const team_owner_email = (data) => {
    //Buscar Id entidad Team_id
    //entity_relationship -> to (id_entidad_equipo) -> relationship_Type 1 (Owner)
      return Models.entity
        .where({object_id:data.team_id, active:true, object_type:'teams'})
        .fetch()
        .then(function(result){
          // console.log("Object_id", result.attributes.object_id)
          // console.log("Entity_id", result.attributes.id)
          return Models.entity_relationship
          .where({ent_ref_to_id:result.attributes.id, relationship_type_id:1, active:true})
          .fetch({withRelated:['from', 'to']})
          .then(function(innerResult){
            // console.log("Father Object_id: " , innerResult.relations.from.attributes.object_id)
            return Models.user
            .where({id:innerResult.relations.from.attributes.object_id})
            .fetch()
            .then(function(user_result){
              data.user = user_result
              // console.log("User Found: ", user_result)
                //return user_result
                team_data(data)
            })
            .catch(function(user_error){
              // console.log("No user Found!: ", user_error)
                return user_error
            })
          })
          .catch(function(InnerError){
            return InnerError
          })
        })
        .catch(function(error){
          return error
        });
  }

  //==========================================================================
  // Get Team Full Data
  //==========================================================================
  const team_data = (data) => {
    return Models.team
      .where({id:data.team_id, active:true})
      .fetch()
      .then((result) => {
        data.team = result
        // console.log("Team Data: ", data)
        competition_data(data)
        //return data
      })
      .catch((error) => {
        return {}
      })
  }

  //==========================================================================
  // Get Competition Full Data
  //==========================================================================
  const competition_data = (data) => {
    return Models.category
      .where({id:data.category_id, active:true})
      .fetch({withRelated:'season.competition'})
      .then((result) => {
        data.category = result
        var status_email = send_status_email(data)
        return
        // console.log("Full Data: ", data)
        // console.log("Season Rel Data: ", JSON.parse(data.category.relations.season.attributes.meta).ciudad)
        //return data
      })
      .catch((error) => {
        return {}
      })
  }

  //==========================================================================
  //
  // Functional Experiment
  //
  //==========================================================================



    return router;
});
