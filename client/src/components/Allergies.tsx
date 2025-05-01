import React from 'react';
import SectionCard from './SectionCard';
import { Allergy as AllergyType } from '@/types/medicalCard';

interface AllergiesProps {
  allergies: AllergyType[];
}

const severityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'severe':
      return 'text-destructive';
    case 'moderate':
      return 'text-orange-500';
    default:
      return 'text-yellow-500';
  }
};

const Allergies: React.FC<AllergiesProps> = ({ allergies }) => {
  return (
    <SectionCard title="Allergies" icon="error_outline">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allergies.map(allergy => (
          <div 
            key={allergy.id} 
            className="bg-background/50 p-3 rounded-xl border-l-4 hover:shadow transition-shadow"
            style={{ borderLeftColor: `hsl(var(--destructive))` }}
          >
            <div className="flex items-center mb-1">
              <span className="material-icons text-destructive mr-2 text-sm">priority_high</span>
              <span className="font-medium">{allergy.name}</span>
            </div>
            <div className="ml-7 flex items-center">
              <span className={`text-sm font-medium ${severityColor(allergy.severity)}`}>
                {allergy.severity}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                severity level
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground flex items-center">
        <span className="material-icons text-xs mr-1">info</span>
        Please inform medical staff about these allergies before any treatment
      </div>
    </SectionCard>
  );
};

export default Allergies;
