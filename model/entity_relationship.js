if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './relationship_type']
    ,function (DB) {
    var Entity_relationship = DB.Model.extend({
        tableName: 'entities_relationships'
        ,hasTimestamps: true
        ,relationship_type: function(){
          return this.belongsTo('Relationship_type', 'relationship_type_id');
        }
        ,from: function(){
          return this.belongsTo('Entity','ent_ref_from_id');
        }
        ,to: function(){
          return this.belongsTo('Entity','ent_ref_to_id');
        }
    }
    ,{
        //Método para encontrar o crear una nueva relacion
        findOrCreate: function(_entity_rela){
            // console.log('Create entity')
            // console.log(_entity)
            //Se verifica si tiene una entidad asociada o la creamos
            return DB._models.Entity_relationship
                .query(qb => {
                    qb.where({ent_ref_from_id: _entity_rela.ent_ref_from_id
                            ,ent_ref_to_id: _entity_rela.ent_ref_to_id 
                            ,relationship_type_id: _entity_rela.relationship_type_id})
                })
                .fetchAll()
            .then(result => {
                if(result.length == 0){
                    //si no se encuentra una entidad asociada al equipo, se crea una nueva
                    return new DB._models.Entity_relationship(_entity_rela).save()
                }
                else
                    return result
            })
        }
    });

    // uses Registry plugin
    return DB.model('Entity_relationship', Entity_relationship);
});
