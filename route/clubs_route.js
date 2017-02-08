if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
		,'../model/index'
		,'../util/request_message_util'
		,'../util/knex_util'
		,'../util/response_message_util'
		,'../util/logger_util'
        ,'../helpers/auth_helper'
	],
	function (express
		,Models
		,Message
		,Knex
		,Response
		,logger
        ,auth){

	var router = express.Router();

	//==========================================================================
	// Get all active clubs
	//==========================================================================
	router.get('/', function (req, res) {
		return Models.club
		.query(function(qb){})
		.where({active:true})
		.fetchAll()
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});
	
	//==========================================================================
	// Get all active clubs that are related to the user
	//==========================================================================
	router.get('/query/by_user', (req, res) => {
        //se verifica unicamente que haya un usuario valido en el request
        //no se requiere ningun permiso especial
        console.log('Current User', req._currentUser)

        var chk = auth.checkPermissions(req._currentUser, [])

        if(chk.code !== 0){
            Response(res, null, chk)
            return
        }

        Models.user
        .query(qb => qb.where({id: req._currentUser.id}) )
        .fetch({withRelated: [
             'entity.related_from.relationship_type'
            ,'entity.related_from.to.entity_type'
        ]})
        .then(result => {
            var user = result.toJSON()
            //con esto se filtran las relaciones para que sean los clubs
            return user.entity.related_from
                .filter(rel => {
                    return rel.to.object_type == 'clubs'
                })
                //y con este map se extraen los ids de los clubs
                .map(clubs => clubs.to.object_id)
        })
        .then(result => {
            return Models.club
                .query(qb => qb.whereIn('id', result))
                .fetchAll()
        })
        .then(result => Response(res, result) )
        .catch(error => Response(res, null, error))
    })

    //==========================================================================
	// Get a club by his id
	//==========================================================================
	router.get('/:club_id', function (req, res) {
		
		var clubId = req.params.club_id
		return Models.club
		.query(function(qb){})
		.where({id:clubId})
		.where({active:true})
		.fetch({withRelated: [
             'entity'
        ]})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

    //==========================================================================
	// CRUD functions
	//==========================================================================
	var saveClub = function(data, res){
		logger.debug(data)

		var orgData = {}

		if(data.organization_id)
			orgData.id = data.organization_id
		else{
			orgData = {
				//TODO: reemplazar el id por un code, en lugar del ID directo de base de datos
				//organizacion tipo club
				organization_type_id: 3
				,name: data.name
				,description: data.description
			}
		}

		var clubData = {}
		if (data.name != undefined) clubData.name = data.name.trim()
		if (data.logo_url != undefined) clubData.logo_url = data.logo_url
		if (data.portrait_url != undefined) clubData.portrait_url = data.portrait_url
		if (data.short_name != undefined) clubData.short_name = data.short_name
		if (data.description != undefined) clubData.description = data.description
		if (data.active != undefined) clubData.active = data.active
		if (data.id != undefined) clubData.id = data.id

		var _club = null

		//para asociar las entidades
		var clubEntity = null
		var userEntity = null

		//let's lookup the organization by id or by the previously-trimmed name
		Models.organization.query(qb => {
			qb.where({id: clubData.organization_id})
			qb.orWhere({name: orgData.name})
		})
		.fetch()
		.then(found => {
			//if found, let's put its id on clubData
			if(found){
				clubData.organization_id = found.attributes.id
				return clubData
			}
			else{
				return new Models
					.organization(orgData)
					.save()
					.then(result => {
						clubData.organization_id = result.attributes.id
						return clubData
					})
			}
		})
		//se salva el club
		.then(clubData => new Models.club(clubData).save())
		.then(result => {
			_club = result
			//se obtienen las entidades del club y del user en un solo query
			return Models.entity
			.query(qb => {
				qb.where({object_id: _club.attributes.id,
					object_type: 'clubs' })
				qb.orWhere({object_id: data._currentUser.id})
				qb.where({object_type: 'users'})
			})
			.fetchAll()
		})
		.then(result => {
			var tmp = result.toJSON()

			clubEntity = tmp.filter(e => e.object_type == 'clubs')
			userEntity = tmp.filter(e => e.object_type == 'users')

			// logger.debug(clubEntity)

			//la entidad usuario *debe* estar creada para este punto,
			//o bien no sería usuario válido
			//si no se obtiene una entidad para el club, se crea
			if(clubEntity.length == 0){
				//si no se encuentra una entidad asociada al equipo, se crea una nueva
				return new Models.entity({
						object_id: _club.attributes.id
						,object_type: 'clubs'})
						.save()
			}
			return result
		})
		.then(result => {
			logger.debug('entity!')
			logger.debug(result.toJSON())

			if (data.id) {
				// los siguientes bloques de promises solo aplican cuando se está
				// creando el club.
				// en caso de actualización, simplemente se retorna
				// el resultado del update y se termina el servicio
				//TODO: los bloques anteriores no son necesarios cuando se hace update. fix!
				return result
			}
			else{
				// En caso de que la entidad club se haya creado en el promise anterior
				// se asigna a clubEntity
				if(clubEntity == null || clubEntity.length == 0)
					clubEntity = result.toJSON()

				// En caso de que sea una operación POST
				// se asocia el usuario que se está creando
				// con el club como owner del mismo
				console.log('Se hace la creacion de la realacion de la entidad con el usuario: ', userEntity[0].id)
				return new Models.entity_relationship({
					ent_ref_from_id: userEntity[0].id
					,ent_ref_to_id: clubEntity.id
					,relationship_type_id: 1
					,comment: 'OWNER'
				}).save()
			}
		})
		.then(result => {
			return Models.club
			.where({id:_club.id})
			.fetch()
		})
		.then(result =>{Response(res, result)})
		.catch(error => Response(res, null, error))
	}

	//creacion de club
	router.post('/', (req, res) => {
		//Verificacion de permisos
        var chk = auth.checkPermissions(req._currentUser, [])
        if(chk.code !== 0){
            Response(res, null, chk)
            return
        }

		var data = req.body
		data._currentUser = req._currentUser
		saveClub(data, res)
	});

	//actualizacion de club
	router.put('/:club_id', function(req, res, next){
		//Verificacion de permisos
        var chk = auth.checkPermissions(req._currentUser, [])
        if(chk.code !== 0){
            Response(res, null, chk)
            return
        }

		var data = req.body
		data._currentUser = req._currentUser
		//setting the ID on the object to be saved is the way to signal bookshelf to create or update
		data.id = req.params.club_id
		saveClub(data, res)
	});

	//inactivates the club
	router.delete('/:club_id', function(req, res){
		var clubId = req.params.club_id
		var clubData = {}
		//Requiere autorizacion por token
        console.log('Current User', req._currentUser)
        var chk = auth.checkPermissions(req._currentUser, [])

        if(chk.code !== 0){
            Response(res, null, chk)
            return
        }

		if (clubId != undefined) clubData.id = clubId
		
		clubData.active = false

		return new Models.club(clubData).save()
		.then(result => {
			return Models.club
			.where({id:clubId})
			.fetch()
		})
		.then((result) => Response(res, result))
		.catch((error) => Response(res, null, error))
	})

	//==========================================================================
	// Get all teams of a club
	//==========================================================================
	router.get('/:club_id/team', (req, res) => {
		var clubId = req.params.club_id
        return Models.team
            .query(qb => qb.where('club_id', clubId))
            .fetchAll({withRelated: ['category_type'
				,'gender'
				,'category_group_phase_team.category.season.competition'
				,'category_group_phase_team.status_type'
				,'subdiscipline'
				,'club'
			]})
        .then(result => Response(res, result) )
        .catch(error => Response(res, null, error))
    })

    //==========================================================================
	// Get all Matches of a club
	//==========================================================================
	router.get('/:club_id/match', (req, res) => {
		var clubId = req.params.club_id
		var currentDate = new Date()
		var pastMatches
		var nextMatch
		var futureMatches
        //no se requiere ningun permiso especial
        //Obtengo la entidad de un club
        Models.club
        .query(qb => qb.where({id: clubId}) )
        .fetch({withRelated: [
             'entity.related_to.relationship_type'
            ,'entity.related_to.from.entity_type'
        ]})
        .then(club => {
            var club = club.toJSON()
			logger.debug(club)
            //con esto se filtran las relaciones tipo 'MEMBER'
            return club.entity.related_to
                .filter(rel => {
                    var name = (rel.relationship_type.name == undefined)
						? ''
						: rel.relationship_type.name.toUpperCase()
                    return name == 'MEMBER'
                })
                //y con este map se extraen los ids de los teams
                .map(teams => teams.from.object_id)
        })
        .then(teamsID => {
			logger.debug(teamsID)
			return Models.match
		        .query(qb => 
					qb.whereIn('home_team_id', teamsID)
					.orWhereIn('visitor_team_id', teamsID)
					.whereNot({date: null})
					.where({active: true})
					.orderBy('date')
				)
		        .fetchAll({withRelated: ['home_team'
		        	, 'visitor_team'
		        	, 'group.phase.category'
		        	, 	{ 'result': function(qb) {
							qb.whereIn('team_id',  teamsID)
						}}
					, 'result.event'
		        	, 'result.player_in'
		        	, 'result.player_out'
		        	, 'home_team.club'
		        	, 'visitor_team.club'
		        	]})
        })
        .then(matches => {

        	var allmatches = matches.toJSON()

			logger.debug(allmatches)
			futureMatches = allmatches.filter(function(g){
							return g.date >= currentDate
						})
			nextMatch = futureMatches[0]
			pastMatches = allmatches.filter(function(g){
							return g.date < currentDate
						})
			var schedule = {
					nextMatch: nextMatch,
					futureMatches: futureMatches,
					pastMatches: pastMatches
				}
			return schedule
        })
        .then(result => Response(res, result) )
        .catch(error => Response(res, null, error))
    })


	return router;
});
