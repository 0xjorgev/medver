/**
 * Created by Francisco on 03/03/2017events_calendars_types_id.
**/
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
,'./index'
,'../util/logger_util'
,'./entity'
]
, (DB, Models, logger) => {
    var Event_calendar = DB.Model.extend({
        tableName: 'events_calendars'
        ,hasTimestamps: true
        ,initialize: function() {

			this.on('fetched', () => {
				const currentRelations = Object.keys(this.relations)
				//Este if se coloca en el caso de que se solicite la relacion, en la consulta y no se sobreescriba
				// if(currentRelations.indexOf('home_team') < 0 && currentRelations.indexOf('visitor_team') < 0)
				// 	return this.load(['home_team','visitor_team'])
			})
		}

		,entity: function(){
			return this.morphOne('Entity', 'object');
		}
		,event_calendar: function(){
			return this.morphOne('Event_Calendar', 'events_calendars_types_id');
		}
	}
	,{
        //metodos
        //saveEventCalendar un club y sus relaciones con un usuario
        saveEventCalendar: function(_eventCalendar){
        	var _currentUser = _eventCalendar._currentUser

			var data = {}
			if (_eventCalendar.title != undefined) data.title = _eventCalendar.title.trim()
			if (_eventCalendar.start_at != undefined) data.start_at = _eventCalendar.start_at
			if (_eventCalendar.end_at != undefined) data.end_at = _eventCalendar.end_at
			if (_eventCalendar.place != undefined) data.place = _eventCalendar.place
			if (_eventCalendar.comment != undefined) data.comment = _eventCalendar.comment
			if (_eventCalendar.active != undefined) data.active = _eventCalendar.active
			if (_eventCalendar.events_calendars_types_id != undefined) data.events_calendars_types_id = _eventCalendar.events_calendar_types_id
			if (_eventCalendar.id != undefined) data.id = _eventCalendar.id

			//para asociar las entidades
			var eventCalendarEntity = null
			var userEntity = null

			return new DB._models.EventCalendar(data).save()
			.then(result => {
				_eventCalendar.id = result.attributes.id
				//se obtienen las entidades del eventCalendar y del user en un solo query
				return DB._models.Entity
				.query(qb => {
					qb.where({object_id: result.attributes.id,
						object_type: 'events_calendars' })
					qb.orWhere({object_id: _currentUser.id})
					qb.where({object_type: 'users'})
				})
				.fetchAll()
			})
			.then(result => {
				var tmp = result.toJSON()
				eventCalendarEntity = tmp.filter(e => e.object_type == 'events_calendars')
				userEntity = tmp.filter(e => e.object_type == 'users')
				//la entidad usuario *debe* estar creada para este punto,
				//o bien no sería usuario válido
				//si no se obtiene una entidad para el eventCalendar, se crea
				if(eventCalendarEntity.length == 0){
					//si no se encuentra una entidad asociada al equipo, se crea una nueva
					return new DB._models.Entity({
							object_id: _eventCalendar.id
							,object_type: 'events_calendars'})
							.save()
				}
				return result
			})
			.then(result => {
				if (_eventCalendar.id) {
					// los siguientes bloques de promises solo aplican cuando se está
					// creando el eventCalendar.
					// en caso de actualización, simplemente se retorna
					// el resultado del update y se termina el servicio
					//TODO: los bloques anteriores no son necesarios cuando se hace update. fix!
					return result
				}
				else{
					// En caso de que la entidad eventCalendar se haya creado en el promise anterior
					// se asigna a eventCalendarEntity
					if(eventCalendarEntity == null || eventCalendarEntity.length == 0)
						eventCalendarEntity = result.toJSON()

					// En caso de que sea una operación POST
					// se asocia el usuario que se está creando
					// con el eventCalendar como owner del mismo
					return new DB._models.Entity_relationship({
						ent_ref_from_id: userEntity[0].id
						,ent_ref_to_id: clubEntity.id
						,relationship_type_id: 1
						,comment: 'OWNER'
					}).save()
				}
			})
			.then(result => {
				return DB._models.EventCalendar
				.where({id:_eventCalendar.id})
				.fetch()
			})
	    }
    })

	// uses Registry plugin
	return DB.model('Event_calendar', Event_calendar);
});