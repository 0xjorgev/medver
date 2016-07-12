if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util','../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

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



    return router;
});
