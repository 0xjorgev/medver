/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./category', './group'], function (DB) {

    var Phase = DB.Model.extend({
        tableName: 'phases',
        hasTimestamps: true,

        //relations
        category: function(){
            return this.belongsTo('Category', 'category_id');
        },
        group:  function(){
            return this.hasMany('Group');
        }
    });

    // uses Registry plugin
    return DB.model('Phase', Phase);
});