const db = require('../database/db-config.js');

module.exports = {
  find,
  findById, 
  add, 
  update, 
  remove,
}

function find() {
  return db('schools')
}

function findById(id) {
  // first() returns the first entry in the db matching the query
  return db('schools')
    .where({ id })
    .first()
}

function add(newSchool) {
  return db('schools')
    .insert(newSchool)
    .then(([id]) => {
      return findById(id);
    });
}

function update(updatedSchool, id) {
  return db('schools')
  .where({ id })
  .update(updatedSchool);
}

function remove(id) {
  return db('schools')
  .where('id', id)
  .del();
}
