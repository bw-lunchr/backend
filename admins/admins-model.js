const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  getSchoolsById,
  update
};

function find() {
  return db('admins').select('id', 'email', 'password');
}

function findBy(filter) {
  console.log(filter)
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

function update(updatedAdmin, adminId) {
  return db('admins')
  .where('id', adminId)
  .update(updatedAdmin)
  .then((id) => {
    return findById(adminId);
  });
}