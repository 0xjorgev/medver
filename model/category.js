/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./gender','./season'], function (DB) {

    var Category = DB.Model.extend({
        tableName: 'categories',
        hasTimestamps: true,

        //relations
        // user n:m
        // organization n:m

        gender: function(){
            return this.belongsTo('gender');
        },

        season: function(){
            return this.belongsTo('season');
        }
    });

    // uses Registry plugin
    return DB.model('Category', Category);
});