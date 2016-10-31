/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './team', './user', './entity_relationship'], function (DB) {

    var Entity = DB.Model.extend({
        tableName: 'entities',
        hasTimestamps: true,

        //relations
        // competition n:m
        // organizations: function(){
        //     return this.hasMany('Organization');
        // }

        object_id: function(){
            return this.morphTo('object_id', User, Team);
        },

        ent_ref_from_id: function(){
          return this.hasMany('Entity_relationship', 'ent_ref_from_id');
        }
        //
        // ent_ref_to_id: function(){
        //   return this.hasMany('Entity_relationship', 'ent_ref_to_id');
        // }
    });

    // uses Registry plugin
    return DB.model('Entity', Entity);
});
