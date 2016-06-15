/**
 * Created by george on 08/03/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], function (DB) {

    var Rule = DB.Model.extend({
        tableName: 'rules',
        hasTimestamps: true,

    });

    // uses Registry plugin
    return DB.model('Rule', Rule);
});