/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './subdiscipline'], function (DB) {

    var Event = DB.Model.extend({
        tableName: 'contacts',
        hasTimestamps: true,

        // relations
        subdiscipline: function(){
            return this.belongsTo('Subdiscipline', 'subdiscipline_id');
        }
    });

    // uses Registry plugin
    return DB.model('Event', Event);
});