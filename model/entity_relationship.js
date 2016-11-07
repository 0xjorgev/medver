if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './relationship_type']
    ,function (DB) {
    var Entity_relationship = DB.Model.extend({
        tableName: 'entities_relationships'
        ,hasTimestamps: true
        ,relationship_type: function(){
          return this.belongsTo('Relationship_type', 'relationship_type_id');
        }
        ,from: function(){
          return this.belongsTo('Entity','ent_ref_from_id');
        }
        ,to: function(){
          return this.belongsTo('Entity','ent_ref_to_id');
        }
    });

    // uses Registry plugin
    return DB.model('Entity_relationship', Entity_relationship);
});
