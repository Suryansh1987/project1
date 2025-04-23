import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { db } from './index.js';
import 'dotenv/config';


const runMigrations = async () => {
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
};

runMigrations();