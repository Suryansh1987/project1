
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';


const client = postgres(process.env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false
  }
});


export const db = drizzle(client, { schema });


export const testConnection = async () => {
  try {
   
    const result = await client`SELECT NOW() as now`;
    
    console.log('Database connection successful:', result[0].now);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};


export { client };