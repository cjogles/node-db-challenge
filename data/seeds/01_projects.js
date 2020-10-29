
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: "project name", description: "project description", completed: false, task_id: 1, resources_id: 1},
        {id: 2, name: "project name 2", description: "project description 2", completed: false, task_id: 2, resources_id: 2},
        {id: 3, name: "project name 3", description: "project description 3", completed: false, task_id: 3, resources_id: 3}
      ]);
    });
};
