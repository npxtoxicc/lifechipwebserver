import { db } from "./db";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import * as schema from "@shared/schema";
import { Pool } from "@neondatabase/serverless";
import { seedDatabase } from "./data/seedData";
import { log } from "./vite";

export async function initializeDatabase() {
  try {
    // Run migrations using drizzle-kit push (programmatically)
    log("Running database migrations...");
    
    // Get all SQL tables defined in our schema
    const tables = Object.values(schema)
      .filter(val => typeof val === 'object' && val !== null && 'name' in val)
      .map(table => (table as any).name);
      
    log(`Found ${tables.length} tables in schema`);
    
    // Create the database tables if they don't exist
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    
    const pool = new Pool({ connectionString });
    const migrationDb = drizzle(pool);
    
    // First check if tables exist - try to query one of our tables
    let tablesExist = false;
    try {
      // Simple check to see if tables are created
      log("Checking if database is initialized...");
      const result = await migrationDb.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'patients'
        )
      `);
      
      const exists = result.rows && result.rows[0] && result.rows[0].exists === true;
      if (exists) {
        log("Database tables already exist");
        tablesExist = true;
      } else {
        log("Tables don't exist yet");
        tablesExist = false;
      }
    } catch (error) {
      log("Error checking tables, assuming they don't exist");
      tablesExist = false;
    }
      
    if (!tablesExist) {
      // Tables don't exist, create the schema
      log("Creating database tables...");
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
      
      // Use manual schema creation instead of drizzle push 
      // Since each table references others, we need to create them in order
      
      // Create patients table first (no dependencies)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          dob TEXT NOT NULL,
          blood_type TEXT NOT NULL,
          health_id TEXT NOT NULL
        )
      `);
      
      // Create doctors table (no dependencies)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS doctors (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          specialty TEXT NOT NULL,
          hospital TEXT,
          phone TEXT NOT NULL
        )
      `);
      
      // Create medical history table (depends on patients)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS medical_history (
          id SERIAL PRIMARY KEY,
          patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
          condition TEXT NOT NULL,
          diagnosed_date TEXT NOT NULL,
          notes TEXT
        )
      `);
      
      // Create allergies table (depends on patients)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS allergies (
          id SERIAL PRIMARY KEY,
          patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          severity TEXT NOT NULL
        )
      `);
      
      // Create medical scans table (depends on patients)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS medical_scans (
          id SERIAL PRIMARY KEY,
          patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
          type TEXT NOT NULL,
          date TEXT NOT NULL,
          file_url TEXT
        )
      `);
      
      // Create emergency contacts table (depends on patients)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS emergency_contacts (
          id SERIAL PRIMARY KEY,
          patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          relationship TEXT NOT NULL,
          phone TEXT NOT NULL
        )
      `);
      
      // Create patient-doctor relationship table (depends on patients and doctors)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS patient_doctors (
          id SERIAL PRIMARY KEY,
          patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
          doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
          is_primary BOOLEAN DEFAULT false
        )
      `);
      
      // Create medications table (depends on patients)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS medications (
          id SERIAL PRIMARY KEY,
          patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          dosage TEXT NOT NULL,
          schedule TEXT NOT NULL
        )
      `);
      
      // Create users table (depends on patients)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          patient_id INTEGER REFERENCES patients(id)
        )
      `);
      
      log("Database tables created successfully");
    }
    
    // Seed database with initial data
    await seedDatabase();
    
    log("Database initialization completed successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

// Helper for SQL template strings
function sql(strings: TemplateStringsArray, ...values: any[]) {
  let query = strings[0];
  for (let i = 0; i < values.length; i++) {
    query += values[i] + strings[i + 1];
  }
  return query;
}