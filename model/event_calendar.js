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
        	let _currentUser = _eventCalendar._currentUser

			//para asociar las entidades
			let eventCalendarEntity = null
			let userEntity = null
			let entityParent = null
			let saveEventCalendar = null
			let data = {}

			if (_eventCalendar.title != undefined) data.title = _eventCalendar.title
			if (_eventCalendar.startsAt != undefined) data.startsAt = _eventCalendar.startsAt
			if (_eventCalendar.endsAt != undefined) data.endsAt = _eventCalendar.endsAt
			if (_eventCalendar.place != undefined) data.place = _eventCalendar.place
			if (_eventCalendar.comment != undefined) data.comment = _eventCalendar.comment
			if (_eventCalendar.active != undefined) data.active = _eventCalendar.active
			if (_eventCalendar.events_calendars_types_id != undefined) data.events_calendars_types_id = _eventCalendar.events_calendar_types_id
			if (_eventCalendar.id != undefined) data.id = _eventCalendar.id
			if (_eventCalendar.entityParent != undefined) entityParent = _eventCalendar.entityParent

			//Salvamos el evento del calendario
			return new DB._models.Event_calendar(data).save()
			.then(result => {
				saveEventCalendar = result
				//se busca la entidad del eventCalendar
				return DB._models.Entity
				.query(qb => {
					qb.where({object_id: result.attributes.id,
						object_type: 'events_calendars' })
				})
				.fetchAll()
			})
			.then(result => {
				var tmp = result.toJSON()
				logger.debug('tmp', tmp)
				eventCalendarEntity = tmp.filter(e => e.object_type == 'events_calendars')
				//si no se obtiene una entidad para el eventCalendar, se crea
				if(eventCalendarEntity.length == 0){
					//si no se encuentra una entidad asociada al equipo, se crea una nueva
					return new DB._models.Entity({
							object_id: saveEventCalendar.id
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
						ent_ref_from_id: result.id
						,ent_ref_to_id: entityParent.id
						,relationship_type_id: 8
						,comment: 'EVENT CALENDAR OF'
					}).save()
				}
			})
			.then(result => {
				logger.debug('saveEventCalendar.id',saveEventCalendar.id)
				return DB._models.Event_calendar
				.where({id:saveEventCalendar.id})
				.fetch({withRelated: [
                    ,'entity.related_from'
                    ,'entity.related_to' 
                    ]})
			})
	    }
    })

	// uses Registry plugin
	return DB.model('Event_calendar', Event_calendar);
});