import React from 'react';
import SectionCard from './SectionCard';
import { Patient } from '@/types/medicalCard';

interface PatientInfoProps {
  patient: Patient;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  return (
    <SectionCard title="Patient Information" icon="badge">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background/50 p-3 rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Full Name</div>
            <div className="font-medium">{patient.name}</div>
          </div>
          
          <div className="bg-background/50 p-3 rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Date of Birth</div>
            <div className="font-medium">{patient.dob}</div>
          </div>
          
          <div className="bg-background/50 p-3 rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Blood Type</div>
            <div className="flex items-center">
              <span className="material-icons text-destructive/80 mr-1 text-sm">bloodtype</span>
              <span className="font-semibold text-destructive/80">{patient.bloodType}</span>
            </div>
          </div>
          
          <div className="bg-background/50 p-3 rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Health ID</div>
            <div className="font-medium">{patient.healthId}</div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <span className="material-icons text-xs mr-1">shield</span>
          Personal information is protected and shared only with authorized medical professionals
        </div>
      </div>
    </SectionCard>
  );
};

export default PatientInfo;
