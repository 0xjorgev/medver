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
	},{
        //Método para registrar un jugador en una competition tipo tryout
        findOrCreate: function(_user){
        	console.log('Create user')
        	// console.log(_user)
        	let user = {}
			//crear usuario
			if(_user.username !== undefined && _user.username !== null) user.username = _user.username.trim()
			if(_user.password !== undefined && _user.password !== null) user.password = _user.password.trim()
			if(_user.email !== undefined && _user.email !== null) user.email = _user.email.trim();
			if(_user.lang !== undefined && _user.lang !== null) user.lang = "EN";
			let _newUser = {}

        	return DB._models.User
	            .where({email: user.email})
	            .fetch()
	        .then(_result => {
	            //Si el usuario retornamos el usuario
	            if(_result != undefined)
	            {
	                return _result
	            }
	            //Si no existe lo creamos
	            else
	            {
	            	// console.log(user)
			        return new DB._models.User(user)
			        .save()
	            }
	        })
	        .then(result => {
	            _newUser = result.toJSON()
	            //Se crea un objeto entidad
	            let entity = {}
		        entity.object_id = _newUser.id
		        entity.object_type = 'users'
				return DB._models.Entity.findOrCreate(entity)
	        })
	        .then(_result => {
	        	return DB._models.User
					.where({id: _newUser.id})
					.fetch({withRelated: ['entity']})
	        })
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
