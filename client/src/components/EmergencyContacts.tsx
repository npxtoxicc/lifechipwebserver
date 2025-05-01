import React from 'react';
import SectionCard from './SectionCard';
import { EmergencyContact as EmergencyContactType } from '@/types/medicalCard';

interface EmergencyContactsProps {
  emergencyContacts: EmergencyContactType[];
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ emergencyContacts }) => {
  return (
    <SectionCard title="Emergency Contacts" icon="contact_emergency">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map(contact => (
          <div 
            key={contact.id} 
            className="contact-card bg-background/50 p-4 rounded-xl border border-border flex items-start justify-between"
          >
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <span className="material-icons text-primary">person</span>
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                <p className="text-sm mt-1">{contact.phone}</p>
              </div>
            </div>
            
            <a 
              href={`tel:${contact.phone}`} 
              className="action-button bg-primary/10 hover:bg-primary/20 text-primary py-2 px-3 rounded-xl flex items-center"
              aria-label={`Call ${contact.name}`}
            >
              <span className="material-icons">call</span>
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10 text-sm flex items-start">
        <span className="material-icons text-primary mr-2 mt-0.5">info</span>
        <p>
          In case of emergency, these contacts will be automatically notified 
          when the SOS button is pressed.
        </p>
      </div>
    </SectionCard>
  );
};

export default EmergencyContacts;
