/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util','../util/email_sender_util'], function (express, Models, Message, Knex, Email) {

    var router = express.Router();
    var send_email_from = Email(process.env.SENDER_EMAIL);

    var userMap = function(user){
        //console.log('Inner User :', user)
        return user.attributes.email
    }

    var userReduce = function(acum, email)
    {
        console.log("Email: ", email)
        console.log("Acum: ", acum)
        return acum += ", " + email
    }

    router.get('/:comp_id/admin_user/', function(req, res, next){

        console.log('Competitions Admins');
        var comp_id = req.params.comp_id;
        // console.log('Model: ' , Models.competition_user.tableName);
        return Models.competition_user
         .where({competition_id :comp_id})
        .where({active:true})
        .fetchAll({withRelated: ['users']})
        .then(function(result){
            //console.log('Res: ', result);
            Message(res,'Success', ' 0', result);
        })
        .catch(function(err){
            console.log('err: ', err);
          Message(res, err.detail, err.code, null);
        });
    });

    //List of competitions
    router.get('/', function (req, res) {

        console.log('Competition List');
        return Models.competition
        .query(function(qb){})
        .fetchAll({withRelated: ['discipline','subdiscipline', 'competition_type', 'seasons', 'seasons.categories']})
        .then(function (result) {
            // console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            console.log(error)
            console.log(error.stack)
            Message(res,error.details, error.code, []);
        });
    });

    //Competitions Types List -> Array of results [Competition_type]
    router.get('/competition_type', function(req, res){
        console.log('types');
        return Models.competition_type
        .fetchAll()
        .then(function (result) {
            console.log('Result:'+result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            console.log('Result:'+error);
             Message(res,error.details, error.code, []);
        });
    });

    //Competition by Id
    router.get('/:competition_id', function (req, res) {
        console.log('competition_id List');
        var comp_id = req.params.competition_id;
        return Models.competition
        .where({'id':comp_id})
        .fetch( {withRelated: ['discipline','subdiscipline', 'competition_type', 'seasons']} )
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Seasons by Competition_Id -> Returns array of result
    router.get('/:competition_id/season/', function (req, res) {
        console.log('/competition_id/season/');
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
//Move to an independent Router

//--------------------------
    router.post('/:competition_id/contact/', function (req, res) {
        console.log('/:competition_id/contact/create');

        var Contact = Models.contact;
        var contact_post = req.body;
        var competition_id = req.params.competition_id;

        console.log('Req Values:' + req.body);

        var country = contact_post.country;
        var state = contact_post.state;
        var city = contact_post.city;
        var zip_code = contact_post.zip_code;
        var phone = contact_post.phone;
        var email = contact_post.email;
        var website_url = contact_post.website_url;

        console.log('------------------------------');

        console.log('country: ', contact_post.country);
        console.log('state: ', contact_post.state);
        console.log('city: ', contact_post.city);
        console.log('zip_code: ', contact_post.zip_code);
        console.log('phone: ', contact_post.phone);
        console.log('email: ', contact_post.email);
        console.log('website_url: ', contact_post.website_url);
        console.log('competition_id: ', competition_id);

        console.log('------------------------------');

        new Contact({
            // country: contact_post.country,
            // state: contact_post.state,
            // city:contact_post.city,
            // zip_code:contact_post.zip_code,
            // phone:contact_post.phone,
            // email:contact_post.email,
            // website_url:contact_post.website_url,
            // competition_id: competition_id
            contact_post
        }).save().then(function(new_contact){
            console.log(`{new_contact: ${new_contact}}`);
            Message(res, 'Success', '0', new_contact);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });

    });

    //Competition Contact by competition_id
    router.get('/:competition_id/contact/', function (req, res) {
        console.log('/:competition_id/contact/:contact_id');

        var competition_id = req.params.competition_id;
        return Models.contact
        .where('competition_id','=',competition_id)
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Competition Contact by contact_id
    router.get('/:competition_id/contact/:contact_id', function (req, res) {
        console.log('/:competition_id/contact/:contact_id');

        var competition_id = req.params.competition_id;
        var contact_id = req.params.contact_id;

        console.log('Req Values:' + req.body);

        return Models.contact
        .where({competition_id:competition_id, id:contact_id})
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Competition Contact Update
    router.put('/:competition_id/contact/:contact_id', function(req, res){
        console.log('/:competition_id/contact/:contact_id/update');
        //Model Instance
        var Contact = Models.contact;

        var competition_id = req.params.competition_id;
        var contact_id = req.params.contact_id;
        var contact_upd = req.body;

        // Knex(competition.tableName)
        Knex('contacts')
        .where('id','=',contact_id)
        .where('competition_id','=',competition_id)
        .update(contact_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                console.log(`{error: ${error}}`);
                Message(res, 'Wrong Competition_id or contact_id', '404', result);
            }
        })
        .catch(function(err){
            console.log(`Catch Error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });
//--------------------------



    //Create Competition
    router.post('/', function (req, res) {


        //ADD URL
        //Model Instance
        console.log('Create Competition');
        var Competition = Models.competition;
        var competition_post = req.body;

        //console.log('Req Values:' + req.body);

        var name = competition_post.name;
        var discipline_id = competition_post.discipline_id;
        var subdiscipline_id = competition_post.subdiscipline_id;
        var competition_type_id = competition_post.competition_type_id;
        var description = competition_post.description;
        var img_url = competition_post.img_url;
        var is_published = competition_post.is_published;

        console.log('------------------------------');

        console.log('name: ', competition_post.name);
        console.log('discipline_id: ', competition_post.discipline_id);
        console.log('subdiscipline_id: ', competition_post.subdiscipline_id);
        console.log('competition_type_id: ', competition_post.competition_type_id);
        console.log('description: ', competition_post.description);
        console.log('competition_post: ', competition_post);

        console.log('------------------------------');

         new Competition( competition_post
            //{
        //     competition_post
            // name: name,
            // description: description,
            // discipline_id:discipline_id,
            // subdiscipline_id:subdiscipline_id,
            // competition_type_id:competition_type_id,
            // img_url: img_url,
            // is_published: is_published
        // }
        ).save().then(function(new_competition){
            console.log(`{new_competition: ${new_competition}}`);
            Message(res, 'Success', '0', new_competition);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });

    // //Competition Update
    // router.put('/:competition_id/', function(req, res){

    //     console.log('Competition Update');

    //     //Model Instance
    //     var competition = Models.competition;
    //     var competition_id = req.params.competition_id;
    //     var competition_upd = req.body;
    //     console.log('------------------------------');
    //     console.log('Competition Update');
    //     console.log('name: ', competition_upd.name);
    //     console.log('description: ', competition_upd.description);
    //     console.log('discipline_id: ', competition_upd.discipline_id);
    //     console.log('subdiscipline_id: ', competition_upd.subdiscipline_id);
    //     console.log('competition_type_id: ', competition_upd.competition_type_id);
    //     console.log('is_published: ', competition_upd.is_published);
    //     console.log('------------------------------');

    //     // Knex(competition.tableName)
    //     Knex('competitions')
    //     .where('id','=',competition_id)
    //     .where('active','=',1)
    //     .update(competition_upd, ['id'])
    //     .then(function(result){
    //         if (result.length != 0){
    //             console.log('result is not null');
    //             console.log(`result: ${result[0]}`);
    //             Message(res, 'Success', '0', result);
    //         } else {
    //             console.log(`{error: ${error}}`);
    //             Message(res, 'Username or email not found', '404', result);
    //         }
    //     })
    //     .catch(function(err){
    //         console.log(`error: ${err}`);
    //       Message(res, err.detail, err.code, null);
    //     });
    // });

    router.post('/:comp_id/admin_user/', function(req, res, next){

        console.log('Create Competitions Admins');
        var Competition_user = Models.competition_user
        var comp_user = req.body;

        new Competition_user( comp_user
        ).save().then(function(new_admin_user){
            console.log(`{new_admin_user: ${new_admin_user}}`);
            Message(res, 'Success', '0', new_admin_user);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });

    // router.put('/:comp_id/admin_user/', function(req, res, next){

    //     console.log('Update Competitions Admins');
    //     var Competition_user = Models.competition_user
    //     var comp_user = req.body;
    //     var id = req.body.id;

    //     Knex('competitions_users')
    //     .where({active:true})
    //     .where({id:id})
    //     .update(comp_user, ['id'])
    //     .then(function(result){
    //         console.log(`{admin_user: ${result}}`);
    //         Message(res, 'Success', '0', result);
    //     }).catch(function(error){
    //         console.log(`{error: ${error}}`);
    //         Message(res, error.detail, error.code, null);
    //     });
    // });

    //---------------------------------------------------------------
    //                    Testing Stuff
    //---------------------------------------------------------------
    router.get('/rcompetition/:competition_id', function (req, res) {
        console.log('competition_id List');
        var comp_id = req.params.competition_id;
        return Models.competition
        .where({'id':comp_id})
        // .fetch( {withRelated: ['discipline.subdisciplines', 'competition_type', 'seasons','seasons.categories.classification', 'seasons.categories.phases', 'seasons.categories.phases.groups','seasons.categories.category_group_phase_team.group.rounds.matches.home_team', 'seasons.categories.category_group_phase_team.group.rounds.matches.visitor_team']} )
        .fetch( {withRelated: ['discipline.subdisciplines',
            'competition_type',
            'seasons',
            'seasons.categories.classification',
            'seasons.categories.phases',
            'seasons.categories.phases.groups']} )
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });
    //---------------------------------------------------------------

    //Competition Update
    router.put('/:competition_id/', function(req, res)
    {
        console.log('Competition Publish')

        //Model Instance
        var competition = Models.competition
        var competition_id = req.params.competition_id
        var competition_upd = req.body
        var upd_published = false
        console.log('------------------------------')
        console.log('Competition Update')
        console.log('name: ', competition_upd.name)
        console.log('description: ', competition_upd.description)
        console.log('discipline_id: ', competition_upd.discipline_id)
        console.log('subdiscipline_id: ', competition_upd.subdiscipline_id)
        console.log('competition_type_id: ', competition_upd.competition_type_id)
        console.log('is_published: ', competition_upd.is_published)
        console.log('------------------------------')
        // Obtengo los datos de la competition antes de actualizar
        Models.competition
        .where({'id':competition_id})
        .fetch()
        .then(function (result)
        {
            var new_is_published = competition_upd.is_published
            var old_is_published = result.attributes.is_published

            // Se hace el update de la competition
            Knex('competitions')
            .where('id','=',competition_id)
            .where('active','=',1)
            .update(competition_upd, ['id'])
            .then(function(result){
                if (result.length != 0)
                {
                    // Se verifica si se modifico el estado de la competition como publicada
                    if(new_is_published != old_is_published)
                    {
                        var fullUrl = process.env.COMPETITION_PORTAL_URL + '/' + competition_id
                        console.log('Envio de email de actualizacion de la competition ' + fullUrl) 
                    
                        Models.user
                        .where('active',true)
                        .fetchAll().then(function (result) {
                            //console.log('Result:', result)
                            var us = result.map(userMap)
                            // console.log('Users email:', us.reduce(userReduce))
                            for (var i = us.length - 1; i >= 0; i--) {
                                send_email_from(us[i], 'Competition is published has changed!', 'Competition is published has changed to ' +  competition_upd.is_published + '\n' +
                                        'Puede ver su portal en ' + fullUrl)
                            }

                        }).catch(function(err){
                            console.log(`Error: ${err}`);
                        });
                    }
                    Message(res, 'Success', '0', result)
                } else {
                    console.log(`{error: ${error}}`)
                    Message(res, 'Username or email not found', '404', result)
                }
            })
            .catch(function(err){
                console.log(`error: ${err}`)
              Message(res, err.detail, err.code, null);
            });
        })

    });

    return router;
});
