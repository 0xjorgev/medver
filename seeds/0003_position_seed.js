
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('positions').del(), 

    // Inserts seed entries
    knex('positions').
    insert([
    	//Five-a-side football
        {name_en:'Goalkeeper', short_name_en:'GK', name_es:'Portero', short_name_es:'P', 'subdiscipline_id': 1},
        {name_en:'Defense', short_name_en:'D', name_es:'Defensa', short_name_es:'Def', 'subdiscipline_id': 1},
        {name_en:'Midfielder', short_name_en:'M', name_es:'Mediocampista', short_name_es:'MC', 'subdiscipline_id': 1},
        {name_en:'Forward', short_name_en:'F', name_es:'Delantero', short_name_es:'Del', 'subdiscipline_id': 1},
        {name_en:'Undefined', short_name_en:'U', name_es:'Indeterminado', short_name_es:'I', 'subdiscipline_id': 1},

        //Soccer
        {name_en:'Goalkeeper', short_name_en:'GK', name_es:'Portero', short_name_es:'P', 'subdiscipline_id': 2},
        {name_en:'Defense', short_name_en:'D', name_es:'Defensa', short_name_es:'Def', 'subdiscipline_id': 2},
        {name_en:'Midfielder', short_name_en:'M', name_es:'Mediocampista', short_name_es:'MC', 'subdiscipline_id': 2},
        {name_en:'Forward', short_name_en:'F', name_es:'Delantero', short_name_es:'Del', 'subdiscipline_id': 2},
        {name_en:'Undefined', short_name_en:'U', name_es:'Indeterminado', short_name_es:'I', 'subdiscipline_id': 2},

        //Beach Soccer
        {name_en:'Goalkeeper', short_name_en:'GK', name_es:'Portero', short_name_es:'P', 'subdiscipline_id': 3},
        {name_en:'Defense', short_name_en:'D', name_es:'Defensa', short_name_es:'Def', 'subdiscipline_id': 3},
        {name_en:'Midfielder', short_name_en:'M', name_es:'Mediocampista', short_name_es:'MC', 'subdiscipline_id': 3},
        {name_en:'Forward', short_name_en:'F', name_es:'Delantero', short_name_es:'Del', 'subdiscipline_id': 3},
        {name_en:'Undefined', short_name_en:'U', name_es:'Indeterminado', short_name_es:'I', 'subdiscipline_id': 3}, 

        //Futsal
        {name_en:'Goalkeeper', short_name_en:'GK', name_es:'Portero', short_name_es:'P', 'subdiscipline_id': 4},
        {name_en:'Defense', short_name_en:'D', name_es:'Defensa', short_name_es:'Def', 'subdiscipline_id': 4},
        {name_en:'Midfielder', short_name_en:'M', name_es:'Mediocampista', short_name_es:'MC', 'subdiscipline_id': 4},
        {name_en:'Forward', short_name_en:'F', name_es:'Delantero', short_name_es:'Del', 'subdiscipline_id': 4},
        {name_en:'Undefined', short_name_en:'U', name_es:'Indeterminado', short_name_es:'I', 'subdiscipline_id': 4}
    ])
  );
};
