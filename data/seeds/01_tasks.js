
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: "task description", notes: "task notes", completed: false},
        {id: 2, description: "task description 2", notes: "task notes 2", completed: false},
        {id: 3, description: "task description 3", notes: "task notes 3", completed: false}
      ]);
    });
};
