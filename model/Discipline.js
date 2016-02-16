var bookshelf = require("../config/bookshelf");
var subdiscipline = require('./subdiscipline');
var discipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Discipline',
    Subdiscipline: function() {
       return this.hasMany(Subdiscipline, 'disciplineId');
    }
});
module.export = discipline;