import React from 'react';
import SectionCard from './SectionCard';
import { MedicalScan as MedicalScanType } from '@/types/medicalCard';

interface MedicalScansProps {
  medicalScans: MedicalScanType[];
}

const MedicalScans: React.FC<MedicalScansProps> = ({ medicalScans }) => {
  const handleView = (fileUrl: string | undefined) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      alert('File not available');
    }
  };

  return (
    <SectionCard title="MRI & CT Scan Results" icon="scan">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medicalScans.map(scan => (
          <div 
            key={scan.id} 
            className="bg-background/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow border border-border"
          >
            <div className="bg-primary/5 p-3 border-b border-border">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  {scan.type.toLowerCase().includes('mri') ? (
                    <span className="material-icons text-sm text-primary">medical_services</span>
                  ) : (
                    <span className="material-icons text-sm text-primary">biotech</span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{scan.type}</p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span className="material-icons text-xs mr-1">event</span>
                {scan.date}
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="action-button flex-1 bg-primary/10 hover:bg-primary/20 text-primary py-2 px-3 rounded-lg flex items-center justify-center"
                  onClick={() => handleView(scan.fileUrl)}
                >
                  <span className="material-icons text-sm mr-1">visibility</span>
                  <span className="text-sm">View</span>
                </button>
                <button 
                  className="action-button flex-1 bg-muted hover:bg-muted-foreground/10 py-2 px-3 rounded-lg flex items-center justify-center"
                  onClick={() => handleView(scan.fileUrl)}
                >
                  <span className="material-icons text-sm mr-1">file_download</span>
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default MedicalScans;
