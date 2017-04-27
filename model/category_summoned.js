/**
 * Created by Francisco on 2017/04/27.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model' ], function (DB) {

    var Category_summoned = DB.Model.extend({
        tableName: 'category_summond'
        ,hasTimestamps: true
        ,player: function(){ return this.belongsTo('Player', 'player_id'); }
        ,category: function(){ return this.belongsTo('Category', 'category_id'); }
        ,team: function(){ return this.belongsTo('Team', 'team_id'); }
    });

    // uses Registry plugin
    return DB.model('Category_summoned', Category_summoned);
});
