/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './user', './competition'], function (DB) {

    var Competition_user = DB.Model.extend({
        tableName: 'competitions_users',
        hasTimestamps: true,

        //relations
        // user n:m
        // organization n:m
        /*
            table.integer('discipline_id').references('disciplines.id').index();
            table.integer('subdiscipline_id').references('subdisciplines.id').index();
            table.integer('competition_type').references('competitions_types.id').index();

        */
        competitions: function(){
            return this.belongsTo('Competition', 'competition_id');
        },

        users: function(){
            return this.belongsTo('User', 'user_id');
        }
    });

    // uses Registry plugin
    return DB.model('Competition_user', Competition_user);
});