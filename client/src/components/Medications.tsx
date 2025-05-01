import React from 'react';
import SectionCard from './SectionCard';
import { Medication as MedicationType } from '@/types/medicalCard';

interface MedicationsProps {
  medications: MedicationType[];
}

const Medications: React.FC<MedicationsProps> = ({ medications }) => {
  return (
    <SectionCard title="Current Medications" icon="medication">
      <div className="space-y-4">
        {medications.map(medication => (
          <div 
            key={medication.id} 
            className="bg-background/50 p-4 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-start justify-between">
              <div>
                <div className="flex items-center mb-1">
                  <span className="material-icons text-secondary mr-2 text-sm">medication</span>
                  <p className="font-medium">{medication.name}</p>
                </div>
                
                <div className="flex items-center ml-6 text-sm text-muted-foreground">
                  <span className="material-icons text-xs mr-1">schedule</span>
                  {medication.schedule}
                </div>
              </div>
              
              <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mt-1">
                {medication.dosage}
              </div>
            </div>
            
            <div className="mt-3 border-t border-border pt-2 text-xs flex items-center text-muted-foreground">
              <span className="material-icons text-xs mr-1">info</span>
              Take medication as prescribed by your doctor
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default Medications;
