/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./category'], function (DB) {

    var Classification = DB.Model.extend({
        tableName: 'classifications_types',
        hasTimestamps: true,

        //relations

        category: function(){
            return this.hasMany('category');
        }
    });

    // uses Registry plugin
    return DB.model('Classification', Classification);
});