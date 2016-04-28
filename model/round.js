/**
 * Created by george on 27/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./group'], function (DB) {

    var Round = DB.Model.extend({
        tableName: 'rounds',
        hasTimestamps: true,

        //relations
        group: function(){
            return this.belongsTo('Group', 'group_id');
        }
    });

    // uses Registry plugin
    return DB.model('Round', Round);
});