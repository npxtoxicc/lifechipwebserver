
-- Create tables in the correct order to handle foreign key relationships

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob TEXT NOT NULL,
  blood_type TEXT NOT NULL,
  health_id TEXT NOT NULL
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  hospital TEXT,
  phone TEXT NOT NULL
);

-- Medical History table
CREATE TABLE IF NOT EXISTS medical_history (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  condition TEXT NOT NULL,
  diagnosed_date TEXT NOT NULL,
  notes TEXT
);

-- Allergies table
CREATE TABLE IF NOT EXISTS allergies (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  severity TEXT NOT NULL
);

-- Medical Scans table
CREATE TABLE IF NOT EXISTS medical_scans (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  date TEXT NOT NULL,
  file_url TEXT
);

-- Emergency Contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL
);

-- Patient-Doctor relationship table
CREATE TABLE IF NOT EXISTS patient_doctors (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false
);

-- Medications table
CREATE TABLE IF NOT EXISTS medications (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  schedule TEXT NOT NULL
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  patient_id INTEGER REFERENCES patients(id)
);
