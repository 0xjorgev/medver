if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model'
	,'../util/logger_util'
	,'./entity'
	,'lodash'
	,'./organization'],
	(DB
	,logger
	,Entity
	,_ ) => {
		var User = DB.Model.extend({
		initialize: function(){
			this.on('created', attrs => {
				// this.set('number', 99)
				return new DB._models.Entity({
					object_type: 'users'
					,object_id: this.id
				})
				.save()
			})
		}
		,tableName: 'users'
		,hidden: ['password']
		,hasTimestamps: true
		,referee: function(){
			return this.hasMany('Match_referee');
		}
		,competition_user: function(){
			return this.hasMany('Competition_user','user_id');
		}
		,entity : function(){
			return this.morphOne('Entity', 'object');
		}
		,getEntities: function(){
			let user = this
			let u = Object.assign({}, this)
			u.entity_id = user.entity.id

			if(user.entity
				&& user.entity.related_from
				&& user.entity.related_from.length > 0){
				u.related_entities = user
				.entity
				.related_from
				.map(r => {
					let stuff = Object.assign({},r.to.object)
					stuff.relationship_type = r.relationship_type.name
					stuff.object_type = r.to.object_type
					stuff.entity_id = r.ent_ref_to_id
					delete stuff.to
					return stuff
				})
			}
			delete u.entity
			return u
		}
		,roles: function(){
			const user = this.toJSON()
			if(user.entity
				&& user.entity.related_from
				&& user.entity.related_from.length > 0){

				//BEGIN OF ROLE PROCESSING FROM HELL
				//se obtienen todas las relaciones que tiene el user con otras
				//entidades
				const _roles = _(user.entity.related_from)
				.map(r => {
					let stuff = {}
					stuff.id = r.to.object_id
					stuff.role = r.relationship_type.name.toLowerCase()
					stuff.type = r.to.object_type
					return stuff
				})
				//se agrupan las relaciones por 'Rol', es decir, el tipo de relacion
				.groupBy('role').value()

				//ahora se agrupan x tipo de entidad
				Object.keys(_roles).forEach(role => {
					let tmp = _(_roles[role]).groupBy('type').value()

					//se extraen los ids de cada una de las entidades
					Object.keys(tmp).map(type => {
						tmp[type] = tmp[type].map(elem => elem.id )
					})
					_roles[role] = tmp
				})

				//profit!
				return _roles
			}
			else {
				return []
			}
		}
	});

	//obtiene las entidades asociadas a este usuario
	User.getEntities = (user) => {
		let u = Object.assign({}, user)
		u.entity_id = user.entity.id

		if(user.entity
			&& user.entity.related_from
			&& user.entity.related_from.length > 0){
			u.related_entities = user
			.entity
			.related_from
			.map(r => {
				let stuff = Object.assign({},r.to.object)
				stuff.relationship_type = r.relationship_type.name
				stuff.object_type = r.to.object_type
				stuff.entity_id = r.ent_ref_to_id
				delete stuff.to
				return stuff
			})
		}
		delete u.entity

		if(!u.related_entities)
			u.related_entities = []

		return u
	}
	// uses Registry plugin
	return DB.model('User', User);
});
