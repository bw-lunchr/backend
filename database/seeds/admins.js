
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {
          email: 'test1@gmail.com',
          password: 'password1'
        },
        {
          email: 'test2@gmail.com',
          password: 'password2'
        },
        {
          email: 'test3@gmail.com',
          password: 'password3'
        },
      ]);
    });
};
