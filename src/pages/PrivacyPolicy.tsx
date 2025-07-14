import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: [Date]</p>
        </div>

        <div className="prose prose-sm max-w-none text-foreground">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground mb-3">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Account information (username, email)</li>
              <li>Content you create or share</li>
              <li>Device and usage information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-3">
              We use the information we collect to provide, maintain, and improve our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
            <p className="text-muted-foreground mb-3">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at privacy@example.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;