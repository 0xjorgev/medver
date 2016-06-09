/**
 * Created by George on 27/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./phase','./round'], function (DB) {

    var Group = DB.Model.extend({
        tableName: 'groups',
        hasTimestamps: true,

        //relations
        phase: function(){
            return this.belongsTo('Phase', 'phase_id');
        },
        rounds: function(){
            return this.hasMany('Round');
        },
        category_group_phase_team: function(){
            return this.hasMany('Category_group_phase_team', 'group_id');
        }
    });

    // uses Registry plugin
    return DB.model('Group', Group);
});