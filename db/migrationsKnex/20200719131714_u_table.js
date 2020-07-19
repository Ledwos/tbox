
exports.up = function(knex) {
    let createUserTasks = `CREATE TABLE u_table (
        u_id serial PRIMARY KEY,
        u_name VARCHAR (50) UNIQUE NOT NULL,
        u_pass VARCHAR (50) NOT NULL,
        u_email CITEXT UNIQUE NOT NULL
      );

      CREATE TABLE t_table (
        t_id serial PRIMARY KEY,
        t_name VARCHAR (50) NOT NULL,
        t_desc VARCHAR (200),
        t_user INTEGER REFERENCES u_table(u_id)
    );

      `;
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "citext"')
    .then(function() {
        return knex.raw(createUserTasks)
    });
  
};

exports.down = function(knex) {
  let dropQuery = `DROP TABLE u_table, t_table;`;
  return knex.raw(dropQuery);

};
