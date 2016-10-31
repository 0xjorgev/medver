/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], function (DB) {

    var Entity_relationship = DB.Model.extend({
        tableName: 'entities_relationships',
        hasTimestamps: true,

        //relations
        // competition n:m
        // organizations: function(){
        //     return this.hasMany('Organization');
        // }

        ent_ref_from_id: function(){
          return this.belongsTo('Entity', 'id');
        },

        ent_ref_to_id: function(){
          return this.belongsTo('Entity', 'id');
        }
    });

    // uses Registry plugin
    return DB.model('Entity_relationship', Entity_relationship);
});
