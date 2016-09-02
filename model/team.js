/*

			table.string('name');
			table.string('logo_url');
			table.string('short_name');
			table.string('description');
			table.integer('category_id').references('categories.id').index();
			table.integer('organization_id').references('organizations.id').index();

*/

/**
 * Created by george on 27/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './category_type', './organization', './player_team', './category_group_phase_team', 
    './subdiscipline', './gender'], function (DB) 
{

    var Team = DB.Model.extend({
        tableName: 'teams',
        hasTimestamps: true,

        // relations
        category_type: function(){
            return this.belongsTo('Category_type', 'category_type_id');
        },
        
        subdiscipline: function(){
            return this.belongsTo('Subdiscipline', 'subdiscipline_id');
        },

        gender: function(){
            return this.belongsTo('Gender', 'gender_id');
        },

        organization: function(){
            return this.belongsTo('Organization', 'organization_id');
        },

        player_team: function(){
            return this.hasMany('Player_team', 'team_id');
        },

        category_group_phase_team: function(){
            return this.hasMany('Category_group_phase_team', 'team_id');
        },

        match_player_team: function(){
            return this.hasMany('Match_team_player', 'team_id');
        },

        summoned: function(){
            return this.hasMany('Category_team_player', 'team_id');
        }

        // player: function(){
        //     return this.hasMany('Player');
        // }
    });

    // uses Registry plugin
    return DB.model('Team', Team);
});
