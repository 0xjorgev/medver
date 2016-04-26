/*

			table.increments('id');
			table.string('name');
			table.integer('position');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('category_id').references('categories.id').index();

*/

/**
 * Created by george on 25/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    console.log('Phases Route');

    //List of competitions
    router.get('/', function (req, res) {

        console.log('Phase List');

        return Models.phase
        .query(function(qb){
            qb.limit(25);
        })
        .fetchAll({withRelated: ['category']} )
        .then(function (result) {
            console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Phase by phase_id
    router.get('/:phase_id', function (req, res) {
        console.log('phase_id List');
         var phase_id = req.params.phase_id;
        return Models.phase
        .where({'id':phase_id})
        .fetch({withRelated: ['category']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Phases by category_id -> Returns array of result
    router.get('/category/:category_id', function (req, res) {
        console.log('/category/:category_id/');
        var category_id = req.params.category_id;
        return Models.phase
        .where({category_id:category_id})
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });


    router.post('/:category_id', function (req, res) {
    	var Phase = Models.phase;
    	var phase_post = req.body;
    	var category_id = req.params.category_id;

    	console.log('Req Values:' + req.body);

    	var name = phase_post.name;
    	var position = phase_post.position;

        console.log('------------------------------');
        console.log(`name:${name}`);
        console.log(`position:${position}`);
        console.log('------------------------------');

        new Phase({
            name: name,
            position: position,
            category_id:category_id
        }).save().then(function(new_phase){
            console.log(`{new_phase: ${new_phase}}`);
            Message(res, 'Success', '0', new_phase);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });

    });


    router.put('/:phase_id', function (req, res) {

        console.log('update /:phase_id');
        //Model Instance
        var Phase = Models.phase;

        var phase_id = req.params.phase_id;
        var phase_upd = req.body;

        // Knex(competition.tableName)
        Knex('phases')
        .where('id','=',phase_id)
        .update(phase_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                console.log(`{error: ${error}}`);
                Message(res, 'Wrong phase_id', '404', result);
            }
        })
        .catch(function(err){
            console.log(`Catch Error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    	// var Phase = Models.phase;
    	// var phase_post = req.body;
    	// var category_id = req.params.category_id;

    	// console.log('Req Values:' + req.body);

    	// var name = phase_post.name;
    	// var position = phase_post.position;

     //    console.log('------------------------------');
     //    console.log(`name:${name}`);
     //    console.log(`position:${position}`);
     //    console.log('------------------------------');

     //    new Phase({
     //        name: name,
     //        position: position,
     //        category_id:category_id
     //    }).save().then(function(new_phase){
     //        console.log(`{new_phase: ${new_phase}}`);
     //        Message(res, 'Success', '0', new_phase);
     //    }).catch(function(error){
     //        console.log(`{error: ${error}}`);
     //        Message(res, error.detail, error.code, null);
     //    });

    });


    // //Competition Contact Update
    // router.post('/:phase_id', function(req, res){

    // });


    // //Phases by Competition_Id -> Returns array of result
    // router.get('/competition/:competition_id', function (req, res) {
    //     console.log('/competition_id/Phases/');
    //     var competition_id = req.params.competition_id;
    //     return Models.season
    //     .where({competition_id:competition_id})
    //     .fetchAll()
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    // router.post('/:competition_id/contact/create', function (req, res) {
    //     console.log('/:competition_id/contact/create');

    //     var Contact = Models.contact;
    //     var contact_post = req.body;
    //     var competition_id = req.params.competition_id;

    //     console.log('Req Values:' + req.body);

    //     var country = contact_post.country;
    //     var state = contact_post.state;
    //     var city = contact_post.city;
    //     var zip_code = contact_post.zip_code;
    //     var phone = contact_post.phone;
    //     var email = contact_post.email;
    //     var website_url = contact_post.website_url;

    //     console.log('------------------------------');

    //     console.log('country: ', contact_post.country);
    //     console.log('state: ', contact_post.state);
    //     console.log('city: ', contact_post.city);
    //     console.log('zip_code: ', contact_post.zip_code);
    //     console.log('phone: ', contact_post.phone);
    //     console.log('email: ', contact_post.email);
    //     console.log('website_url: ', contact_post.website_url);
    //     console.log('competition_id: ', competition_id);

    //     console.log('------------------------------');

    //     new Contact({
    //         country: contact_post.country,
    //         state: contact_post.state,
    //         city:contact_post.city,
    //         zip_code:contact_post.zip_code,
    //         phone:contact_post.phone,
    //         email:contact_post.email,
    //         website_url:contact_post.website_url,
    //         competition_id: competition_id
    //     }).save().then(function(new_contact){
    //         console.log(`{new_contact: ${new_contact}}`);
    //         Message(res, 'Success', '0', new_contact);
    //     }).catch(function(error){
    //         console.log(`{error: ${error}}`);
    //         Message(res, error.detail, error.code, null);
    //     });

    // });

    // //Competition Contact by competition_id
    // router.get('/:competition_id/contact/', function (req, res) {
    //     console.log('/:competition_id/contact/:contact_id');

    //     var competition_id = req.params.competition_id;
    //     return Models.contact
    //     .where('competition_id','=',competition_id)
    //     .fetchAll()
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    // //Competition Contact by contact_id
    // router.get('/:competition_id/contact/:contact_id', function (req, res) {
    //     console.log('/:competition_id/contact/:contact_id');

    //     var competition_id = req.params.competition_id;
    //     var contact_id = req.params.contact_id;

    //     console.log('Req Values:' + req.body);

    //     return Models.contact
    //     .where({competition_id:competition_id, id:contact_id})
    //     .fetch()
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    // //Competition Contact Update
    // router.post('/:competition_id/contact/:contact_id/update', function(req, res){
    //     console.log('/:competition_id/contact/:contact_id/update');
    //     //Model Instance
    //     var Contact = Models.contact;

    //     var competition_id = req.params.competition_id;
    //     var contact_id = req.params.contact_id;
    //     var contact_upd = req.body;

    //     // Knex(competition.tableName)
    //     Knex('contacts')
    //     .where('id','=',contact_id)
    //     .where('competition_id','=',competition_id)
    //     .update(contact_upd, ['id'])
    //     .then(function(result){
    //         if (result.length != 0){
    //             console.log('result is not null');
    //             console.log(`result: ${result[0]}`);
    //             Message(res, 'Success', '0', result);
    //         } else {
    //             console.log(`{error: ${error}}`);
    //             Message(res, 'Wrong Competition_id or contact_id', '404', result);
    //         }
    //     })
    //     .catch(function(err){
    //         console.log(`Catch Error: ${err}`);
    //       Message(res, err.detail, err.code, null);
    //     });
    // });




    // //Create Competition
    // router.post('/create', function (req, res) {

    //     //Model Instance
    //     console.log('Create Competition');
    //     var Competition = Models.competition;
    //     var competition_post = req.body;

    //     console.log('Req Values:' + req.body);

    //     var name = competition_post.name;
    //     var discipline_id = competition_post.discipline_id;
    //     var subdiscipline_id = competition_post.subdiscipline_id;
    //     var competition_type_id = competition_post.competition_type_id;
    //     var description = competition_post.description;

    //     console.log('------------------------------');

    //     console.log('name: ', competition_post.name);
    //     console.log('discipline_id: ', competition_post.discipline_id);
    //     console.log('subdiscipline_id: ', competition_post.subdiscipline_id);
    //     console.log('competition_type_id: ', competition_post.competition_type_id);
    //     console.log('description: ', competition_post.description);
    //     console.log('competition_post: ', competition_post);

    //     console.log('------------------------------');

    //     new Competition({
    //         name: name,
    //         description: description,
    //         discipline_id:discipline_id,
    //         subdiscipline_id:subdiscipline_id,
    //         competition_type_id:competition_type_id
    //     }).save().then(function(new_competition){
    //         console.log(`{new_competition: ${new_competition}}`);
    //         Message(res, 'Success', '0', new_competition);
    //     }).catch(function(error){
    //         console.log(`{error: ${error}}`);
    //         Message(res, error.detail, error.code, null);
    //     });
    // });

    // //Competition Update
    // router.post('/:competition_id/update', function(req, res){

    //     console.log('Competition Update');
    //     //Model Instance
    //     var competition = Models.competition;

    //     var competition_id = req.params.competition_id;
    //     var competition_upd = req.body;

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

    return router;
});