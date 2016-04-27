
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('phases').del(),
    /*

			table.string('name');
			table.integer('position');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('category_id').references('categories.id').index();

    */
    // Inserts seed entries
    knex('phases').insert({id: 1, name: 'Apertura', position:0, category_id:1}),
    knex('phases').insert({id: 2, name: 'Clausura', position:1, category_id:1})
  );
};
