/**
 * Created by george on 07/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], function (DB) {

    var Country = DB.Model.extend({
        tableName: 'countries',
        hasTimestamps: true

    });
    //solving unable to resolve host ip-10-0-0-187
    // uses Registry plugin
    return DB.model('Country', Country);
});