if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
    ,'./entity_type'
    ,'./entity_relationship' ]
    ,(DB) => {
    var Entity = DB.Model.extend({
        tableName: 'entities'
        ,hasTimestamps: true
        ,entity_type: function(){
            return this.belongsTo('Entity_type', 'entity_type_id');
        }
        ,object: function() {
            return this.morphTo('object', User, Team, Category)
        }
        ,related_from: function() {
          return this.hasMany('Entity_relationship', 'ent_ref_from_id');
        }
        ,related_to: function(){
          return this.hasMany('Entity_relationship', 'ent_ref_to_id');
        }
    });

    return DB.model('Entity', Entity);
});
