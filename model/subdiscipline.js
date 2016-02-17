var bookshelf = require("../config/bookshelf");
var discipline = require('./discipline');
var subdiscipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Subdiscipline',
    Discipline: function(){
      return this.belongsTo(Discipline, 'disciplineId');
    }
});

// module.export = subdiscipline;