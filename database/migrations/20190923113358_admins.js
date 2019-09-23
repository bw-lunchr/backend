exports.up = function(knex) {
  return knex.schema.createTable('admins', table => {
    table.increments();

    table
      .string('email', 255)
      .notNullable()
      .unique();
    table.string('password', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('admins');
};
