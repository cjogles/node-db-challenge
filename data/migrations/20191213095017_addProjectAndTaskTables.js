
exports.up = function(knex) {
  return knex.schema
// {id: 1, description: "task description", notes: "task notes", completed: false}
    .createTable("tasks", table => {
      table.increments()
      table.string("description", 256)
        .notNullable()
        .unique()
      table.string("notes")
      table.boolean("completed")
        .notNullable()
        .defaultTo(false)
    })
// {id: 1, name: "resource name", description: "resource description"}
    .createTable("resources", table => {
      table.increments()
      table.string("name", 256)
        .notNullable()
        .unique()
      table.string("description", 256)
        .notNullable()
        .unique()
    })
// {id: 1, name: "project name" description: "project description", completed: false, resources_id: 1, task_id: 1}
    .createTable("projects", table => {
      table.increments()
      table.string("name", 256)
        .unique()
        .notNullable()
      table.string("description", 256)
        .notNullable()
        .unique()
      table.boolean("completed")
        .notNullable()
        .defaultTo(false)
      table.integer("resources_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      table.integer("task_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("projects")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
};
