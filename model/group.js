if (typeof define !== 'function')
	var define = require('amdefine')(module)

define(['./base_model'
	,'../util/knex_util'
	,'../util/logger_util'
	,'js-combinatorics'
	,'lodash'
	,'./phase'
	,'./round'], (DB
		,Knex
		,logger
		,Combinatorics
		,_
	) => {

	var Group = DB.Model.extend({
		tableName: 'groups',
		hasTimestamps: true,
		initialize: function() {

			this.on('saving', () => {
				const participants = this.get('participant_team')
				if(participants == undefined
					|| participants == null
					|| participants <= 1){
					//el numero minimo de participantes en un grupo es dos,
					//no tiene sentido un grupo con menos de dos parts.
					this.set('participant_team', 2)
				}
			}, this)

			//cada vez que se crea un grupo hay que actualizar la spider para
			//garantizar que existen los slots disponibles para los equipos
			this.on('created', () => {
				const participants = this.get('participant_team')
				if(participants == undefined
					|| participants == null
					|| participants <= 1){
					//el numero minimo de participantes en un grupo es dos,
					//no tiene sentido un grupo con menos de dos parts.
					logger.debug(`participants: ${participants}`)
					this.set('participant_team', 2)
				}

				let rowsToInsert = []
				for(let i = 0; i < participants; i++){
					const data = { group_id: this.id
						,phase_id: this.get('phase_id')
						,position_in_group: i+1
					}
					rowsToInsert.push(DB._models.Category_group_phase_team.forge(data).save())
				}
				return Promise.all(rowsToInsert)
					.catch(e => logger.error(e))
			}, this)
		},
		//relations
		phase: function(){
			return this.belongsTo('Phase', 'phase_id')
		}
		,rounds: function(){
			return this.hasMany('Round')
		}
		,category_group_phase_team: function(){
			return this.hasMany('Category_group_phase_team', 'group_id')
		}
		,standing_table: function(){
			return this.hasMany('StandingTable', 'group_id')
		}
		,matches: function(){
			return this.hasMany('Match', 'group_id')
		}
		//crea un partido en el grupo con las opciones recibidas
		,createMatch: function(data){

			if(data == undefined) data = {}
			if(data.number == undefined) data.number = 1
			if(data.placeholder_home_team_position == undefined) data.placeholder_home_team_position = null
			if(data.placeholder_home_team_group == undefined) data.placeholder_home_team_group = null
			if(data.placeholder_visitor_team_position == undefined) data.placeholder_visitor_team_position = null
			if(data.placeholder_visitor_team_group == undefined) data.placeholder_visitor_team_group = null

			return this.load(['phase.category.season'])
			.then(() => {
				let initialDate = this.related('phase')
					.related('category')
					.related('season')
					.get('init_at')

				return DB._models.Match.forge({
					number: data.number
					,group_id: this.id
					,date: initialDate
					,placeholder_home_team_position: data.placeholder_home_team_position
					,placeholder_home_team_group: data.placeholder_home_team_group
					,placeholder_visitor_team_position: data.placeholder_visitor_team_position
					,placeholder_visitor_team_group: data.placeholder_visitor_team_group
				})
				.save()
			})
		}
		//crea los partidos asociados a este grupo
		,createMatches: function(){
			if(!this.get('participant_team') > 0){
				logger.error(`Group ${this.id} has no value in 'participant_team' field`)
				return
			}

			//Este algoritmo aplica para la 1era fase unicamente. El resto de las
			//fase no se calcula con la combinatoria

			//se genera un array con los numeros de 1 a <participant_team>
			const positions = [...Array(this.get('participant_team')).keys()].map(x => x+1)
			//Esta combinatoria aplica para la fase 1. Las fases > 1 deben ser ajustadas
			//manualmente
			const matches = Combinatorics.combination(positions, 2)

			return this.load(['phase.category.season'])
			.then(() => {
				let initialDate = this.related('phase')
					.related('category')
					.related('season')
					.get('init_at')

				//se crean los partidos con el bare minimum
				return Promise.all(matches.toArray()
					.map((match, index) => {
						return DB._models.Match.forge({
							number: index + 1
							,group_id: this.id
							,date: initialDate
							,placeholder_home_team_group: this.id
							,placeholder_home_team_position: match[0]
							,placeholder_visitor_team_group: this.id
							,placeholder_visitor_team_position: match[1]
						})
						.save()
					})
				)
			})
		}
		,updateMatchPlaceholders: function(){

			logger.debug(`Updating match placeholders of group ${this.id}, phase ${this.get('phase_id')}`)

			const template = 'update matches set $TEAM_team_id = team_id '
			+ ' from categories_groups_phases_teams '
			+ ' where matches.group_id = ?'
			+ ' and categories_groups_phases_teams.group_id = matches.placeholder_$TEAM_team_group'
			+ ' and categories_groups_phases_teams.position_in_group = matches.placeholder_$TEAM_team_position'

			const homeQuery = template.replace(/\$TEAM/g, 'home')
			const awayQuery = template.replace(/\$TEAM/g, 'visitor')
			const group = null

			return Knex.raw(homeQuery, [this.id])
			.then(() => Knex.raw(awayQuery, [this.id]))
			//actualizacion de slots en spider.
			//se toman los equipos de los partidos de ESTE grupo
			//luego los escribo en los slots de la spider
			.then(() => this.load(['matches' ,'phase']))
			.then(matches => {
				//los equipos que estan en el grupo, de acuerdo a los partidos
				const teams = []
				this.related('matches')
				.map(m => {
					teams.push([m.get('placeholder_home_team_group'), m.get('placeholder_home_team_position')])
					teams.push([m.get('placeholder_visitor_team_group'), m.get('placeholder_visitor_team_position')])
				})
				return teams
			})
			.then(phs => {
				//necesito determinar segun la standing_tables quienes son estos phs
				let groups = []
				const placeholders =
				_(phs.filter(x => x[0] != null && x[1] != null))
				.uniq().value()
				.map(ph => {
					if(!_.includes(groups, ph[0])) groups.push(ph[0])
					return {
						group_id: ph[0]
						,position: ph[1]
					}
				})

				// logger.debug('placeholders')
				// logger.debug(placeholders) //estos son los que necesito para rellenar la spider
				// logger.debug(`Se necesita la standing de los grupos`)
				// logger.debug(groups)

				//busco la standing de la fase anterior
				return this.load('phase')
				.then(() => DB._models.Group.where({id: groups[0]}).fetch())
				.then(group => DB._models.StandingTable.getPositionsByPhase(group.get('phase_id')))
				.then(rs => {
					let stands = rs.rows
					// logger.debug(stands)
					// let stands = _(standings).flatten().value()
					logger.debug(`Se actualizan los campos team_id en categories_groups_phases_teams del grupo ${this.id}, fase ${this.get('phase_id')}`)
					// logger.debug(`stands`)
					// logger.debug(stands)
					//equipos a salvar en los slots libres de la spider
					const teamsToInsert = placeholders.map(ph => {
						// logger.debug(`buscando ph`)
						// logger.debug(ph)

						const found = stands.find(x => x.position == ph.position && x.group_id == ph.group_id)
						// logger.debug('found')
						// logger.debug(found)

						return stands.find(x => x.position == ph.position && x.group_id == ph.group_id)
					})
					
					// logger.debug('teamsToInsert')
					// logger.debug(teamsToInsert)

					return this.load('category_group_phase_team')
					.then(() => {
						return Promise.all(this.related('category_group_phase_team')
						.map((spy,idx) => {
							logger.debug(`Se coloca ${teamsToInsert[idx].team_id} en group ${spy.get('group_id')}. id spider: ${spy.id}`)
							spy.set('team_id', teamsToInsert[idx].team_id)
							return spy.save()
						}))
					})
				})
			})
			.catch(e => {
				throw e
			})
		}

		//segun las posiciones de la standing y de los partidos que componen un
		//grupo, actualiza la tabla spider de acuerdo al grupo y la posicion presente.
		//REQUIERE que existan los registros correspondientes en la spider con
		//ID de group y position_in_group
		// ,updateTeamsByPosition: function(){
		// 	// -- 1. de los matches de los grupos de la siguiente fase, obtener los placeholders
		// 	// select placeholder_home_team_group, placeholder_home_team_position, placeholder_visitor_team_group, placeholder_visitor_team_position
		// 	// from matches where group_id in (136) -- (136, 138)
		// 	//
		// 	// -- 2. con ese resultado, obtengo los equipos que estan en esas posiciones
		// 	//
		// 	// -- 3 ya tengo la info de que equipo esta en cual posicion, ahora update a spider
		// 	// update categories_groups_phases_teams set team
		//
		// 	// -- 1. de los matches de los grupos de la siguiente fase, obtener los placeholders
		// 	logger.debug('updateTeamsByPosition')
		// 	console.log(`Se buscan los matches del grupo ${this.id}`)
		//
		// 	return DB._models.Match
		// 	.where({group_id: this.id})
		// 	.fetchAll()
		// 	.then(matches => {
		// 		return matches.map(match => {
		// 			return {
		// 				group_id: match.get('group_id')
		// 				,home_team_group: match.get('placeholder_home_team_group')
		// 				,home_team_position: match.get('placeholder_home_team_position')
		// 				,visitor_team_group: match.get('placeholder_visitor_team_group')
		// 				,visitor_team_position: match.get('placeholder_visitor_team_position')
		// 			}
		// 		})
		// 	})
		// 	.then(matches => {
		// 		logger.debug('matches')
		// 		logger.debug(matches)
		// 		//esta cadena retorna los equipos en cada posicion del grupo
		// 		return Promise.all(matches.map(match => {
		// 			let teamPositions = []
		// 			//por cada match, obtengo el equipo en esa position
		// 			return DB._models.StandingTable.getPositions(match.home_team_group)
		// 			.then( homePos => {
		// 				teamPositions.push(homePos.rows)
		// 				return DB._models.StandingTable.getPositions(match.visitor_team_group)
		// 			})
		// 			.then( awayPos => {
		// 				teamPositions.push(awayPos.rows)
		// 				return _(teamPositions).flatten().uniq().value()
		// 			})
		// 			.then(cleanPositions => {
		// 				match.positions = cleanPositions
		// 				return match
		// 			})
		// 		}))
		// 	})
		// 	//actualizacion de tabla spider
		// 	.then(groupsWithPositions => {
		// 		logger.debug('posiciones')
		// 		logger.debug(groupsWithPositions)
		// 		return Promise.all(groupsWithPositions.map(group => {
		// 			return group.positions.map(pos => {
		// 				logger.debug(' > ' + group.group_id + ' ' + pos.position)
		// 				logger.debug()
		// 				return DB._models.Category_group_phase_team
		// 				.where({group_id: group.group_id, position_in_group: pos.position})
		// 				.fetchAll()
		// 				.then(spiders => {
		// 					logger.lme.wline()
		// 					logger.debug(spiders.toJSON())
		// 					return spiders.map(spidey => {
		// 						logger.debug(spidey)
		// 						return spidey.set('team_id',pos.team_id).save()
		// 					})
		// 				})
		// 				//poner un log en el on saving de la spider
		// 			})
		// 		}))
		// 	})
		// }

	})

	// uses Registry plugin
	return DB.model('Group', Group)
})
