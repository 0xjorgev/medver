if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './round'], function (DB) {

    var Match = DB.Model.extend({
        tableName: 'matches',
        hasTimestamps: true,

        //relations
        round: function(){
            return this.belongsTo('Round', 'round_id');
        }
    });

    // uses Registry plugin
    return DB.model('Match', Match);
});