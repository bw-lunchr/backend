const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  getSchoolsById
};

function find() {
  return db('admins').select('id', 'email', 'password');
}

function findBy(filter) {
  return db('admins').where(filter);
}

async function add(user) {
  const [id] = await db('admins').insert(user);

  return findById(id);
}

function findById(id) {
  return db('admins')
    .where({ id })
    .first();
}

function getSchoolsById(adminId) {
  return db('schools')
    .where('admin_id', adminId)
}