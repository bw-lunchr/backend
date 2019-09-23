// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { 
      filename: './database/auth.db3' 
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { 
      directory: './database/seeds' 
    },
  },

  production: {
    client: 'pg', // install this package
    connection: process.env.DATABASE_URL, // heroku sets this evn variable
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

};
