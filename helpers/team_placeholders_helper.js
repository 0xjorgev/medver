if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['../util/knex_util'
	,'../node_modules/lodash/lodash.min'
	,'../model/index'
	,'../util/response_message_util'
	,'../util/logger_util'
	],
	(Knex
	,_
	,Models
	,Response
	,logger
	) => {

	var PlaceholderHelper = {}

	//TODO: RETIRAR ESTE CODIGO. AHORA SE HACE EN EL MODELO DE GROUP
	PlaceholderHelper.replacePlaceholders = group_id => {
		let _matches = null
		return Models.group
		.where({id: group_id})
		.fetch({withRelated: 'phase'})
		.then(group => {
			//se obtienen los matches dado el grupo
			return Models.match
				.query(qb => {
					qb.where({group_id: group_id })
					qb.whereNotNull('placeholder_home_team_group')
					qb.whereNotNull('placeholder_visitor_team_group')
					// qb.where(Knex.raw('(placeholder_home_team_group is not null or placeholder_visitor_team_group is not null)'))
					// qb.where(Knex.raw('(home_team_id is null or visitor_team_id is not null)'))
				})
				.fetchAll()
		})
		.then(result => {
			//los placeholders de los matches serán actualizados mas adelante
			//en base a las posiciones de los equipos dentro de los grupos
			_matches = result

			//ID de grupos involucrados
			const ids = _.uniq(_matches.reduce((blah, m) => {
				if(m.placeholder_home_team_group != null) blah.push(m.placeholder_home_team_group)
				if(m.placeholder_visitor_team_group != null) blah.push(m.placeholder_visitor_team_group)
				return blah
			}, []))

			// si la fase es la 1, la posicion deberia tomarse de la spider.
			// de lo contrario, se toma de la standing
			//TODO: al calcular la standing, se debe hacer update de la spider
			// return Models.standing_table
			// 	.query(qb => {
			// 		qb.select(Knex.raw('id, team_id, group_id, points, row_number() over (partition by group_id order by points desc) as position'))
			// 		qb.whereIn('group_id', ids)
			// 	})
			// 	.fetchAll()

			return Models.category_group_phase_team
				.where(qb => qb.whereIn('group_id',ids) )
		})
		.then(positions => {
			//en base a la spider, obtengo que equipo esta en cual posicion



		})
		// .then(result => {
		// 	//de acuerdo a los standings obtenidos, se reemplazan los
		// 	//placeholders con los team_id obtenidos
		// 	var standings = result.toJSON()
		// 	return _matches.map(m => {
		//
		// 		//se busca dentro de los standings la combinacion de grupo/posicion
		// 		let ph =
		// 		standings
		// 		.filter(s => s.group_id == m.placeholder_home_team_group)
		// 		.filter(s => s.position == m.placeholder_home_team_position)
		//
		// 		//al encontrar una coincidencia, se reemplaza y se elimina el
		// 		//placeholder
		// 		if(ph && ph[0] && ph[0].team_id){
		// 			m.home_team_id = ph[0].team_id
		// 			m.placeholder_home_team_group = null
		// 			m.placeholder_home_team_position = null
		// 		}
		//
		// 		ph = standings
		// 			.filter(s => s.group_id == m.placeholder_visitor_team_group)
		// 			.filter(s => s.position == m.placeholder_visitor_team_position)
		//
		// 		if(ph && ph[0] && ph[0].team_id){
		// 			m.visitor_team_id = ph[0].team_id
		// 			m.placeholder_visitor_team_group = null
		// 			m.placeholder_visitor_team_position = null
		// 		}
		//
		// 		return m
		// 	})
		// })
		//se salva el array de matches modificados
		.then(result => Promise.all(result.map(m => Models.match.forge(m).save())) )
		.catch(error => {
			throw error
		})
	}

	return PlaceholderHelper
});
