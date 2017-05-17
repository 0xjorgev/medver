var xlsx = require('node-xlsx')
var moment = require('moment')
var matches = require('./matches').matches

var parseExcelDate = (dateNumber) => new Date((new Date(1900,0,1)).getTime() + 86400000*(dateNumber - 2))
const file = xlsx.parse(`${__dirname}/NCA AF JCA 3vV & CCC PHO.xlsx`)

// console.log(matches);
// var queries = []

var matchFilter = (data => {
	return m => (m.placeholder_home_team_group == data.home.group && m.placeholder_home_team_position == data.home.pos
				&& m.placeholder_visitor_team_group == data.away.group && m.placeholder_visitor_team_position == data.away.pos)
			|| (m.placeholder_home_team_group == data.away.group && m.placeholder_home_team_position == data.away.pos
				&& m.placeholder_visitor_team_group == data.home.group && m.placeholder_visitor_team_position == data.home.pos)
})

var result = file.filter(s => s.name.toLowerCase().includes('U-6 - NCA - Table 5'.toLowerCase()))
.map(s => {
	s.data.map((match, idx) => {
		if(match.length > 1 && match[0] && !(match[0].toString().toLowerCase().trim() == 'time')){
			var date = parseExcelDate(match[0])
			date.setDate(20)
			date.setMonth(4)
			date.setFullYear(2017)
			// console.log(date, match[1], match[3], match[5])

			var home = JSON.parse(match[1])
			var away = JSON.parse(match[3])
			var data = {
				home: home,
				away: away
			}
			console.log(home, 'vs', away);

			console.log(matches.filter(matchFilter(data)));
		}
	})
})
