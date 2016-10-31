/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './entity'], function (DB) {

    var Entity_relationship = DB.Model.extend({
        tableName: 'entities_relationships',
        hasTimestamps: true,

        //relations
        // competition n:m
        // organizations: function(){
        //     return this.hasMany('Organization');
        // }

        ent_ref_from_id: function(){
          return this.belongsTo('Entity');
        }

        // ent_ref_to_id: function(){
        //   return this.belongsTo('Entity');
        // }
    });

    // uses Registry plugin
    return DB.model('Entity_relationship', Entity_relationship);
});
