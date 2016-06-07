/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./category'], function (DB) {

    var Clasification = DB.Model.extend({
        tableName: 'clasifications_types',
        hasTimestamps: true,

        //relations

        category_season: function(){
            return this.hasMany('category_season');
        }
    });

    // uses Registry plugin
    return DB.model('Clasification', Clasification);
});