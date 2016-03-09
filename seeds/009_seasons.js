exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations').del(),

    /*

            table.string('name').notNullable();
            table.string('description');
            table.string('game_title');
            table.boolean('active').notNullable().defaultTo(true);
            table.timestamp('init_at');
            table.timestamp('ends_at');
            table.timestamp('inscription_init_at');
            table.timestamp('inscription_ends_at');
            table.integer('competition_id').references('competitions.id').index();
            table.integer('category_id').references('categories.id').index();
            table.integer('gender_id').references('genders.id').index();

    */

    // Inserts seed entries
    knex('organizations')
    .insert(
        {name:'Opening 2016',description:'First Season of the Mushroom Cup!!',game_title:'Mushroom Cup',competition_id:1, category_id:1,gender_id:1 }
        )
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};