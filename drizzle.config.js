// drizzle.config.js
require('dotenv').config();

module.exports = {
  schema: './src/db/schema.js',
  out: './src/db/migrations/migrate.js',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};