import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold text-[#232323] mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-[#4a4a4a]">
            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Information We Collect</h2>
              <p className="leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, and communicate with you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Information Sharing</h2>
              <p className="leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share information in certain limited circumstances as outlined in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@example.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;