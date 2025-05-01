import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Patient Model
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dob: text("dob").notNull(),
  bloodType: text("blood_type").notNull(),
  healthId: text("health_id").notNull(),
});

// Define patient relations
export const patientsRelations = relations(patients, ({ many }) => ({
  medicalHistory: many(medicalHistory),
  allergies: many(allergies),
  medicalScans: many(medicalScans),
  emergencyContacts: many(emergencyContacts),
  patientDoctors: many(patientDoctors),
  medications: many(medications),
}));

// Medical History Model
export const medicalHistory = pgTable("medical_history", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id, { onDelete: 'cascade' }),
  condition: text("condition").notNull(),
  diagnosedDate: text("diagnosed_date").notNull(),
  notes: text("notes"),
});

// Define medical history relations
export const medicalHistoryRelations = relations(medicalHistory, ({ one }) => ({
  patient: one(patients, {
    fields: [medicalHistory.patientId],
    references: [patients.id],
  }),
}));

// Allergy Model
export const allergies = pgTable("allergies", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  severity: text("severity").notNull(),
});

// Define allergies relations
export const allergiesRelations = relations(allergies, ({ one }) => ({
  patient: one(patients, {
    fields: [allergies.patientId],
    references: [patients.id],
  }),
}));

// Medical Scan Model
export const medicalScans = pgTable("medical_scans", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id, { onDelete: 'cascade' }),
  type: text("type").notNull(),
  date: text("date").notNull(),
  fileUrl: text("file_url"),
});

// Define medical scans relations
export const medicalScansRelations = relations(medicalScans, ({ one }) => ({
  patient: one(patients, {
    fields: [medicalScans.patientId],
    references: [patients.id],
  }),
}));

// Emergency Contact Model
export const emergencyContacts = pgTable("emergency_contacts", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  relationship: text("relationship").notNull(),
  phone: text("phone").notNull(),
});

// Define emergency contacts relations
export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
  patient: one(patients, {
    fields: [emergencyContacts.patientId],
    references: [patients.id],
  }),
}));

// Doctor Model
export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  hospital: text("hospital"),
  phone: text("phone").notNull(),
});

// Define doctor relations
export const doctorsRelations = relations(doctors, ({ many }) => ({
  patientDoctors: many(patientDoctors),
}));

// Patient-Doctor relationship
export const patientDoctors = pgTable("patient_doctors", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id, { onDelete: 'cascade' }),
  doctorId: integer("doctor_id").notNull().references(() => doctors.id, { onDelete: 'cascade' }),
  isPrimary: boolean("is_primary").default(false),
});

// Define patient-doctor relations
export const patientDoctorsRelations = relations(patientDoctors, ({ one }) => ({
  patient: one(patients, {
    fields: [patientDoctors.patientId],
    references: [patients.id],
  }),
  doctor: one(doctors, {
    fields: [patientDoctors.doctorId],
    references: [doctors.id],
  }),
}));

// Medication Model
export const medications = pgTable("medications", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  schedule: text("schedule").notNull(),
});

// Define medications relations
export const medicationsRelations = relations(medications, ({ one }) => ({
  patient: one(patients, {
    fields: [medications.patientId],
    references: [patients.id],
  }),
}));

// Additional user-related tables for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  patientId: integer("patient_id").references(() => patients.id),
});

// Define users relations
export const usersRelations = relations(users, ({ one }) => ({
  patient: one(patients, {
    fields: [users.patientId],
    references: [patients.id],
  }),
}));

// Schemas for validation
export const insertPatientSchema = createInsertSchema(patients);
export const insertMedicalHistorySchema = createInsertSchema(medicalHistory);
export const insertAllergySchema = createInsertSchema(allergies);
export const insertMedicalScanSchema = createInsertSchema(medicalScans);
export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts);
export const insertDoctorSchema = createInsertSchema(doctors);
export const insertPatientDoctorSchema = createInsertSchema(patientDoctors);
export const insertMedicationSchema = createInsertSchema(medications);
export const insertUserSchema = createInsertSchema(users, {
  password: z.string().min(6),
}).omit({ id: true });

// Types for use in application
export type Patient = typeof patients.$inferSelect;
export type InsertPatient = z.infer<typeof insertPatientSchema>;

export type MedicalHistory = typeof medicalHistory.$inferSelect;
export type InsertMedicalHistory = z.infer<typeof insertMedicalHistorySchema>;

export type Allergy = typeof allergies.$inferSelect;
export type InsertAllergy = z.infer<typeof insertAllergySchema>;

export type MedicalScan = typeof medicalScans.$inferSelect;
export type InsertMedicalScan = z.infer<typeof insertMedicalScanSchema>;

export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;

export type Doctor = typeof doctors.$inferSelect;
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;

export type PatientDoctor = typeof patientDoctors.$inferSelect;
export type InsertPatientDoctor = z.infer<typeof insertPatientDoctorSchema>;

export type Medication = typeof medications.$inferSelect;
export type InsertMedication = z.infer<typeof insertMedicationSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Complete patient data type including all related information
export interface PatientData {
  patient: Patient;
  medicalHistory: MedicalHistory[];
  allergies: Allergy[];
  medicalScans: MedicalScan[];
  emergencyContacts: EmergencyContact[];
  primaryDoctor?: Doctor;
  medications: Medication[];
}
