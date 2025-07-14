import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: [Date]</p>
        </div>

        <div className="prose prose-sm max-w-none text-foreground">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-3">
              By accessing and using this service, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Use License</h2>
            <p className="text-muted-foreground mb-3">
              Permission is granted to temporarily download one copy of the materials on our app 
              for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-muted-foreground mb-3">This license shall automatically terminate if you violate any of these restrictions.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
            <p className="text-muted-foreground mb-3">
              The materials on our app are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim all other warranties.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Limitations</h2>
            <p className="text-muted-foreground mb-3">
              In no event shall our company or its suppliers be liable for any damages arising 
              out of the use or inability to use the materials on our app.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at legal@example.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;