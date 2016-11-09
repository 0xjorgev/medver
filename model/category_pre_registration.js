/**
 * Created by Francisco on 08/11/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './category', './team', './status_type'], function (DB) {

    var Category_group_phase_team = DB.Model.extend({
        tableName: 'categories_pre_registrations',
        hasTimestamps: true,

        team: function(){
            return this.belongsTo('Team', 'team_id');
        },

        category: function(){
            return this.belongsTo('Category', 'category_id');
        },

        status_type: function(){
            return this.belongsTo('Status_type', 'status_id');
        }

    });

    // uses Registry plugin
    return DB.model('Category_pre_registration', Category_pre_registration);
});
