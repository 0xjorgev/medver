if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model'
        ,'../util/logger_util'
    ], function (DB
        ,logger
        ) {
	var Person = DB.Model.extend({
		tableName: 'persons'
		,hasTimestamps: true
		//relations
		,gender: function(){
			return this.belongsTo('Gender', 'gender_id');
		}
        ,status: function(){
            return this.belongsTo('Status_type', 'status_type_id');
        }
        ,entity : function(){
          return this.morphOne('Entity', 'object');
        }
	},
    {
        findOrCreate: function(_p){
            let person = {}
            let newPerson = {}
            //Creamos el person
            if(_p.first_name !== undefined && _p.first_name !== null) person.first_name = _p.first_name.trim()
            if(_p.last_name !== undefined && _p.last_name !== null) person.last_name = _p.last_name.trim()
            if(_p.nickname !== undefined && _p.nickname !== null) person.nickname  = _p.nickname.trim()
            if(_p.birthday !== undefined && _p.birthday !== null) person.birthday = _p.birthday
            if(_p.email !== undefined && _p.email !== null) person.email = _p.email.trim()
            if(_p.gender_id !== undefined && _p.gender_id !== null) person.gender_id = _p.gender_id
            if(_p.height !== undefined && _p.height !== null) person.height = _p.height
            if(_p.weight !== undefined && _p.weight !== null) person.weight = _p.weight
            if(_p.status_type_id !== undefined && _p.status_type_id !== null) 
                person.status_type_id = _p.status_type_id
            if(_p.img_url !== undefined && _p.img_url !== null) person.img_url = _p.img_url.trim()
            if(_p.document_number !== undefined && _p.document_number !== null)
                person.document_number = _p.document_number.trim()
            if(_p.document_img_url !== undefined && _p.document_img_url !== null)
                person.document_img_url = _p.document_img_url.trim()
            if(_p.nationality !== undefined && _p.nationality !== null) person.nationality = _p.nationality
            if(_p.meta !== undefined && _p.meta !== null) person.meta = _p.meta
            if(_p.claimed !== undefined && _p.claimed !== null) person.claimed = _p.claimed
            if(_p.active !== undefined && _p.active !== null) person.active = _p.active

            logger.debug(person)
            return DB._models.Person
                .where({email: person.email})
                .fetch()
            .then(_result => {
                //Si encontramos una persona que corresponda con el mismo correo
                if(_result != undefined)
                {
                    return _result
                }
                //Si no existe  el jugador lo creamos
                else
                {
                    return new DB._models.Person(person)
                    .save()
                }
            })
            .then(result => {
                newPerson = result.toJSON()
                //Se crea un objeto entidad
                let entity = {}
                entity.object_id = newPerson.id
                entity.object_type = 'persons'

                return DB._models.Entity.findOrCreate(entity)
            })
            .then(_result => {
                return DB._models.Person
                        .where({id: newPerson.id})
                        .fetch({withRelated: ['entity']})
            })
        }

        ,updatePerson: function(_p){
            let person = {}

            //Creamos el person
            if(_p.id !== undefined && _p.id !== null) person.id = _p.id
            if(_p.first_name !== undefined && _p.first_name !== null) person.first_name = _p.first_name.trim()
            if(_p.last_name !== undefined && _p.last_name !== null) person.last_name = _p.last_name.trim()
            if(_p.nickname !== undefined && _p.nickname !== null) person.nickname  = _p.nickname.trim()
            if(_p.birthday !== undefined && _p.birthday !== null) person.birthday = _p.birthday
            if(_p.email !== undefined && _p.email !== null) person.email = _p.email.trim()
            if(_p.gender_id !== undefined && _p.gender_id !== null) person.gender_id = _p.gender_id
            if(_p.height !== undefined && _p.height !== null) person.height = _p.height
            if(_p.weight !== undefined && _p.weight !== null) person.weight = _p.weight
            if(_p.status_type_id !== undefined && _p.status_type_id !== null) 
                person.status_type_id = _p.status_type_id
            if(_p.img_url !== undefined && _p.img_url !== null) person.img_url = _p.img_url.trim()
            if(_p.document_number !== undefined && _p.document_number !== null)
                person.document_number = _p.document_number.trim()
            if(_p.document_img_url !== undefined && _p.document_img_url !== null)
                person.document_img_url = _p.document_img_url.trim()
            if(_p.nationality !== undefined && _p.nationality !== null) person.nationality = _p.nationality
            if(_p.meta !== undefined && _p.meta !== null) person.meta = _p.meta
            if(_p.claimed !== undefined && _p.claimed !== null) person.claimed = _p.claimed
            if(_p.active !== undefined && _p.active !== null) person.active = _p.active

            return new DB._models.Person(person).save()
            .then(_result => {
                return DB._models.Person
                    .where({id: person.id})
                    .fetch({withRelated: ['entity']})
            })
        }
    })

	// uses Registry plugin
	return DB.model('Person', Person);
});