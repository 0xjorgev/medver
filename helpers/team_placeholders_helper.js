if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['../util/knex_util',
	'../node_modules/lodash/lodash.min',
	'../model/index',
	'../util/response_message_util'],
	(Knex, _, Models, Response) => {

	var MatchHelper = {}

	MatchHelper.replacePlaceholders = (group_id) => {
		var _matches = undefined
		//se obtienen los matches dado el grupo
		return Models.match
		.query((qb) => {
			qb.where({group_id: group_id})
			qb.where(Knex.raw('(placeholder_home_team_group is not null or placeholder_visitor_team_group is not null)'))
			qb.where(Knex.raw('(home_team_id is null or visitor_team_id is not null)'))
		})
		.fetchAll()
		.then((result) => {
			_matches = result.toJSON()

			var ids = _matches.reduce((blah, m) => {
				if(m.placeholder_home_team_group != null)
					blah.push(m.placeholder_home_team_group)
				if(m.placeholder_visitor_team_group != null)
					blah.push(m.placeholder_visitor_team_group)
				return blah
			}, [])

			return Models.standing_table
				.query((qb) => {
					qb.select(Knex.raw('id, team_id, group_id, points, row_number() over (partition by group_id order by points desc) as position'))
					qb.whereIn('group_id', ids)
				})
				.fetchAll()
		})
		.then((result) => {
			//de acuerdo a los standings obtenidos, se reemplazan los
			//placeholders con los team_id obtenidos
			var standings = result.toJSON()
			return _matches.map((m) => {

				//TODO: refactor this

				//se busca dentro de los standings la combinacion de grupo/posicion
				var ph =
				standings
				.filter((s) => s.group_id == m.placeholder_home_team_group)
				.filter((s) => s.position == m.placeholder_home_team_position)

				//al encontrar una coincidencia, se reemplaza y se elimina el
				//placeholder
				if(ph[0].team_id){
					m.home_team_id = ph[0].team_id
					m.placeholder_home_team_group = null
					m.placeholder_home_team_position = null
				}

				ph =
				standings
				.filter((s) => s.group_id == m.placeholder_visitor_team_group)
				.filter((s) => s.position == m.placeholder_visitor_team_position)

				if(ph[0].team_id){
					m.visitor_team_id = ph[0].team_id
					m.placeholder_visitor_team_group = null
					m.placeholder_visitor_team_position = null
				}
				return m
			})
		})
		.then((result) => {
			//array de matches modificados
			//se salva en base de datos
			return result.map((m) => {
				new Models.match(m).save().then( (r) => {
					console.log(r.toJSON());
				})
				return m
			})
		})
		.catch((error) => {
			throw error
		})
	}

	return MatchHelper
});
