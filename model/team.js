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
        // ,player_team: function(){
        //     return this.hasMany('Player_team', 'team_id');
        // }
        ,player: function(){
            return this.hasMany('Player', 'team_id');
        }
		,category_group_phase_team: function(){
            return this.hasMany('Category_group_phase_team', 'team_id');
        }
        // ,match_player_team: function(){
        //     return this.hasMany('Match_team_player', 'team_id');
        // }
        ,match_player: function(){
            return this.hasMany('Match_player', 'team_id');
        }
		,summoned: function(){
            return this.hasMany('Category_summoned', 'team_id');
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
        saveTeam: function(_team, _currentUser){
            let teamData = _team
            let user = _currentUser
            //para asociar las entidades
            let teamEntity = null
            let userEntity = null
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
                    qb.orWhere({object_id: user.id})
                    qb.where({object_type: 'users'})
                })
                .fetchAll()
            })
            .then(result => {
                let tmp = result.toJSON()
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
                else
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
                .where({id:teamData.id, active: true})
                .fetch({withRelated: ['category_type'
                    ,'organization'
                    ,'player.person'
                    ,'subdiscipline'
                    ,'player.person.gender'
                    ,'entity'
                    ,'player.position'
                    ,'club']})
            })
        }
    })

    // uses Registry plugin
    return DB.model('Team', Team);
});
