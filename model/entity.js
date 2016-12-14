if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
    ,'./team'
    ,'./user'
    ,'./category'
    ,'./entity_type'
    ,'./feed_item'
    ,'./entity_relationship' ]
    ,(DB, Team, User, Category, Entity_type, Entity_relationship) => {
    var Entity = DB.Model.extend({
        tableName: 'entities'
        ,hasTimestamps: true
        ,entity_type: function(){
            return this.belongsTo('Entity_type', 'entity_type_id');
        }
        ,object: function() {
            return this.morphTo('object'
				//listado de objetos que tienen entidades asociadas
				,'User'
				,'Team'
				,'Category'
				,'Feed_item'
				,'Match')
        }
        ,related_from: function() {
          return this.hasMany('Entity_relationship', 'ent_ref_from_id');
        }
		,related_to: function(){
			return this.hasMany('Entity_relationship', 'ent_ref_to_id');
		}
		//solo unos alias, para facilitar el razonamiento del codigos
		//son copias de las dos relaciones anteriores
        ,entities_related: function() {
          return this.hasMany('Entity_relationship', 'ent_ref_from_id');
        }
        ,entities_related_to: function(){
          return this.hasMany('Entity_relationship', 'ent_ref_to_id');
        }
    });

    return DB.model('Entity', Entity);
});
