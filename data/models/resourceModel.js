const db = require('../dbConfig.js');
// const mappers = require('./mappers');

module.exports = {
  get,
  addResource
};

function get() {
  return db("resources");
}

function findById(id) {
  return db("resources")
    .where({ id })
    .first();
}

function addResource(resourceBody){
  return db("resources")
    .insert(resourceBody, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
}