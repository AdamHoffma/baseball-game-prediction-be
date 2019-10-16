// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/database.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "DB",
      user: "user",
      password: "password"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "DB",
      user: "user",
      password: "password"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/authTest.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./database/migrations"
    }
  }
};
