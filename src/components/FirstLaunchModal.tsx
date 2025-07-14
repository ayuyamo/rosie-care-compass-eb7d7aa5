import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FirstLaunchModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem("termsAgreed");
    if (!hasAgreed) {
      setIsOpen(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("termsAgreed", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[380px] max-w-[320px] mx-auto my-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Welcome to Our App
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            By using this app, you agree to our{" "}
            <Link 
              to="/privacy-policy" 
              className="text-primary hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link 
              to="/terms-of-service" 
              className="text-primary hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Terms of Service
            </Link>
            , and{" "}
            <Link 
              to="/acceptable-use-policy" 
              className="text-primary hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Acceptable Use Policy
            </Link>
            .
          </p>
        </div>

        <DialogFooter className="flex justify-center">
          <Button onClick={handleAgree} className="w-full">
            Agree & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FirstLaunchModal;