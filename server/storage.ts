import { 
  type User, type InsertUser, type Patient, type InsertPatient, type MedicalHistory, type InsertMedicalHistory,
  type Allergy, type InsertAllergy, type MedicalScan, type InsertMedicalScan, type EmergencyContact, 
  type InsertEmergencyContact, type Doctor, type InsertDoctor, type Medication, type InsertMedication,
  type PatientDoctor, type InsertPatientDoctor, type PatientData
} from "@shared/schema";

// In-memory storage with initial data from patientData.json
import patientData from './data/patientData.json' assert { type: 'json' };
const store = {
  users: new Map<number, User>(),
  patients: new Map<number, Patient>([[1, patientData.patient]]),
  medicalHistory: new Map<number, MedicalHistory[]>([[1, patientData.medicalHistory]]),
  allergies: new Map<number, Allergy[]>([[1, patientData.allergies]]),
  medicalScans: new Map<number, MedicalScan[]>([[1, patientData.medicalScans]]),
  emergencyContacts: new Map<number, EmergencyContact[]>([[1, patientData.emergencyContacts]]),
  doctors: new Map<number, Doctor>([[1, patientData.primaryDoctor]]),
  patientDoctors: new Map<number, PatientDoctor[]>(),
  medications: new Map<number, Medication[]>([[1, patientData.medications]]),
  nextId: 2
};

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Patient operations
  getPatient(id: number): Promise<Patient | undefined>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  updatePatient(id: number, patient: Partial<InsertPatient>): Promise<Patient | undefined>;
  
  // Medical History operations
  getMedicalHistoryByPatientId(patientId: number): Promise<MedicalHistory[]>;
  createMedicalHistory(medicalHistory: InsertMedicalHistory): Promise<MedicalHistory>;
  
  // Allergy operations
  getAllergiesByPatientId(patientId: number): Promise<Allergy[]>;
  createAllergy(allergy: InsertAllergy): Promise<Allergy>;
  
  // Medical Scan operations
  getMedicalScansByPatientId(patientId: number): Promise<MedicalScan[]>;
  createMedicalScan(medicalScan: InsertMedicalScan): Promise<MedicalScan>;
  
  // Emergency Contact operations
  getEmergencyContactsByPatientId(patientId: number): Promise<EmergencyContact[]>;
  createEmergencyContact(emergencyContact: InsertEmergencyContact): Promise<EmergencyContact>;
  
  // Doctor operations
  getDoctor(id: number): Promise<Doctor | undefined>;
  getAllDoctors(): Promise<Doctor[]>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  // Patient-Doctor operations
  getPatientDoctorsByPatientId(patientId: number): Promise<PatientDoctor[]>;
  getPrimaryDoctorByPatientId(patientId: number): Promise<Doctor | undefined>;
  createPatientDoctor(patientDoctor: InsertPatientDoctor): Promise<PatientDoctor>;
  
  // Medication operations
  getMedicationsByPatientId(patientId: number): Promise<Medication[]>;
  createMedication(medication: InsertMedication): Promise<Medication>;
  
  // Get complete patient data
  getPatientData(patientId: number): Promise<PatientData | undefined>;
}

export class MemoryStorage implements IStorage {
  private getNextId(): number {
    return store.nextId++;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return store.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(store.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.getNextId();
    const newUser = { ...user, id };
    store.users.set(id, newUser);
    return newUser;
  }

  // Patient operations
  async getPatient(id: number): Promise<Patient | undefined> {
    return store.patients.get(id);
  }

  async createPatient(patient: InsertPatient): Promise<Patient> {
    const id = this.getNextId();
    const newPatient = { ...patient, id };
    store.patients.set(id, newPatient);
    return newPatient;
  }

  async updatePatient(id: number, patient: Partial<InsertPatient>): Promise<Patient | undefined> {
    const existingPatient = store.patients.get(id);
    if (!existingPatient) return undefined;

    const updatedPatient = { ...existingPatient, ...patient };
    store.patients.set(id, updatedPatient);
    return updatedPatient;
  }

  // Medical History operations
  async getMedicalHistoryByPatientId(patientId: number): Promise<MedicalHistory[]> {
    return store.medicalHistory.get(patientId) || [];
  }

  async createMedicalHistory(history: InsertMedicalHistory): Promise<MedicalHistory> {
    const id = this.getNextId();
    const newHistory = { ...history, id };
    const existing = store.medicalHistory.get(history.patientId) || [];
    store.medicalHistory.set(history.patientId, [...existing, newHistory]);
    return newHistory;
  }

  // Allergy operations
  async getAllergiesByPatientId(patientId: number): Promise<Allergy[]> {
    return store.allergies.get(patientId) || [];
  }

  async createAllergy(allergy: InsertAllergy): Promise<Allergy> {
    const id = this.getNextId();
    const newAllergy = { ...allergy, id };
    const existing = store.allergies.get(allergy.patientId) || [];
    store.allergies.set(allergy.patientId, [...existing, newAllergy]);
    return newAllergy;
  }

  // Medical Scan operations
  async getMedicalScansByPatientId(patientId: number): Promise<MedicalScan[]> {
    return store.medicalScans.get(patientId) || [];
  }

  async createMedicalScan(scan: InsertMedicalScan): Promise<MedicalScan> {
    const id = this.getNextId();
    const newScan = { ...scan, id };
    const existing = store.medicalScans.get(scan.patientId) || [];
    store.medicalScans.set(scan.patientId, [...existing, newScan]);
    return newScan;
  }

  // Emergency Contact operations
  async getEmergencyContactsByPatientId(patientId: number): Promise<EmergencyContact[]> {
    return store.emergencyContacts.get(patientId) || [];
  }

  async createEmergencyContact(contact: InsertEmergencyContact): Promise<EmergencyContact> {
    const id = this.getNextId();
    const newContact = { ...contact, id };
    const existing = store.emergencyContacts.get(contact.patientId) || [];
    store.emergencyContacts.set(contact.patientId, [...existing, newContact]);
    return newContact;
  }

  // Doctor operations
  async getDoctor(id: number): Promise<Doctor | undefined> {
    return store.doctors.get(id);
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return Array.from(store.doctors.values());
  }

  async createDoctor(doctor: InsertDoctor): Promise<Doctor> {
    const id = this.getNextId();
    const newDoctor = { ...doctor, id };
    store.doctors.set(id, newDoctor);
    return newDoctor;
  }

  // Patient-Doctor operations
  async getPatientDoctorsByPatientId(patientId: number): Promise<PatientDoctor[]> {
    return store.patientDoctors.get(patientId) || [];
  }

  async getPrimaryDoctorByPatientId(patientId: number): Promise<Doctor | undefined> {
    const relationships = store.patientDoctors.get(patientId) || [];
    const primaryRelationship = relationships.find(rel => rel.isPrimary);
    if (!primaryRelationship) return undefined;
    return store.doctors.get(primaryRelationship.doctorId);
  }

  async createPatientDoctor(relationship: InsertPatientDoctor): Promise<PatientDoctor> {
    const id = this.getNextId();
    const newRelationship = { ...relationship, id };
    const existing = store.patientDoctors.get(relationship.patientId) || [];
    store.patientDoctors.set(relationship.patientId, [...existing, newRelationship]);
    return newRelationship;
  }

  // Medication operations
  async getMedicationsByPatientId(patientId: number): Promise<Medication[]> {
    return store.medications.get(patientId) || [];
  }

  async createMedication(medication: InsertMedication): Promise<Medication> {
    const id = this.getNextId();
    const newMedication = { ...medication, id };
    const existing = store.medications.get(medication.patientId) || [];
    store.medications.set(medication.patientId, [...existing, newMedication]);
    return newMedication;
  }

  // Get complete patient data
  async getPatientData(patientId: number): Promise<PatientData | undefined> {
    const patient = await this.getPatient(patientId);
    if (!patient) return undefined;

    const [
      medicalHistory,
      allergies,
      medicalScans,
      emergencyContacts,
      primaryDoctor,
      medications
    ] = await Promise.all([
      this.getMedicalHistoryByPatientId(patientId),
      this.getAllergiesByPatientId(patientId),
      this.getMedicalScansByPatientId(patientId),
      this.getEmergencyContactsByPatientId(patientId),
      this.getPrimaryDoctorByPatientId(patientId),
      this.getMedicationsByPatientId(patientId)
    ]);

    return {
      patient,
      medicalHistory,
      allergies,
      medicalScans,
      emergencyContacts,
      primaryDoctor,
      medications
    };
  }
}

export const storage = new MemoryStorage();