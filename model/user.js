if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model','./entity', './organization'],
	function (DB, Entity) {
    var User = DB.Model.extend({

		//implementar esto para retornar siempre las relaciones
		//https://github.com/tgriesser/bookshelf/issues/601

		initialize: function(){
			this.on('created', attrs => {
				// this.set('number', 99)
				new DB._models.Entity({
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
		return u
	}
	// uses Registry plugin
	return DB.model('User', User);
});
