if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './round', './event_match_player'], function (DB) {

    var Match = DB.Model.extend({
        tableName: 'matches',
        hasTimestamps: true,
        initialize: function() {
            this.on('saving', this.validate, this);
        },

        validations: {
            round_id: ['required', 'numeric','greaterThan:0'],
            number: ['required', 'numeric','greaterThan:0']
        },

        validate: function(model, attrs, options) {
            return DB.checkit(this.validations).run(this.toJSON());
        },

        //relations
        round: function(){
            return this.belongsTo('Round', 'round_id');
        },

        home_team: function(){
            return this.belongsTo('Team', 'home_team_id');
        },

        visitor_team: function(){
            return this.belongsTo('Team', 'visitor_team_id');
        },

        result: function(){
            return this.hasMany('Event_match_player');
        },

        referee: function(){
            return this.hasMany('Match_referee');
        }

        // category: function() {
        //   return this.hasMany('Category_group_phase_team')
        // }
    });

    // uses Registry plugin
    return DB.model('Match', Match);
});
