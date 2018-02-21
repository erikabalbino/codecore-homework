
exports.up = function (knex, Promise) {
  return knex.schema.createTable('cohorts', table => {
    table.increments('id');
    table.string('logoUrl');
    table.string('name');
    table.text('members');
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cohorts');
};
