if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
	,'./entity'
	,'./category_type'
	,'./organization'
	,'./player_team'
	,'./category_group_phase_team'
	,'./subdiscipline'
	,'./gender'
	], (DB, Entity) => {

    var Team = DB.Model.extend({
        tableName: 'teams',
        hasTimestamps: true,

        // relations
        category_type: function(){
            return this.belongsTo('Category_type', 'category_type_id');
        }
		,subdiscipline: function(){
            return this.belongsTo('Subdiscipline', 'subdiscipline_id');
        }
		,gender: function(){
            return this.belongsTo('Gender', 'gender_id');
        }
		,organization: function(){
            return this.belongsTo('Organization', 'organization_id');
        }
		,player_team: function(){
            return this.hasMany('Player_team', 'team_id');
        }
		,category_group_phase_team: function(){
            return this.hasMany('Category_group_phase_team', 'team_id');
        }
		,match_player_team: function(){
            return this.hasMany('Match_team_player', 'team_id');
        }
		,summoned: function(){
            return this.hasMany('Category_team_player', 'team_id');
        }
		,entity : function(){
          return this.morphMany(Entity, 'object');
        }
    });

    // uses Registry plugin
    return DB.model('Team', Team);
});
