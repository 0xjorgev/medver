var bookshelf = require("../config/bookshelf");
var subdiscipline = require('.subdiscipline');
var Discipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Discipline',
    subdiscipline: function() {
       return this.belongsTo(Discipline, 'disciplineId');
    }
});
module.export = Discipline;