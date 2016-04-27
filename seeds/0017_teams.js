
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('teams').del(),
    /*
    		table.string('name');
			table.string('logo');
			table.string('short_name');
			table.string('description');
			table.integer('category_id').references('categories.id').index();
			table.integer('organization_id').references('organizations.id').index();
    */
    // Inserts seed entries
    knex('teams').insert({id: 1, name: 'Codefuel', short_name:'CF', description:'Gorditos calvos, canosos, futboleros', logo:'', category_id:1, organization_id:1}),
    knex('teams').insert({id: 2, name: 'Caracas Futbol Club', short_name:'CFC', description:'Caracas Futbol Club', logo:'', category_id:2, organization_id:2}),
    knex('teams').insert({id: 3, name: 'Deportivo Tachira', short_name:'DPT', description:'Deportivo Tachira', logo:'', category_id:3, organization_id:1})
  );
};
