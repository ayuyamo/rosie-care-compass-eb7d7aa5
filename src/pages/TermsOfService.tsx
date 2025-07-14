import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold text-[#232323] mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-[#4a4a4a]">
            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using this service, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Use License</h2>
              <p className="leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on our service 
                for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Disclaimer</h2>
              <p className="leading-relaxed">
                The materials on our service are provided on an 'as is' basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Limitations</h2>
              <p className="leading-relaxed">
                In no event shall our company or its suppliers be liable for any damages arising 
                out of the use or inability to use the materials on our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#232323] mb-3">Modifications</h2>
              <p className="leading-relaxed">
                We may revise these terms of service at any time without notice. By using this service, 
                you are agreeing to be bound by the current version of these terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;