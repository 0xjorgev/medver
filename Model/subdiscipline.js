var bookshelf = require("../Config/bookshelf");
var Discipline = require('./Discipline');
var Subdiscipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Subdiscipline',
    Discipline: function(){
      return this.belongsTo(Discipline, 'disciplineId');
    }
});

module.export = Subdiscipline;