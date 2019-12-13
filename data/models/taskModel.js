const db = require('../dbConfig.js');
// const mappers = require('./mappers');

module.exports = {
  get,
  addTask
};

function get() {
  return db("tasks");
}

function findById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function addTask(taskBody){
  return db("tasks")
    .insert(taskBody, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
}
