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

    //TODO: Esto parece no estar en uso, deberia arrojar error al probar
    router.post('/:user_id', function (req, res) {

        console.log('Terms & Conditions');
        //Model Instance
        var Term        = Models.term_condition;
        var user_id     = req.params.user_id;
        new Term(
            {user_id}
        ).save().then(function(new_term){
            console.log(`{new_tearms: ${new_term}}`);
            Message(res, 'Success', '0', new_term);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });

    return router;
});
