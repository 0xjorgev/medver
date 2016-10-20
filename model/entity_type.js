/**
 * Created by Francisco on 19/10/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './entity'], function (DB) {

    var Entity_type = DB.Model.extend({
        tableName: 'entities_types',
        hasTimestamps: true,

        // //relations
        // gender: function(){
        //     return this.belongsTo('Gender', 'gender_id');
        // },

        // season: function(){
        //     return this.belongsTo('Season', 'season_id');
        // },

        // phases: function(){
        //     return this.hasMany('Phase');
        // },

        categories:  function(){
            return this.hasMany('Entity');
        }
    });

    // uses Registry plugin
    return DB.model('Entity_type', Entity_type);
});