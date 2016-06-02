/**
 * Created by George on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
	'./util',
    './discipline',
    './subdiscipline',
    './user',
    './competition',
    './season',
    './category',
    './gender',
    './competition_type',
    // './country',
    './contact',
    './phase',
    './group',
    './round',
    './match',
    './team',
    './clasification',
    './player_team',
    './event',
    './event_match_player',
    './Match_referee'

], function (Util, Discipline, Subdiscipline, User, Competition, Season, Category, Gender, Competition_type, Contact, Phase, Group, Round, Match, Team, Clasification, Player_team, Event, Event_match_player, Match_referee) {

    return {
    	util : Util,
    	user: User,
    	discipline: Discipline,
        subdiscipline: Subdiscipline,
        competition: Competition,
        season: Season,
        category: Category,
        gender: Gender,
        competition_type: Competition_type,
        //country:Country
        contact:Contact,
        phase:Phase,
        group:Group,
        round:Round,
        match:Match,
        team:Team,
        clasification:Clasification,
        player_team:Player_team,
        event:Event,
        event_match_player:Event_match_player,
        match_referee:Match_referee
    };
});