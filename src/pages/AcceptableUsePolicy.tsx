import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AcceptableUsePolicy = () => {
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Acceptable Use Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: [Date]</p>
        </div>

        <div className="prose prose-sm max-w-none text-foreground">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Acceptable Use</h2>
            <p className="text-muted-foreground mb-3">
              This Acceptable Use Policy outlines the permitted uses and prohibited uses of our service.
            </p>
            <p className="text-muted-foreground mb-3">
              You may use our service for lawful purposes only. You agree not to use the service:
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Prohibited Uses</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>In any way that violates applicable laws or regulations</li>
              <li>To harass, abuse, or harm another person</li>
              <li>To impersonate or attempt to impersonate another person</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use of the service</li>
              <li>To transmit spam, chain letters, or other unsolicited communications</li>
              <li>To interfere with or disrupt the service or servers</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Content Guidelines</h2>
            <p className="text-muted-foreground mb-3">
              Users are responsible for the content they post. Content must not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Contain hate speech or discriminatory content</li>
              <li>Include violence or threats</li>
              <li>Violate intellectual property rights</li>
              <li>Contain adult content inappropriate for the platform</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Enforcement</h2>
            <p className="text-muted-foreground mb-3">
              Violations of this policy may result in account suspension or termination. 
              We reserve the right to remove content that violates this policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Reporting Violations</h2>
            <p className="text-muted-foreground">
              To report violations of this policy, please contact us at abuse@example.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;