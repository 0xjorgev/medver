if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model']
    ,function (DB) {
    var Entity_request = DB.Model.extend({
        tableName: 'entities_requests'
        ,hasTimestamps: true
        
        ,from: function(){
          return this.belongsTo('Entity','ent_ref_from_id');
        }
        ,to: function(){
          return this.belongsTo('Entity','ent_ref_to_id');
        }
        ,status_type: function(){
          return this.belongsTo('Status_type','status_id');
        }
    });

    // uses Registry plugin
    return DB.model('Entity_request', Entity_request);
});