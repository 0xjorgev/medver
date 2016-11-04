/**
 * Created by Francisco on 04/11/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./category_group_phase_team'], function (DB) {

    var Status_type = DB.Model.extend({
        tableName: 'status_types'
        ,hasTimestamps: true
        //Relations
        ,category_group_phase_team: function(){
            return this.hasMany('Category_group_phase_team', 'status_id');
        }
    });

    // uses Registry plugin
    return DB.model('Status_type', Status_type);
});