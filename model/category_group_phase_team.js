/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model']
    ,(DB) => {

    var Category_group_phase_team = DB.Model.extend({
        tableName: 'categories_groups_phases_teams',
        hasTimestamps: true,

        team: function(){
            return this.belongsTo('Team', 'team_id');
        }

        ,category: function(){
            return this.belongsTo('Category', 'category_id');
        }

        ,group: function(){
            return this.belongsTo('Group', 'group_id');
        }

        ,phase: function(){
            return this.belongsTo('Phase', 'phase_id');
        }

        ,status_type: function(){
            return this.belongsTo('Status_type', 'status_id');
        }

        ,entity: function(){
            return this.belongsTo('Entity', 'entity_id');
        }

    },{
        //Método para registrar un jugador en una competition tipo tryout
        findOrCreate: (_register) => {
            //Se verifica si tiene una entidad asociada o la creamos
            return DB._models.Category_group_phase_team
                .query(qb => {
                    qb.where({category_id: _register.category_id
                            ,entity_id: _register.entity_id 
                        })
                })
                .fetchAll()
            .then(result => {
                if(result.length == 0){
                    //si no se encuentra una entidad asociada al equipo, se crea una nueva
                    return new DB._models.Category_group_phase_team(_register).save()
                }
                else
                    return result
            })
        }
    })

    // uses Registry plugin
    return DB.model('Category_group_phase_team', Category_group_phase_team);
});
