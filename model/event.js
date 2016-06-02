/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './subdiscipline', './event_match_player'], function (DB) {

    var Event = DB.Model.extend({
        tableName: 'events',
        hasTimestamps: true,

        // relations
        subdiscipline: function(){
            return this.belongsTo('Subdiscipline', 'subdiscipline_id');
        },

        result: function(){
            return this.hasMany('Event_match_player');
        }
    });

    // uses Registry plugin
    return DB.model('Event', Event);
});