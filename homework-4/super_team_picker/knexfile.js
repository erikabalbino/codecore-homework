const sharedConfig = {
  client: 'pg',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations',
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      database: 'cohorts_dev',
    },
  },

  staging: {
    ...sharedConfig,
    connection: {
      database: 'cohorts_staging',
    },
  },

  production: {
    ...sharedConfig,
    connection: {
      database: 'cohorts_production',
    },
  },
};
