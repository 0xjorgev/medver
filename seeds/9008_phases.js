console.log('9008 seeding teams')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('phases').del(),
    /*

      table.integer('position');
      table.integer('participant_team');
      table.integer('classified_team');
      table.boolean('active').notNullable().defaultTo(true);
      table.integer('category_id').references('categories.id').index();
      table.integer('previus').references('phases.id').index();
      table.integer('next').references('phases.id').index();
    */
    // Inserts seed entries
    knex('phases').insert({name: 'Apertura', position:0, category_id:1, participant_team:4, classified_team:2}),
    knex('phases').insert({name: 'Clausura', position:1, category_id:1, participant_team:2, classified_team:1})
  );
};
console.log('9008 end')