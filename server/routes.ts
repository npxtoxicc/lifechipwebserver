import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertPatientSchema, insertMedicalHistorySchema, insertAllergySchema, 
  insertMedicalScanSchema, insertEmergencyContactSchema, insertDoctorSchema, 
  insertMedicationSchema, insertPatientDoctorSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get patient data (simplified to always return patient ID 1 for demo)
  app.get('/api/patient', async (req, res) => {
    try {
      const patientId = 1; // For demo purposes, always return patient ID 1
      const patientData = await storage.getPatientData(patientId);
      
      if (!patientData) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      
      res.json(patientData);
    } catch (error) {
      console.error('Error retrieving patient data:', error);
      res.status(500).json({ message: 'Error retrieving patient data' });
    }
  });

  // API endpoint to get a specific patient by ID
  app.get('/api/patients/:id', async (req, res) => {
    try {
      const patientId = parseInt(req.params.id);
      if (isNaN(patientId)) {
        return res.status(400).json({ message: 'Invalid patient ID' });
      }
      
      const patientData = await storage.getPatientData(patientId);
      
      if (!patientData) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      
      res.json(patientData);
    } catch (error) {
      console.error('Error retrieving patient data:', error);
      res.status(500).json({ message: 'Error retrieving patient data' });
    }
  });

  // API endpoint to create a new patient
  app.post('/api/patients', async (req, res) => {
    try {
      const result = insertPatientSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const patient = await storage.createPatient(result.data);
      res.status(201).json(patient);
    } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).json({ message: 'Error creating patient' });
    }
  });

  // API endpoint to update a patient
  app.patch('/api/patients/:id', async (req, res) => {
    try {
      const patientId = parseInt(req.params.id);
      if (isNaN(patientId)) {
        return res.status(400).json({ message: 'Invalid patient ID' });
      }
      
      const patient = await storage.getPatient(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      
      const result = insertPatientSchema.partial().safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const updatedPatient = await storage.updatePatient(patientId, result.data);
      res.json(updatedPatient);
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ message: 'Error updating patient' });
    }
  });

  // API endpoint for medical history
  app.post('/api/medical-history', async (req, res) => {
    try {
      const result = insertMedicalHistorySchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const medicalHistory = await storage.createMedicalHistory(result.data);
      res.status(201).json(medicalHistory);
    } catch (error) {
      console.error('Error creating medical history:', error);
      res.status(500).json({ message: 'Error creating medical history' });
    }
  });

  // API endpoint for allergies
  app.post('/api/allergies', async (req, res) => {
    try {
      const result = insertAllergySchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const allergy = await storage.createAllergy(result.data);
      res.status(201).json(allergy);
    } catch (error) {
      console.error('Error creating allergy:', error);
      res.status(500).json({ message: 'Error creating allergy' });
    }
  });

  // API endpoint for medical scans
  app.post('/api/medical-scans', async (req, res) => {
    try {
      const result = insertMedicalScanSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const medicalScan = await storage.createMedicalScan(result.data);
      res.status(201).json(medicalScan);
    } catch (error) {
      console.error('Error creating medical scan:', error);
      res.status(500).json({ message: 'Error creating medical scan' });
    }
  });

  // API endpoint for emergency contacts
  app.post('/api/emergency-contacts', async (req, res) => {
    try {
      const result = insertEmergencyContactSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const contact = await storage.createEmergencyContact(result.data);
      res.status(201).json(contact);
    } catch (error) {
      console.error('Error creating emergency contact:', error);
      res.status(500).json({ message: 'Error creating emergency contact' });
    }
  });

  // API endpoint for doctors
  app.post('/api/doctors', async (req, res) => {
    try {
      const result = insertDoctorSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const doctor = await storage.createDoctor(result.data);
      res.status(201).json(doctor);
    } catch (error) {
      console.error('Error creating doctor:', error);
      res.status(500).json({ message: 'Error creating doctor' });
    }
  });

  // API endpoint for medications
  app.post('/api/medications', async (req, res) => {
    try {
      const result = insertMedicationSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const medication = await storage.createMedication(result.data);
      res.status(201).json(medication);
    } catch (error) {
      console.error('Error creating medication:', error);
      res.status(500).json({ message: 'Error creating medication' });
    }
  });

  // API endpoint for patient-doctor relationships
  app.post('/api/patient-doctors', async (req, res) => {
    try {
      const result = insertPatientDoctorSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const patientDoctor = await storage.createPatientDoctor(result.data);
      res.status(201).json(patientDoctor);
    } catch (error) {
      console.error('Error creating patient-doctor relationship:', error);
      res.status(500).json({ message: 'Error creating patient-doctor relationship' });
    }
  });

  // Endpoint to initiate emergency contact
  app.post('/api/emergency', async (req, res) => {
    try {
      const { contactId } = req.body;
      
      // In a real implementation, this would contact emergency services
      // or send notifications to the emergency contact
      // For now, we'll just return success
      
      res.json({ 
        success: true, 
        message: 'Emergency contact initiated',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error initiating emergency contact:', error);
      res.status(500).json({ message: 'Error initiating emergency contact' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
