if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
,'./index'
,'../util/logger_util'
,'./entity'
]
, (DB, Models, logger) => {
    var Club = DB.Model.extend({
        tableName: 'clubs'
        ,hasTimestamps: true
        ,initialize: function() {
            this.on('saving', this.validate, this);

			this.on('created', match => {
				// // everytime that a club is create will create his entity relation
				// const entity =
				// 	new DB._models.Entity({
				// 		object_type: 'clubs'
				// 		,object_id: this.id
				// 	})
				// entity.save()
			}, this)

			this.on('fetched', () => {
				const currentRelations = Object.keys(this.relations)
				//Este if se coloca en el caso de que se solicite la relacion, en la consulta y no se sobreescriba
				// if(currentRelations.indexOf('home_team') < 0 && currentRelations.indexOf('visitor_team') < 0)
				// 	return this.load(['home_team','visitor_team'])
			})
		}

		,validations: {
			// round_id: ['required', 'numeric','greaterThan:0']
			// ,number: ['required', 'numeric','greaterThan:0']
		}
		,validate: function(model, attrs, options) {
			return DB.checkit(this.validations).run(this.toJSON());
		}

		,entity: function(){
			return this.morphOne('Entity', 'object');
		}
	},{
        //metodos
        //saveClub un club y sus relaciones con un usuario
        saveClub: function(_club){
        	var _currentUser = _club._currentUser

			var clubData = {}
			if (_club.name != undefined) clubData.name = _club.name.trim()
			if (_club.logo_url != undefined) clubData.logo_url = _club.logo_url
			if (_club.portrait_url != undefined) clubData.portrait_url = _club.portrait_url
			if (_club.short_name != undefined) clubData.short_name = _club.short_name
			if (_club.description != undefined) clubData.description = _club.description
			if (_club.active != undefined) clubData.active = _club.active
			if (_club.id != undefined) clubData.id = _club.id

			//para asociar las entidades
			var clubEntity = null
			var userEntity = null

			return new DB._models.Club(clubData).save()
			.then(result => {
				_club.id = result.attributes.id
				//se obtienen las entidades del club y del user en un solo query
				return DB._models.Entity
				.query(qb => {
					qb.where({object_id: result.attributes.id,
						object_type: 'clubs' })
					qb.orWhere({object_id: _currentUser.id})
					qb.where({object_type: 'users'})
				})
				.fetchAll()
			})
			.then(result => {
				var tmp = result.toJSON()

				clubEntity = tmp.filter(e => e.object_type == 'clubs')
				userEntity = tmp.filter(e => e.object_type == 'users')

				//la entidad usuario *debe* estar creada para este punto,
				//o bien no sería usuario válido
				//si no se obtiene una entidad para el club, se crea
				if(clubEntity.length == 0){
					//si no se encuentra una entidad asociada al equipo, se crea una nueva
					return new DB._models.Entity({
							object_id: _club.id
							,object_type: 'clubs'})
							.save()
				}
				return result
			})
			.then(result => {

				if (_club.id) {
					// los siguientes bloques de promises solo aplican cuando se está
					// creando el club.
					// en caso de actualización, simplemente se retorna
					// el resultado del update y se termina el servicio
					//TODO: los bloques anteriores no son necesarios cuando se hace update. fix!
					return result
				}
				else{
					// En caso de que la entidad club se haya creado en el promise anterior
					// se asigna a clubEntity
					if(clubEntity == null || clubEntity.length == 0)
						clubEntity = result.toJSON()

					// En caso de que sea una operación POST
					// se asocia el usuario que se está creando
					// con el club como owner del mismo
					return new DB._models.Entity_relationship({
						ent_ref_from_id: userEntity[0].id
						,ent_ref_to_id: clubEntity.id
						,relationship_type_id: 1
						,comment: 'OWNER'
					}).save()
				}
			})
			.then(result => {
				return DB._models.Club
				.where({id:_club.id})
				.fetch()
			})
	    }
    })

	// uses Registry plugin
	return DB.model('Club', Club);
});
