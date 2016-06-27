
console.log(__filename.slice(__dirname.length + 1) + ' START')

console.log('9011 seeding teams')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('teams').del(),
    /*
    		table.string('name');
			table.string('logo_url');
			table.string('short_name');
			table.string('description');
			table.integer('category_id').references('categories.id').index();
			table.integer('organization_id').references('organizations.id').index();
    */
    // Inserts seed entries
    knex('teams').insert({name: 'Purple Team 1', short_name:'TT1', description:'Description of Test Team 1', logo_url:'https://s3.amazonaws.com/codefuel/media/12.png', category_type_id:1, organization_id:3}),
    knex('teams').insert({name: 'Brown Team 2', short_name:'TT2', description:'Description of Test Team 2', logo_url:'https://s3.amazonaws.com/codefuel/media/11.png', category_type_id:1, organization_id:3}),
    knex('teams').insert({name: 'Green Team 3', short_name:'TT3', description:'Description of Test Team 3', logo_url:'https://s3.amazonaws.com/codefuel/media/10.png', category_type_id:1, organization_id:3}),
    knex('teams').insert({name: 'Blue Team 4', short_name:'TT4', description:'Description of Test Team 4', logo_url:'https://s3.amazonaws.com/codefuel/media/09.png', category_type_id:3, organization_id:4}),
    knex('teams').insert({name: 'Yellow Team 5', short_name:'TT5', description:'Description of Test Team 5', logo_url:'https://s3.amazonaws.com/codefuel/media/08.png', category_type_id:3, organization_id:4}),
    knex('teams').insert({name: 'Cyan Team 6', short_name:'TT6', description:'Description of Test Team 6', logo_url:'https://s3.amazonaws.com/codefuel/media/07.png', category_type_id:3, organization_id:4}),
    knex('teams').insert({name: 'Codefuel', short_name:'CF', description:'Gorditos calvos, canosos, futboleros', logo_url:'', category_type_id:1, organization_id:1}),
    knex('teams').insert({name: 'Caracas Futbol Club', short_name:'CFC', description:'Caracas Futbol Club', logo_url:'', category_type_id:2, organization_id:2}),
    knex('teams').insert({name: 'Deportivo Tachira', short_name:'DPT', description:'Deportivo Tachira', logo_url:'', category_type_id:3, organization_id:1})
  );
};
console.log('9011 OK')

console.log(__filename.slice(__dirname.length + 1) + ' OK')