/**
 * Created by george on 13/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './competition'], function (DB) {

    var Contact = DB.Model.extend({
        tableName: 'contacts',
        hasTimestamps: true,

        // relations
        competition: function(){
            return this.belongsTo('Competition', 'competition_id');
        }
    });

    // uses Registry plugin
    return DB.model('Contact', Contact);
});