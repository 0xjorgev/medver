var bookshelf = require("../config/bookshelf");
var subdiscipline = require('./subdiscipline');
var discipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Discipline',
    Subdiscipline: function() {
       return this.hasMany(Subdiscipline, 'disciplineId');
    }
});
<<<<<<< HEAD
module.export = discipline;
=======
// module.export = discipline;
>>>>>>> jorge-model-specialization-16022016
