
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: "resource name", description: "resource description"},
        {id: 2, name: "resource name 2", description: "resource description 2"},
        {id: 3, name: "resource name 3", description: "resource description 3"}
      ]);
    });
};
