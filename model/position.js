/**
 * Created by Francisco on 29/07/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './subdiscipline'], function (DB) {

    var Position = DB.Model.extend({
        tableName: 'positions',
        hasTimestamps: true,

        // relations
        subdisciplines: function(){
            return this.belongsTo('Subdiscipline');
        },

        player: function(){
            return this.belongsTo('Player');
        }
    });

    // uses Registry plugin
    return DB.model('Position', Position);
});