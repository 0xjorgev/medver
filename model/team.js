/*

			table.string('name');
			table.string('logo_url');
			table.string('short_name');
			table.string('description');
			table.integer('category_id').references('categories.id').index();
			table.integer('organization_id').references('organizations.id').index();

*/

/**
 * Created by george on 27/04/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './category', './organization'], function (DB) {

    var Team = DB.Model.extend({
        tableName: 'teams',
        hasTimestamps: true,

        // relations
        category: function(){
            return this.belongsTo('Category', 'category_id');
        },

        organization: function(){
            return this.belongsTo('Organization', 'organization_id');
        }



    });

    // uses Registry plugin
    return DB.model('Team', Team);
});