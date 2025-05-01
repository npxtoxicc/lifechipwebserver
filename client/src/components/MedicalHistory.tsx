import React from 'react';
import SectionCard from './SectionCard';
import { MedicalHistory as MedicalHistoryType } from '@/types/medicalCard';

interface MedicalHistoryProps {
  medicalHistory: MedicalHistoryType[];
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ medicalHistory }) => {
  return (
    <SectionCard title="Medical History" icon="history">
      <div className="space-y-4">
        {medicalHistory.map(item => (
          <div 
            key={item.id} 
            className="bg-background/50 p-4 rounded-xl border-l-4 hover:shadow-md transition-shadow"
            style={{ borderLeftColor: `hsl(var(--warning))` }}
          >
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mr-3 mt-1 shrink-0">
                <span className="material-icons text-[hsl(var(--warning))]">medical_information</span>
              </div>
              
              <div>
                <p className="font-semibold text-lg">{item.condition}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span className="material-icons text-xs mr-1">event</span>
                  Diagnosed: {item.diagnosedDate}
                </div>
                
                {item.notes && (
                  <div className="mt-2 bg-muted/50 p-2 rounded-lg text-sm">
                    {item.notes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default MedicalHistory;
