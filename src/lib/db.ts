import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Load environment variables
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

// Create a neon client
const sql = neon(DATABASE_URL);

// Create drizzle database instance with schema
export const db = drizzle(sql, { schema });