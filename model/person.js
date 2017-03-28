if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model','./gender'], function (DB) {
	var Person = DB.Model.extend({
		tableName: 'persons'
		,hasTimestamps: true

		//relations
		,gender: function(){
			return this.belongsTo('Gender', 'gender_id');
		}
		// ,player: function(){
		// 	return this.hasMany('Player', 'person_id');
		// }
	},{
        //metodos
        //savePerson permite salvar a una persona
        savePerson: function(_person){
            let personData = {}
            if (_person.name != undefined) personData.name = _person.name.trim()
            if (_person.last_name != undefined) personData.last_name = _person.last_name.trim()
            if (_person.birthday != undefined) personData.birthday = _person.birthday
            if (_person.email != undefined) personData.email = _person.email
            if (_person.height != undefined) personData.height = _person.height
            if (_person.weight != undefined) personData.weight = _person.weight
            if (_person.gender_id != undefined) personData.gender_id = _person.gender_id
            if (_person.img_url != undefined) personData.img_url = _person.img_url
            if (_person.document_number != undefined) personData.document_number = _person.document_number
            if (_person.document_img_url != undefined) personData.document_img_url = _person.document_img_url
            if (_person.country != undefined) personData.country = _person.country
            if (_person.claimed != undefined) personData.claimed = _person.claimed
            if (_person.active != undefined) personData.active = _person.active
            if (_person.id != undefined) personData.id = _person.id

            //Se salva la persona
        	return new DB._models.Person(personData).save()	
            .then(result => {
            	personData.id = result.attributes.id
                //return the complete information of the person
                return DB._models.Person
                .where({id:personData.id})
                .fetch({withRelated: ['gender']})
            })
        }
    })

	// uses Registry plugin
	return DB.model('Person', Person);
});