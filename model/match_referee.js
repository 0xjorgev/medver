if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './match', './user'], function (DB) {

    var Match_referee = DB.Model.extend({
        tableName: 'matches_referees',
        hasTimestamps: true,

        //relations
        match: function(){
            return this.belongsTo('Match', 'match_id');
        },

        user: function(){
            return this.belongsTo('User', 'user_id');
        }
    });

    // uses Registry plugin
    return DB.model('Match_referee', Match_referee);
});