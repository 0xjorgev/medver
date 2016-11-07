/**
 * Created by NOBODY_CARES on THIS_IS_WHAT_GIT_IS_FOR.
 */
if (typeof define !== 'function')
    var define = require('amdefine')(module)

define(['./base_model'], function (DB) {

    var model = DB.Model.extend({
        tableName: 'relationships_types'
        ,hasTimestamps: true
    });

    // uses Registry plugin
    return DB.model('Relationship_type', model);
});
