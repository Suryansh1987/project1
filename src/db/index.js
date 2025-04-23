// src/db/index.js
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';

// Create a postgres.js client
const client = postgres(process.env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false // Required for connecting to Neon DB
  }
});

// Create the Drizzle ORM instance with the postgres.js client
export const db = drizzle(client, { schema });

// Test the database connection
export const testConnection = async () => {
  try {
    // Run a simple query with postgres.js
    const result = await client`SELECT NOW() as now`;
    
    console.log('Database connection successful:', result[0].now);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Export the client for direct access if needed
export { client };