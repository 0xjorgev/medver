00
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('positions').del(), 

    // Inserts seed entries
    knex('positions').
    insert([
    	//Five-a-side football
        {name_en:'Goalkeeper', short_name_en:'GK', name_en:'Portero', short_name_en:'P', 'subdiscipline_id': 1},
        {name_en:'Defender', short_name_en:'D', name_en:'Defensa', short_name_en:'Def', 'subdiscipline_id': 1},
        {name_en:'Midfielder', short_name_en:'M', name_en:'Centrocampista', short_name_en:'MC', 'subdiscipline_id': 1},
        {name_en:'Forward', short_name_en:'F', name_en:'Delantero', short_name_en:'Del', 'subdiscipline_id': 1},
        {name_en:'Undefined', short_name_en:'U', name_en:'Indeterminado', short_name_en:'I', 'subdiscipline_id': 1},

        //Soccer
        {name_en:'Goalkeeper', short_name_en:'GK', name_en:'Portero', short_name_en:'P', 'subdiscipline_id': 2},
        {name_en:'Defender', short_name_en:'D', name_en:'Defensa', short_name_en:'Def', 'subdiscipline_id': 2},
        {name_en:'Midfielder', short_name_en:'M', name_en:'Centrocampista', short_name_en:'MC', 'subdiscipline_id': 2},
        {name_en:'Forward', short_name_en:'F', name_en:'Delantero', short_name_en:'Del', 'subdiscipline_id': 2},
        {name_en:'Undefined', short_name_en:'U', name_en:'Indeterminado', short_name_en:'I', 'subdiscipline_id': 2},

        //Beach Soccer
        {name_en:'Goalkeeper', short_name_en:'GK', name_en:'Portero', short_name_en:'P', 'subdiscipline_id': 3},
        {name_en:'Defender', short_name_en:'D', name_en:'Defensa', short_name_en:'Def', 'subdiscipline_id': 3},
        {name_en:'Midfielder', short_name_en:'M', name_en:'Centrocampista', short_name_en:'MC', 'subdiscipline_id': 3},
        {name_en:'Forward', short_name_en:'F', name_en:'Delantero', short_name_en:'Del', 'subdiscipline_id': 3},
        {name_en:'Undefined', short_name_en:'U', name_en:'Indeterminado', short_name_en:'I', 'subdiscipline_id': 3}, 

        //Futsal
        {name_en:'Goalkeeper', short_name_en:'GK', name_en:'Portero', short_name_en:'P', 'subdiscipline_id': 4},
        {name_en:'Defender', short_name_en:'D', name_en:'Defensa', short_name_en:'Def', 'subdiscipline_id': 4},
        {name_en:'Midfielder', short_name_en:'M', name_en:'Centrocampista', short_name_en:'MC', 'subdiscipline_id': 4},
        {name_en:'Forward', short_name_en:'F', name_en:'Delantero', short_name_en:'Del', 'subdiscipline_id': 4},
        {name_en:'Undefined', short_name_en:'U', name_en:'Indeterminado', short_name_en:'I', 'subdiscipline_id': 4}
    ])
  );
};
