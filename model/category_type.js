/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './category'], function (DB) {

    var Category_type = DB.Model.extend({
        tableName: 'categories_types',
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
            return this.hasMany('Category');
        }
    });

    // uses Registry plugin
    return DB.model('Category_type', Category_type);
});