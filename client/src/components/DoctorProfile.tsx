import React from 'react';
import SectionCard from './SectionCard';
import { Doctor } from '@/types/medicalCard';

interface DoctorProfileProps {
  doctor: Doctor;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor }) => {
  return (
    <SectionCard title="Primary Physician" icon="medical_services">
      <div className="p-1">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="neumorphic w-28 h-28 rounded-full flex items-center justify-center shrink-0">
            <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center">
              <span className="material-icons text-4xl text-primary">person</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center bg-secondary/10 px-3 py-1 rounded-full mb-2">
              <span className="material-icons text-secondary text-sm mr-1">verified</span>
              <span className="text-xs font-medium text-secondary">Certified Specialist</span>
            </div>
            
            <p className="text-xl font-bold">{doctor.name}</p>
            <p className="text-primary font-medium">{doctor.specialty}</p>
            
            {doctor.hospital && (
              <div className="flex items-center justify-center md:justify-start mt-1 text-muted-foreground">
                <span className="material-icons text-xs mr-1">location_on</span>
                <span className="text-sm">{doctor.hospital}</span>
              </div>
            )}
            
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <a 
                href={`tel:${doctor.phone}`} 
                className="action-button bg-primary text-white py-2 px-4 rounded-xl text-sm flex items-center hover:bg-primary/90 transition-colors"
              >
                <span className="material-icons mr-2">call</span>
                Call Now
              </a>
              <button className="action-button bg-muted hover:bg-muted-foreground/10 py-2 px-4 rounded-xl text-sm flex items-center transition-colors">
                <span className="material-icons mr-2">email</span>
                Send Message
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-muted/30 p-3 rounded-xl flex items-center">
              <span className="material-icons text-primary mr-2">schedule</span>
              <div>
                <div className="text-xs text-muted-foreground">Available Hours</div>
                <div className="text-sm font-medium">Mon-Fri, 9am-5pm</div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-xl flex items-center">
              <span className="material-icons text-primary mr-2">phone</span>
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="text-sm font-medium">{doctor.phone}</div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-xl flex items-center">
              <span className="material-icons text-primary mr-2">fact_check</span>
              <div>
                <div className="text-xs text-muted-foreground">Last Check-up</div>
                <div className="text-sm font-medium">March 15, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default DoctorProfile;
