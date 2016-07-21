var xlsx = require('node-xlsx')
var inspect = require('util').inspect

var _log = (obj) => console.log(inspect(obj, { colors: true, depth: Infinity }))

//read file
const data = xlsx.parse(`${__dirname}/SabanaCompTestV1.xlsx`)

//_log(data)

//process file

//list teams
var teams = data.map((item) => item.name )
_log(teams)

var parseExcelDate = (dateNumber) => new Date((new Date(1900,0,1)).getTime() + 86400000*(dateNumber - 2))

//list players of each team
var result = data.forEach((sheet) => {
	sheet.data.forEach((player, index) => {
		if(index != 0 && player.length > 0){

			var obj = {
 				first_name: '',
 				last_name: '',
 				img_url: '',
 				portrait_url: '',
 				nickname: '',
 				birthday: '',
 				email: '',
 				gender_id: ''
			}

			_log(player[0].trim() + " " + player[1].trim() + parseExcelDate(player[5]))
		}
	})
})



_log(result)
// write to db

//profit!