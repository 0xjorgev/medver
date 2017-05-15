// var xlsx = require('node-xlsx')
var _ = require('lodash')
var lme = require('lme')
var util = require('util')
var logger = obj => lme.d(util.inspect(obj, {colors: true, depth: Infinity }))

const structure = [
	//ccc b
	{ category_id: 33
		,initial_phase_id: 39
		,phases: [
			{groups: 4, teams: 4}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//ccc g
	,{ category_id: 35
		,initial_phase_id: 41
		,phases: [
			{groups: 2, teams: 3}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//nca u-6
	,{ category_id: 97
		,initial_phase_id: 104
		,phases: [
			{groups: 2, teams: 4}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//nca u-8
	,{ category_id: 83
		,initial_phase_id: 89
		,phases: [
			{groups: 3, teams: 4}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//nca u-10
	,{ category_id: 84
		,initial_phase_id: 88
		,phases: [
			{groups: 5, teams: 4}
			,{groups: 4, teams: 2}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//nca u-12
	,{ category_id: 85
		,initial_phase_id: 91
		,phases: [
			{groups: 5, teams: 4}
			,{groups: 4, teams: 2}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//nca u-16
	,{ category_id: 86
		,initial_phase_id: 92
		,phases: [
			{groups: 6, teams: 4}
			,{groups: 4, teams: 2}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//nca u-18
	,{ category_id: 88
		,initial_phase_id: 93
		,phases: [
			{groups: 3, teams: 4}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//af
	,{ category_id: 82
		,initial_phase_id: 90
		,phases: [
			{groups: 3, teams: 4}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//jca
	,{ category_id: 8
		,initial_phase_id: 39
		,phases: [
			{groups: 4, teams: 4}
			,{groups: 4, teams: 2}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
	//td3v3
	,{ category_id: 46
		,initial_phase_id: 52
		,phases: [
			{groups: 8, teams: 4}
			,{groups: 4, teams: 2}
			,{groups: 2, teams: 2}
			,{groups: 1, teams: 2}
		]
	}
]

const getLetter = function*(){
	var index = 65;
	while(true){
		if(index > 90) index = 65
		yield String.fromCharCode(index++)
	}
}

const fetch = require('node-fetch')

const competitionBuilder = {}

const api = 'http://localhost:3000/api/v1.0'
// const api = 'http://ss-core.herokuapp.com/api/v1.0'

const getRQ = (data, method) => {
	return {
		method: method
		,headers: {
			'Content-Type': 'application/json'
			,'Accept': 'application/json'
		}
		,body: JSON.stringify(data)
	}
}

competitionBuilder.go = () => {
	const _cats = structure.map(cat => {
		return fetch(`${api}/category/${cat.category_id}`)
		.then(res => {
			if(res.status == 500) return -1
			return res.json()
		})
		.then(res => res.data)
		.catch(err => logger(err))
	})

	let cats = null

	return Promise.all(_cats)
	.then(res => {
		cats = res //for later use
		//se filtran las categorias inciales existentes
		// return res.filter(c => c.phases && c.phases.length == 1)
		return res.filter(c => c.phases)
	})
	.then(res => {
		//obtener info para cada una de las fases
		res.map(cat => {
			const c = structure.find(c => c.category_id == cat.id)
			return Promise.all(c.phases.map((phase, idx) => {
				//la primera fase esta creada en todas las competiciones
				if(idx == 0){
					return fetch(`${api}/phase/${c.initial_phase_id}`)
					.then(res => res.json())
					.then(res => res.data)
				}

				const pos = idx + 1
				let name = `Phase ${pos}`

				if(pos == c.phases.length) name = 'Final'
				if(pos == c.phases.length - 1) name = 'Semi-Finals'
				if(pos == c.phases.length - 2 && pos != 1) name = 'Quarter-Finals'

				let phaseData  = {
					name: name
					,position: pos
					,category_id: c.category_id
				}

				return fetch(`${api}/phase`, getRQ(phaseData, 'POST'))
				.then(res => res.json())
				.then(res => res.data)
			}))
			.then(phases => {
				//creacion de grupos
				return Promise.all(phases.map((phase, idx) => {
					const name = getLetter()
					const info = c.phases[idx]
					let promises = []

					for(let i = 0; i < info.groups; i++){
						const groupData = {
							name: name.next().value
							,participant_team: info.teams
							,phase_id: phase.id
						}

						promises.push(fetch(`${api}/group`, getRQ(groupData, 'POST'))
						.then(res => res.json())
						.then(res => res.data)
						.then(group => {
							//creacion de partidos. El servicio retorna los IDs de los grupos
							return fetch(`${api}/group/${group.id}/match`, getRQ({}, 'POST'))
							.then(res => {
								if(res.status == 500) return -1
								return res.json()
							})
						})
					)
				}
				return promises
			}))
		})
		.catch(e =>{
			throw e
		})
	})
})
.catch(e => logger(e))
}

competitionBuilder.createMatches = () => {
	const promises = structure.map( cat => {
		return fetch(`${api}/category/${cat.category_id}/match`, getRQ({}, 'POST'))
		.then(res => res.json())
		.then(res => res.data)
	})

	return Promise.all(promises)
	.then(res => {
		logger('done!')
	})
}

// competitionBuilder.go()
competitionBuilder.createMatches()

exports.competitionBuilder = competitionBuilder
