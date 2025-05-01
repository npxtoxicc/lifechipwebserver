import { db } from "../db";
import { log } from "../vite";
import { sql } from "drizzle-orm";

// Sample data function
export async function seedDatabase() {
  log("Checking if database seed is needed...");
  
  // Check if there are any patients already using raw SQL
  try {
    const result = await db.execute(sql`SELECT COUNT(*) FROM patients`);
    const count = parseInt(result.rows[0]?.count || '0');
    
    if (count > 0) {
      log("Database already has data, skipping seed");
      return;
    }
  } catch (error) {
    log("Error checking for existing patients, might be first run");
  }
  
  log("Seeding database with initial data...");
  
  try {
    // Insert Patient using raw SQL
    const patientResult = await db.execute(sql`
      INSERT INTO patients (name, dob, blood_type, health_id)
      VALUES ('Sarah Johnson', '1985-04-12', 'A+', 'HID-1234567')
      RETURNING id, name
    `);
    
    const patientId = patientResult.rows[0]?.id;
    const patientName = patientResult.rows[0]?.name;
    
    if (!patientId) {
      throw new Error("Failed to create patient record");
    }
    
    log(`Created patient: ${patientName} with ID: ${patientId}`);
    
    // Insert Medical History using raw SQL
    await db.execute(sql`
      INSERT INTO medical_history (patient_id, condition, diagnosed_date, notes)
      VALUES 
        (${patientId}, 'Asthma', '2005-06-15', 'Mild, controlled with inhalers'),
        (${patientId}, 'Appendectomy', '2010-03-22', 'Laparoscopic procedure, no complications'),
        (${patientId}, 'Migraines', '2015-11-04', 'Triggered by stress and bright lights')
    `);
    
    // Insert Allergies using raw SQL
    await db.execute(sql`
      INSERT INTO allergies (patient_id, name, severity)
      VALUES 
        (${patientId}, 'Penicillin', 'High'),
        (${patientId}, 'Peanuts', 'Moderate'),
        (${patientId}, 'Latex', 'Low')
    `);
    
    // Insert Medical Scans using raw SQL
    await db.execute(sql`
      INSERT INTO medical_scans (patient_id, type, date, file_url)
      VALUES 
        (${patientId}, 'Chest X-Ray', '2022-02-10', '/api/files/chest-xray.pdf'),
        (${patientId}, 'MRI - Brain', '2023-05-18', '/api/files/brain-mri.pdf'),
        (${patientId}, 'CT Scan - Chest', '2023-09-30', '/api/files/chest-ct.pdf')
    `);
    
    // Insert Emergency Contacts using raw SQL
    await db.execute(sql`
      INSERT INTO emergency_contacts (patient_id, name, relationship, phone)
      VALUES 
        (${patientId}, 'Michael Johnson', 'Husband', '+1-555-123-4567'),
        (${patientId}, 'Emma Williams', 'Sister', '+1-555-987-6543')
    `);
    
    // Insert Doctors using raw SQL
    const doctor1Result = await db.execute(sql`
      INSERT INTO doctors (name, specialty, hospital, phone)
      VALUES ('Dr. Jane Smith', 'General Practitioner', 'City Medical Center', '+1-555-222-3333')
      RETURNING id
    `);
    
    const doctor2Result = await db.execute(sql`
      INSERT INTO doctors (name, specialty, hospital, phone)
      VALUES ('Dr. Robert Chen', 'Neurologist', 'University Hospital', '+1-555-444-5555')
      RETURNING id
    `);
    
    const doctor1Id = doctor1Result.rows[0]?.id;
    const doctor2Id = doctor2Result.rows[0]?.id;
    
    if (!doctor1Id || !doctor2Id) {
      throw new Error("Failed to create doctor records");
    }
    
    // Make Dr. Jane Smith the primary doctor using raw SQL
    await db.execute(sql`
      INSERT INTO patient_doctors (patient_id, doctor_id, is_primary)
      VALUES 
        (${patientId}, ${doctor1Id}, true),
        (${patientId}, ${doctor2Id}, false)
    `);
    
    // Insert Medications using raw SQL
    await db.execute(sql`
      INSERT INTO medications (patient_id, name, dosage, schedule)
      VALUES 
        (${patientId}, 'Ventolin Inhaler', '2 puffs', 'As needed for asthma symptoms'),
        (${patientId}, 'Sumatriptan', '50mg', 'At onset of migraine, max 2 tablets per 24 hours'),
        (${patientId}, 'Vitamin D', '1000 IU', 'Daily with food')
    `);
    
    log("Database seeded successfully!");
  } catch (error) {
    log("Error seeding database: " + error);
    throw error;
  }
}