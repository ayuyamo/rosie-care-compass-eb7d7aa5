import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AcceptableUsePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="flex items-center text-[#679aa3] hover:text-[#679aa3]/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#232323] mb-6">Acceptable Use Policy</h1>
          
          <div className="space-y-6 text-[#4a4a4a]">
            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Purpose</h2>
              <p className="leading-relaxed">
                This Acceptable Use Policy outlines the acceptable and prohibited uses of our service 
                to ensure a safe and positive experience for all users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Prohibited Activities</h2>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                <li>Harassment, bullying, or intimidation of other users</li>
                <li>Posting illegal, offensive, or inappropriate content</li>
                <li>Attempting to hack, disrupt, or damage the service</li>
                <li>Spamming or sending unsolicited messages</li>
                <li>Impersonating others or providing false information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Content Guidelines</h2>
              <p className="leading-relaxed">
                All content shared on our platform must be respectful, appropriate, and comply with 
                applicable laws. We reserve the right to remove content that violates these guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Enforcement</h2>
              <p className="leading-relaxed">
                Violations of this policy may result in warnings, temporary suspension, or permanent 
                termination of your account, depending on the severity and frequency of violations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Reporting</h2>
              <p className="leading-relaxed">
                If you encounter content or behavior that violates this policy, please report it to 
                us immediately at report@example.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;