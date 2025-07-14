import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TermsModalProps {
  isOpen: boolean;
  onAgree: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onAgree }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-[#232323]">
            Welcome to Our App
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-[#4a4a4a] text-center leading-relaxed">
            By using this app, you agree to our Privacy Policy, Terms of Service, and Acceptable Use Policy.
          </p>
          
          <div className="flex flex-col space-y-2 text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-[#679aa3] hover:text-[#679aa3]/80 underline text-center transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service" 
              className="text-[#679aa3] hover:text-[#679aa3]/80 underline text-center transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/acceptable-use-policy" 
              className="text-[#679aa3] hover:text-[#679aa3]/80 underline text-center transition-colors"
            >
              Acceptable Use Policy
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            onClick={onAgree}
            className="w-full bg-[#679aa3] hover:bg-[#679aa3]/90 text-white"
          >
            Agree & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;