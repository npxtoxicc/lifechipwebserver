// Types for medical card data that we'll use in the frontend
// These match the schema.ts but are simplified for frontend use

export interface Patient {
  id: number;
  name: string;
  dob: string;
  bloodType: string;
  healthId: string;
}

export interface MedicalHistory {
  id: number;
  condition: string;
  diagnosedDate: string;
  notes?: string;
}

export interface Allergy {
  id: number;
  name: string;
  severity: string;
}

export interface MedicalScan {
  id: number;
  type: string;
  date: string;
  fileUrl?: string;
}

export interface EmergencyContact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital?: string;
  phone: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  schedule: string;
}

export interface MedicalCardData {
  patient: Patient;
  medicalHistory: MedicalHistory[];
  allergies: Allergy[];
  medicalScans: MedicalScan[];
  emergencyContacts: EmergencyContact[];
  primaryDoctor?: Doctor;
  medications: Medication[];
}
