/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./gender','./season', './phase', './clasification', './category'], function (DB) {

    var Category_season = DB.Model.extend({
        tableName: 'categories_seasons',
        hasTimestamps: true,

        // //relations
        category: function(){
            return this.belongsTo('Category', 'category_id');
        },

        gender: function(){
            return this.belongsTo('Gender', 'gender_id');
        },

        season: function(){
            return this.belongsTo('Season', 'season_id');
        },

        clasification:  function(){
            return this.belongsTo('Clasification', 'clasification_type_id');
        },

        phases: function(){
            return this.hasMany('Phase');
        }
    });

    // uses Registry plugin
    return DB.model('Category_season', Category_season);
});