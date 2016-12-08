/**
 * Created by George on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
	'./util'
    ,'./discipline'
    ,'./subdiscipline'
    ,'./user'
    ,'./competition'
    ,'./season'
    ,'./category'
    ,'./gender'
    ,'./competition_type'
    ,'./contact'
    ,'./phase'
    ,'./group'
    ,'./round'
    ,'./match'
    ,'./team'
    ,'./classification'
    ,'./player_team'
    ,'./event'
    ,'./event_match_player'
    ,'./match_referee'
    ,'./category_type'
    ,'./category_group_phase_team' //<- esta es la famosa spider table
    ,'./competition_user'
    ,'./player'
    ,'./rule'
    ,'./match_team_player'
    ,'./organization'
    ,'./position'
    ,'./category_team_player'
    ,'./standing_table'
    ,'./entity'
    ,'./entity_relationship'
    ,'./status_type'
    ,'./entity_request'
], function (Util
	, Discipline
	, Subdiscipline
	, User
	, Competition
	, Season
	, Category
	, Gender
	, Competition_type
	, Contact
	, Phase
	, Group
	, Round
	, Match
	, Team
	, Classification
	, Player_team
	, Event
	, Event_match_player
	, Match_referee
	, Category_type
	, Category_group_phase_team
	, Competition_user
	, Player
	, Rule
	, Match_team_player
	, Organization
	, Position
	, Category_team_player
	, StandingTable
	, Entity
	, Entity_relationship
	, Status_type
	, Entity_request){
    return {
    	util:Util
    	,user:User
    	,discipline:Discipline
        ,subdiscipline: Subdiscipline
        ,competition: Competition
        ,season: Season
        ,category: Category
        ,gender: Gender
        ,competition_type: Competition_type
        ,contact:Contact
        ,phase:Phase
        ,group:Group
        ,round:Round
        ,match:Match
        ,team:Team
        ,classification:Classification
        ,player_team:Player_team
        ,event:Event
        ,event_match_player:Event_match_player
        ,match_referee:Match_referee
        ,category_type:Category_type
        ,category_group_phase_team:Category_group_phase_team
        ,competition_user:Competition_user
        ,player:Player
        ,rule:Rule
        ,match_team_player:Match_team_player
        ,organization:Organization
        ,position:Position
        ,category_team_player:Category_team_player
		,standing_table: StandingTable
        ,entity: Entity
        ,entity_relationship: Entity_relationship
        ,status_type: Status_type
        ,entity_request: Entity_request
    };
});
