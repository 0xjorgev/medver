/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./category'], function (DB) {

    var Clasification = DB.Model.extend({
        tableName: 'clasification',
        hasTimestamps: true,

        //relations

        // phases: function(){
        //     return this.hasMany('Phase');
        // }
    });

    // uses Registry plugin
    return DB.model('Clasification', Clasification);
});