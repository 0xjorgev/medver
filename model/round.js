/**
 * Created by george on 27/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./group', './match'], function (DB) {

    var Round = DB.Model.extend({
        tableName: 'rounds',
        hasTimestamps: true,

        //relations
        group: function(){
            return this.belongsTo('Group', 'group_id');
        },

        matches: function(){
            return this.hasMany('Match');
        }
         //
        //  category_rel: function() {
        //    return this.hasMany('Category_group_phase_team')
        //  }
    });

    // uses Registry plugin
    return DB.model('Round', Round);
});
