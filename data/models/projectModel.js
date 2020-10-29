const db = require('../dbConfig.js');
// const mappers = require('./mappers');

module.exports = {
  get,
  addProject
};

function get() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function addProject(projectBody){
  return db("projects")
    .insert(projectBody, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
}


