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
            // ,'entity.related_from.from.entity_type'
        ]})
        .then(result => {
            var user = result.toJSON()
			// logger.debug(user)
            //con esto se filtran las relaciones tipo 'coach' y owner
            return user.entity.related_from
                .filter(rel => {
                    var name = (rel.relationship_type.name == undefined)
						? ''
						: rel.relationship_type.name.toUpperCase()
                    return name == 'COACH' || name == 'OWNER'
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
		.fetch()
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

    //==========================================================================
	// CRUD functions
	//==========================================================================
	var saveTeam = function(data, res){
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
		var data = req.body
		data._currentUser = req._currentUser
		saveTeam(data, res)
	});

	//actualizacion de club
	router.put('/:club_id', function(req, res, next){
		var data = req.body
		data._currentUser = req._currentUser
		//setting the ID on the object to be saved is the way to signal bookshelf to create or update
		data.id = req.params.club_id
		saveTeam(data, res)
	});

	//inactivates the club
	router.delete('/:club_id', function(req, res){
		var clubId = req.params.club_id
		var clubData = {}
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

	return router;
});
