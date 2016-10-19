/**
 * Created by francisco on 17/10/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './Contact'], function (DB) {

    var Contact_type = DB.Model.extend({
        tableName: 'contacts_types',
        hasTimestamps: true,

       
    });

    // uses Registry plugin
    return DB.model('Contacts_types', Contacts_types);
});