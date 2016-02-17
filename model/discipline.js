var bookshelf = require("../config/bookshelf");
var subdiscipline = require('.subdiscipline');
var discipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Discipline',
    subdiscipline: function() {
       return this.belongsTo(Discipline, 'disciplineId');
    }
});
module.export = discipline;