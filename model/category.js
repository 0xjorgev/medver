if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['./base_model','./gender','./season', './phase', './classification', './category_type','./category_group_phase_team'], function (DB) {

    let Category = DB.Model.extend({
        tableName: 'categories'
        ,hasTimestamps: true

        //relations
        ,category_type: function(){
            return this.belongsTo('Category_type', 'category_type_id');
        }

        ,gender: function(){
            return this.belongsTo('Gender', 'gender_id');
        }

        ,season: function(){
            return this.belongsTo('Season', 'season_id');
        }

        ,classification:  function(){
            return this.belongsTo('Classification', 'classification_type_id');
        }

        ,phases: function(){
            return this.hasMany('Phase', 'category_id');
        }
        //later
        ,teams: function(){
            return this.hasMany('Team', 'category_id');
        }

        ,category_group_phase_team: function(){
            return this.hasMany('Category_group_phase_team', 'category_id');
        }

		//alias de category_group_phase_team
		,participants: function(){
			return this.hasMany('Category_group_phase_team', 'category_id');
		}
        
        ,entity : function(){
          return this.morphOne('Entity', 'object');
        }
	},
    {
        createCategory: function(_c){
            let category = {}
            let newCategory = {}

            return new DB._models.Category(_c).save()
            .then(result => {
                newCategory = result.toJSON()
                //Se crea un objeto entidad
                let entity = {}
                entity.object_id = newCategory.id
                entity.object_type = 'categories'
                return DB._models.Entity.findOrCreate(entity)
            })
            .then(_result => {
                return DB._models.Category
                    .where({id: newCategory.id})
                    .fetch({withRelated: ['entity']})
            })
        }
    })

    // uses Registry plugin
    return DB.model('Category', Category);
});
