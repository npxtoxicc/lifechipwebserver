import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MedicalCardData } from '@/types/medicalCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PatientInfo from '@/components/PatientInfo';
import MedicalHistory from '@/components/MedicalHistory';
import Allergies from '@/components/Allergies';
import MedicalScans from '@/components/MedicalScans';
import EmergencyContacts from '@/components/EmergencyContacts';
import DoctorProfile from '@/components/DoctorProfile';
import Medications from '@/components/Medications';
import SosButton from '@/components/SosButton';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Home: React.FC = () => {
  const { data, isLoading, isError } = useQuery<MedicalCardData>({
    queryKey: ['/api/patient'],
  });

  // Loading state with skeleton UI
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-6 space-y-6 pb-24">
          <div className="flex justify-center mb-8">
            <Skeleton className="h-32 w-32 rounded-full" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="neumorphic">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-40 ml-4" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Card className="neumorphic">
            <CardContent className="p-6">
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-icons text-4xl text-destructive">error</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">Unable to Load Medical Data</h2>
                <p className="text-muted-foreground mb-6">There was a problem loading your medical information. Please refresh the page or try again later.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-primary text-white py-2.5 px-6 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8 mt-4">
          <div className="profile-picture mb-4">
            <span className="material-icons text-5xl text-primary/60">account_circle</span>
          </div>
          <h1 className="text-2xl font-bold text-center">{data.patient.name}</h1>
          <p className="text-muted-foreground">Medical ID: {data.patient.healthId}</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            <span className="material-icons text-sm mr-1">bloodtype</span>
            Blood Type: {data.patient.bloodType}
          </div>
        </div>
        
        {/* Medical Information Cards */}
        <div className="space-y-6">
          <PatientInfo patient={data.patient} />
          <MedicalHistory medicalHistory={data.medicalHistory} />
          <Allergies allergies={data.allergies} />
          <MedicalScans medicalScans={data.medicalScans} />
          <EmergencyContacts emergencyContacts={data.emergencyContacts} />
          {data.primaryDoctor && <DoctorProfile doctor={data.primaryDoctor} />}
          <Medications medications={data.medications} />
        </div>
      </main>
      
      <SosButton />
      <Footer />
    </div>
  );
};

export default Home;
