exports.up = function(knex) {
  return knex.schema.createTable('schools', table => {
    table.increments();

    table.string('name', 255).notNullable().unique();
    table.string('location', 255).notNullable().unique();
    table.float('requested_funds').notNullable();
    table.integer('admin_id').unsigned().references('id').inTable('admins')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('schools');
};
