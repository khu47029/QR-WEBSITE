import { Pool } from "pg";
import { drizzle } from "drizzle-orm/pg-core";
import * as schema from "./schema";

// Create a PostgreSQL connection pool using Supabase connection string.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requires SSL; rejectUnauthorized false for self‑signed certs.
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
export type DB = typeof db;
