if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './team', './user', './entity_relationship'], function (DB) {

    var Entity = DB.Model.extend({
        tableName: 'entities',
        hasTimestamps: true,

        entity_type: function(){
            return this.belongsTo('Entity_type', 'entity_type_id');
        }

        // object_id: () => {
        //     return this.morphTo('object_id', User, Team);
        // },
        // ent_ref_from_id: () => {
        //   return this.hasMany('Entity_relationship', 'ent_ref_from_id');
        // },
        // ent_ref_to_id: () => {
        //   return this.hasMany('Entity_relationship', 'ent_ref_to_id');
        // }
    });

    return DB.model('Entity', Entity);
});
