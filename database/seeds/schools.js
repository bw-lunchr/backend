
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('schools').del()
    .then(function () {
      // Inserts seed entries
      return knex('schools').insert([
        {
          name: 'Oakwood High',
          location: '75 Gates Ave., Bemidji, MN 56601',
          requested_funds: 2000.00,
          admin_id: 1,
        },
        {
          name: 'Horizon Academy',
          location: '554 Lake Court, Decatur, GA 30030',
          requested_funds: 2500.00,
          admin_id: 1,
        },
        {
          name: 'East Bridge Elementary',
          location: '199 Rockwell Drive, Savannah, GA 31404',
          requested_funds: 1500.00,
          admin_id: 2,
        },
        {
          name: 'Forest Lake Secondary School',
          location: '81 Sutor St., Fishers, IN 46037',
          requested_funds: 1700.00,
          admin_id: 3,
        },
        {
          name: 'White Mountain Charter School',
          location: '8995B Corona St., Zionsville, IN 46077',
          requested_funds: 700.00,
          admin_id: 3,
        },
        {
          name: 'Faraday Grammar School',
          location: '7931 Jones Avenue, Iowa City, IA 52240',
          requested_funds: 1850.00,
          admin_id: 3,
        },
        {
          name: 'Ricky Bobby Elementary',
          location: '361 Meadow Street, Fishers, IN 46037',
          requested_funds: 850.00,
          admin_id: 3,
        },
      ]);
    });
};
