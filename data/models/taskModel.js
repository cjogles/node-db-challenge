const db = require('../dbConfig.js');
// const mappers = require('./mappers');

module.exports = {
  get,
  addTask
  // update,
  // remove,
  // getProjectTasks,
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

//     return query.then(tasks => {
//       return tasks.map(task => mappers.taskToBody(task));
//     });
//   },
//   insert: function(task) {
//     return db('tasks')
//       .insert(task)
//       .then(([id]) => this.get(id));
//   },
//   update: function(id, changes) {
//     return db('tasks')
//       .where('id', id)
//       .update(changes)
//       .then(count => (count > 0 ? this.get(id) : null));
//   },
//   remove: function(id) {
//     return db('tasks')
//       .where('id', id)
//       .del();
//   },
// };
