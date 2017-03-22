/**
 * Created by Francisco on 03/03/2017.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], function (DB) {

    var Event_calendar_comment = DB.Model.extend({
        tableName: 'events_calendars_comments'
        ,hasTimestamps: true

        // relations
        ,user: function(){
            return this.hasMany('User', 'user_id');
        }

        ,event_calendar: function(){
            return this.hasMany('Event_calendar', 'event_id');
        }

        ,entity : function(){
          return this.morphOne('Entity', 'object');
        }
    }
    ,{
        //metodos
        //saveEventCalendarComment guarda el comentario de un evento de calendario
        saveEventCalendarComment: function(_eventCalendar){
            var _currentUser = _eventCalendar._currentUser

            var data = {}
            if (_eventCalendar.comment != undefined) data.comment = _eventCalendar.comment
            if (_eventCalendar.user_id != undefined) data.user_id = _eventCalendar.user_id
            if (_eventCalendar.event_id != undefined) data.event_id = _eventCalendar.event_id
            if (_eventCalendar.active != undefined) data.active = _eventCalendar.active
            if (_eventCalendar.id != undefined) data.id = _eventCalendar.id

            return new DB._models.EventCalendar(data).save()
            .then(result => {
                return DB._models.EventCalendar
                .where({id:_eventCalendar.id})
                .fetch()
            })
        }
    })

    // uses Registry plugin
    return DB.model('Event_calendar_comment', Event_calendar_comment);
});
