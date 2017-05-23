var xlsx = require("node-xlsx");
var moment = require("moment");
var fetch = require("node-fetch");
// var matches = require('./matches').matches

const api = "http://localhost:3000/api/v1.0";
// const api = "http://ss-core.herokuapp.com/api/v1.0";

var parseExcelDate = dateNumber =>
  new Date(
    new Date(1900, 0, 1, 0, 0, 0, 0).getTime() + 86400000 * (dateNumber - 2)
  );

const getRQ = (data, method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };
};

const file = xlsx.parse(`${__dirname}/NCA AF JCA 3vV & CCC PHO.xlsx`);
const structure = [
	//ccc b
	{ category_id: 33
		,initial_phase_id: 39
		,phases: [
			 {groups: 4, teams_per_group: 4
				,classifying_teams_per_phase: 0}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 0}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//ccc g
	,{ category_id: 35
		,initial_phase_id: 41
		,phases: [
			{groups: 2, teams_per_group: 3
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 0}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//nca u-6
	,{ category_id: 97
		,initial_phase_id: 104
		,phases: [
			 {groups: 2, teams_per_group: 4
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//nca u-8
	,{ category_id: 83
		,initial_phase_id: 89
		,phases: [
			 {groups: 3, teams_per_group: 4 ,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2 ,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2 ,classifying_teams_per_phase: 1}
		]
	}
	//nca u-10
	,{ category_id: 84
		,initial_phase_id: 88
		,phases: [
			 {groups: 5, teams_per_group: 4 ,classifying_teams_per_phase: 8}
			,{groups: 4, teams_per_group: 2 ,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2 ,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2 ,classifying_teams_per_phase: 1}
		]
	}
	//nca u-12
	,{ category_id: 85
		,initial_phase_id: 91
		,phases: [
			 {groups: 5, teams_per_group: 4
			,classifying_teams_per_phase: 8}
			,{groups: 4, teams_per_group: 2
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//nca u-16
	,{ category_id: 86
		,initial_phase_id: 92
		,phases: [
			 {groups: 6, teams_per_group: 4
			,classifying_teams_per_phase: 8}
			,{groups: 4, teams_per_group: 2
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//nca u-18
	,{ category_id: 88
		,initial_phase_id: 93
		,phases: [
			 {groups: 3, teams_per_group: 4
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//af
	,{ category_id: 82
		,initial_phase_id: 90
		,phases: [
			 {groups: 3, teams_per_group: 4
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//jca
	,{ category_id: 8
		,initial_phase_id: 39
		,phases: [
			 {groups: 4, teams_per_group: 4
			,classifying_teams_per_phase: 8}
			,{groups: 4, teams_per_group: 2
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
	//td3v3
	,{ category_id: 46
		,initial_phase_id: 52
		,phases: [
			 {groups: 8, teams_per_group: 4
			,classifying_teams_per_phase: 8}
			,{groups: 4, teams_per_group: 2
			,classifying_teams_per_phase: 4}
			,{groups: 2, teams_per_group: 2
			,classifying_teams_per_phase: 2}
			,{groups: 1, teams_per_group: 2
			,classifying_teams_per_phase: 1}
		]
	}
]

getMatches = () => {
  const promises = structure.map(cat => {
    return fetch(`${api}/category/${cat.category_id}/match`)
      .then(res => res.json())
      .then(res => res.data);
  });
  const filterMatches = input => {
    var output = [];
    input.map(category => {
      return category.phases.map(phase => {
        return phase.groups.map(group => {
          return group.matches.map(match => {
            match.phase_id = phase.id;
            match.phase_position = phase.position;
            output.push(match);
          });
        });
      });
    });
    return output;
  };
  return Promise.all(promises).then(res => filterMatches(res));
};

var matchFilter = data => {
  return m =>
    (m.placeholder_home_team_group == data.home.group &&
      m.placeholder_home_team_position == data.home.pos &&
      m.placeholder_visitor_team_group == data.away.group &&
      m.placeholder_visitor_team_position == data.away.pos) ||
    (m.placeholder_home_team_group == data.away.group &&
      m.placeholder_home_team_position == data.away.pos &&
      m.placeholder_visitor_team_group == data.home.group &&
      m.placeholder_visitor_team_position == data.home.pos);
};

var currentSheet = null;
var currentRow = null;
var msg = [];

var cleanString = str => {
  return (
    str
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/\r?\n|\r/g, "")
      .replace(/&#10;/g, "")
      // .toUpperCase()
      .trim()
  );
};

getMatches()
  .then(matches => {
    return file
      .filter(s => s.name.toLowerCase().includes("Table 5".toLowerCase()))
      .map(s => {
        currentSheet = s.name;
        // console.log('--', s.name.toLowerCase(), '----------');
        return s.data
          .map((match, idx) => {
            currentRow = idx;
            if (
              match.length > 1 &&
              match[0] &&
              !(match[0].toString().toLowerCase().trim() == "time")
            ) {
              var date = parseExcelDate(match[0]);
              // console.log(date);
              try {
                var h = cleanString(match[1]);
                var a = cleanString(match[3]);
                var home = h == "WILD CARD"
                  ? { group: null, pos: null }
                  : JSON.parse(h);
                var away = a == "WILD CARD"
                  ? { group: null, pos: null }
                  : JSON.parse(a);
              } catch (e) {
                // console.log('match[1]', match[1]);
                // console.log('match[3]', match[3]);
                throw e;
              }

              var data = {
                home: home,
                away: away
              };

              var matchesFound = matches.filter(matchFilter(data));

              if (matchesFound.length == 0) {
                msg.push(
                  `-- ${currentSheet}:${currentRow} - no match found for ${JSON.stringify(home)} vs ${JSON.stringify(away)}`
                );
                return null;
              } else {
                var thisMatch = matchesFound[0];
                // console.log(thisMatch);

                const matchId = thisMatch.id;
                const excelHomeTeamName = cleanString(match[1]);
                const excelAwayTeamName = cleanString(match[3]);
                const excelHomeScore = parseInt(match[2]);
                const excelAwayScore = parseInt(match[4]);
                let homeScore = 0;
                let awayScore = 0;

                const getTeamId = (team, match) => {
                  const teamObj = JSON.parse(team);

                  if (
                    match.placeholder_home_team_position == teamObj.pos &&
                    match.placeholder_home_team_group == teamObj.group &&
                    match.home_team.id
                  ) {
                    return match.home_team.id;
                  } else if (
                    match.placeholder_visitor_team_position == teamObj.pos &&
                    match.placeholder_visitor_team_group == teamObj.group &&
                    match.visitor_team.id
                  ) {
                    return match.visitor_team.id;
                  }
                  console.log(`No team ${team} found in match: ${match.id}`);
                  return null;
                };

                const isHome = (team, match) => {
                  const teamObj = JSON.parse(team);

                  if (
                    match.placeholder_home_team_position == teamObj.pos &&
                    match.placeholder_home_team_group == teamObj.group &&
                    match.home_team.id
                  ) {
                    return true;
                  } else if (
                    match.placeholder_visitor_team_position == teamObj.pos &&
                    match.placeholder_visitor_team_group == teamObj.group &&
                    match.visitor_team.id
                  ) {
                    return false;
                  }
                  console.log(`No team ${team} found in match: ${match.id}`);
                  return null;
                };

                if (!isNaN(excelHomeScore) && !isNaN(excelAwayScore)) {
                  let body = [];
                  for (var i = 1; i <= excelHomeScore; i++) {
                    body.push({
                      event_id: 1,
                      team_id: getTeamId(excelHomeTeamName, thisMatch)
                    });
                  }
                  fetch(
                    `${api}/match/${thisMatch.id}/event`,
                    getRQ(body, "POST")
                  )
                    .then(res => res.json())
                    .then(res => res.data)
                    .catch(e => {
                      throw e;
                    });

                  console.log("MATCH ID", thisMatch.id);
                  console.log("HOME SCORE", body);

                  body = [];
                  for (var i = 1; i < excelAwayScore; i++) {
                    body.push({
                      event_id: 1,
                      team_id: getTeamId(excelAwayTeamName, thisMatch)
                    });
                  }
                  fetch(
                    `${api}/match/${thisMatch.id}/event`,
                    getRQ(body, "POST")
                  )
                    .then(res => res.json())
                    .then(res => res.data)
                    .catch(e => {
                      throw e;
                    });
                  console.log("MATCH ID", thisMatch.id);
                  console.log("AWAY SCORE", body);

                  body = {
                    played: true,
                    home_team_score: isHome(excelHomeTeamName, thisMatch)
                      ? excelHomeScore
                      : excelAwayScore,
                    visitor_team_score: isHome(excelHomeTeamName, thisMatch)
                      ? excelAwayScore
                      : excelHomeScore
                  };

                  fetch(`${api}/match/${thisMatch.id}`, getRQ(body, "PUT"))
                    .then(res => res.json())
                    .then(res => res.data)
                    .catch(e => {
                      throw e;
                    });

                  console.log("MATCH ID", thisMatch.id);
                  console.log("MATCH UPDATE", body);
                } else {
                  // console.log('ELSE HOMESCORE',excelHomeScore);
                  // console.log('ELSE AWAYSCORE',excelAwayScore);
                }
              }
            }
          })
          .filter(x => x != null)
          .map(match => {
            //se esta generando una diferencia de tiempo que hace que las horas
            //se generen un minuto menos de lo esperado aprox.
            //le sumo 5 seg para asegurar que la hora esta en la fecha requerida
            var query = `update matches set date = '${moment(match.date)
              .add(5, "s")
              .format(
                "YYYY-MM-DD HH:mm"
              )}-07'::timestamp WITH TIME ZONE, location = '${match.location}' where id = ${match.id};`;
            return query;
          })
          .map(query => {
            // console.log(query)
          });
      });
  })
  .catch(e => {
    console.error(e);
    console.error(e.stack);
    // console.log(currentSheet, ':',currentRow);
  })
  .then(res => {
    msg.unshift("-- FAILED MATCHES. Check these manually");
    // console.log(msg.join('\n'))
  });
