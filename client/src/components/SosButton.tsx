import React, { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const SosButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEmergency = async () => {
    setIsLoading(true);
    try {
      // For a real implementation, you would pass the specific contact ID
      // Here we're just sending a general emergency alert
      await apiRequest('POST', '/api/emergency', { contactId: 1 });
      
      toast({
        title: "Emergency Alert Sent",
        description: "Emergency services are being contacted.",
        variant: "destructive",
      });
      
      // In a real implementation, you might want to directly call emergency services
      // window.location.href = "tel:911";
      
    } catch (error) {
      toast({
        title: "Failed to send emergency alert",
        description: "Please try again or call emergency services directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 w-full px-4 flex justify-center">
        <button 
          className="sos-button py-4 px-10 rounded-full font-bold text-lg flex items-center justify-center w-full max-w-xs"
          onClick={() => setIsDialogOpen(true)}
          disabled={isLoading}
        >
          <div className="flex items-center">
            <div className="relative mr-3">
              <span className="material-icons text-2xl">emergency</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-ping"></div>
            </div>
            <span className="tracking-wider">
              {isLoading ? "SENDING..." : "SOS EMERGENCY"}
            </span>
          </div>
        </button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="rounded-xl border-destructive/20 border-2">
          <AlertDialogHeader>
            <div className="flex items-center">
              <span className="material-icons text-destructive mr-2">warning</span>
              <AlertDialogTitle>Emergency Alert</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              This will initiate an emergency call and alert your emergency contacts. Proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleEmergency} 
              className="bg-destructive text-white hover:bg-destructive/90 rounded-xl"
            >
              <span className="material-icons mr-2">local_phone</span>
              Confirm Emergency
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SosButton;
