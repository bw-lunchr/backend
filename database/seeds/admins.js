
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {
          email: 'test@gmail.com', 
          password: 'password123'
        }
      ]);
    });
};
