if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'
    ,'../util/logger_util'
], (DB, logger) => {

    let Team = DB.Model.extend({
        tableName: 'teams',
        hasTimestamps: true,

        // relations
        category_type: function(){
            return this.belongsTo('Category_type', 'category_type_id');
        }
		,subdiscipline: function(){
            return this.belongsTo('Subdiscipline', 'subdiscipline_id');
        }
		,gender: function(){
            return this.belongsTo('Gender', 'gender_id');
        }
		,organization: function(){
            return this.belongsTo('Organization', 'organization_id');
        }
		,player_team: function(){
            return this.hasMany('Player_team', 'team_id');
        }
		,category_group_phase_team: function(){
            return this.hasMany('Category_group_phase_team', 'team_id');
        }
		,match_player_team: function(){
            return this.hasMany('Match_team_player', 'team_id');
        }
		,summoned: function(){
            return this.hasMany('Category_team_player', 'team_id');
        }
        ,entity : function(){
          return this.morphOne('Entity', 'object');
        }
        ,club : function(){
          return this.belongsTo('Club', 'club_id');
        }
    },{
        //metodos
        //saveTeam un team y sus relaciones con un usuario
        saveTeam: function(_team){
            var teamData = {}
            if (_team.name != undefined) teamData.name = _team.name.trim()
            if (_team.logo_url != undefined) teamData.logo_url = _team.logo_url
            if (_team.portrait_url != undefined) teamData.portrait_url = _team.portrait_url
            if (_team.category_type_id != undefined) teamData.category_type_id = _team.category_type_id
            if (_team.subdiscipline_id != undefined) teamData.subdiscipline_id = _team.subdiscipline_id
            if (_team.gender_id != undefined) teamData.gender_id = _team.gender_id
            if (_team.meta != undefined) teamData.meta = _team.meta
            if (_team.short_name != undefined) teamData.short_name = _team.short_name
            if (_team.description != undefined) teamData.description = _team.description
            if (_team.club_id != undefined) teamData.club_id = _team.club_id
            if (_team.id != undefined) teamData.id = _team.id

            //para asociar las entidades
            var teamEntity = null
            var userEntity = null
			let savedTeam = null

            return new DB._models.Team(teamData).save()
            .then(result => {
				savedTeam = result
                teamData.id = result.attributes.id
                //se obtienen las entidades del team y del user en un solo query
                return DB._models.Entity
                .query(qb => {
                    qb.where({object_id: result.attributes.id,
                        object_type: 'teams' })
                    qb.orWhere({object_id: _team._currentUser.id})
                    qb.where({object_type: 'users'})
                })
                .fetchAll()
            })
            .then(result => {
                var tmp = result.toJSON()
                teamEntity = tmp.filter(e => e.object_type == 'teams')
                userEntity = tmp.filter(e => e.object_type == 'users')
                //la entidad usuario *debe* estar creada para este punto,
                //o bien no sería usuario válido
                //si no se obtiene una entidad para el equipo, se crea
                if(teamEntity.length == 0){
                    //si no se encuentra una entidad asociada al equipo, se crea una nueva
                    return new DB._models.Entity({
                            object_id: savedTeam.id
                            ,object_type: 'teams'})
                            .save()
                }
                return result
            })
            .then(result => {
                if (_team.id) {
                    // los siguientes bloques de promises solo aplican cuando se está
                    // creando el team.
                    // en caso de actualización, simplemente se retorna
                    // el resultado del update y se termina el servicio
                    //TODO: los bloques anteriores no son necesarios cuando se hace update. fix!
                    return result
                }
                else{
                    // En caso de que la entidad team se haya creado en el promise anterior
                    // se asigna a teamEntity
                    if(teamEntity == null || teamEntity.length == 0)
                        teamEntity = result.toJSON()
                    // En caso de que sea una operación POST
                    // se asocia el usuario que se está creando
                    // con el team como owner del mismo
                    // logger.log('Se hace la creacion de la realacion de la entidad con el usuario: ', userEntity[0].id)
                    return new DB._models.Entity_relationship({
                        ent_ref_from_id: userEntity[0].id
                        ,ent_ref_to_id: teamEntity.id
                        ,relationship_type_id: 1
                        ,comment: 'OWNER'
                    }).save()
                }
            })
            .then(result => {
                //return the complete information of the team
                return DB._models.Team
                .where({id:teamData.id, active:true})
                .fetch({withRelated: ['category_type'
                    ,'organization'
                    ,'player_team.player'
                    ,'subdiscipline'
                    ,'gender'
                    ,'entity'
                    ,'player_team.position']})
            })
        }
    })

    // uses Registry plugin
    return DB.model('Team', Team);
});
