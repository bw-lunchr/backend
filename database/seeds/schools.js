
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('schools').del()
    .then(function () {
      // Inserts seed entries
      return knex('schools').insert([
        {
          name: 'Oakwood High',
          location: '152 Harbour Pointe Blvd.',
          requested_funds: 2000.00,
          admin_id: 1,
        },
        {
          name: 'Horizon Academy',
          location: '4222 W. Casino Road',
          requested_funds: 2500.00,
          admin_id: 1,
        },
        {
          name: 'East Bridge Elementary',
          location: '2660 Mukilteo Speedway',
          requested_funds: 1500.00,
          admin_id: 2,
        },
        {
          name: 'Forest Lake Secondary School',
          location: '1171 4th Ave. W',
          requested_funds: 1700.00,
          admin_id: 3,
        },
        {
          name: 'White Mountain Charter School',
          location: '625 Madison Way',
          requested_funds: 2100.00,
          admin_id: 3,
        },
        {
          name: 'Faraday Grammar School',
          location: '1401 Beverly Park Road',
          requested_funds: 1850.00,
          admin_id: 3,
        },
      ]);
    });
};
