/**
 * Created by Francisco on 19/10/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model'], function (DB) {

	var Entity_type = DB.Model.extend({
		tableName: 'entities_types',
		hasTimestamps: true,
		entities:  function(){
			return this.hasMany('Entity');
		}
	});

	// uses Registry plugin
	return DB.model('Entity_type', Entity_type);
});
