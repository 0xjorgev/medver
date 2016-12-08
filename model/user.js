/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./entity', './organization'],
	function (DB, Entity) {
    var User = DB.Model.extend({
        tableName: 'users'
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
