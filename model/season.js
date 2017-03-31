/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./competition', './category'], function (DB) {

    var Season = DB.Model.extend({
        tableName: 'seasons',
        hasTimestamps: true,

        //relations
        competition: function(){
            return this.belongsTo('Competition', 'competition_id');
        },
        categories: function(){
            return this.hasMany('Category');
        }
		,getCategoryTeamStatusCount: function(){
			return DB._models.Category_group_phase_team
			.query(qb => {
				qb.select('category_id, status_id, count(*)')
				qb.groupBy('1,2')
			})
		}
    });
    // uses Registry plugin
    return DB.model('Season', Season);
});
