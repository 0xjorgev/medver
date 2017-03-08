/**
 * Created by Francisco on 03/03/2017.
**/

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
		,'./index'
		,'../util/logger_util'], function (DB) {

    var Event_calendar_type = DB.Model.extend({
        tableName: 'events_calendars_types'
        ,hasTimestamps: true
        ,event_calendar:  function(){
            return this.hasMany('Event_calendar');
        }
    });

    // uses Registry plugin
    return DB.model('Event_calendar_type', Event_calendar_type);
});