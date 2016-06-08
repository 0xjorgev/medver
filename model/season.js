/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./competition', './category'], function (DB) {

    var Season = DB.Model.extend({
        tableName: 'seasons',
        hasTimestamps: true,

        //relations
        // competition: function(){
        //     return this.belongsTo('Competition', 'competition_id');
        // },

        categories: function(){
            return this.hasMany('Category');
        }
    });
    // uses Registry plugin
    return DB.model('Season', Season);
});