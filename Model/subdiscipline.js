var bookshelf = require("../config/bookshelf");
var Discipline = require('./discipline');
var Subdiscipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Subdiscipline',
    Discipline: function(){
      return this.belongsTo(Discipline, 'disciplineId');
    }
});

module.export = Subdiscipline;