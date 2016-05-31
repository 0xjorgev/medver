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
        groups:  function(){
            return this.hasMany('Group');
        }

        // next: function(){
        //     return this.belongsTo('Phase');
        // },

        // previous: function(){
        //     return this.belongsTo('Phase');
        // }

    });

    // uses Registry plugin
    return DB.model('Phase', Phase);
});