
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {
          fullName: 'John Smith',
          email: 'test1@gmail.com',
          password: 'password1'
        },
        {
          fullName: 'Jane Smith',
          email: 'test2@gmail.com',
          password: 'password2'
        },
        {
          fullName: 'Batman',
          email: 'test3@gmail.com',
          password: 'password3'
        },
      ]);
    });
};
