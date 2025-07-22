import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MarkdownViewer from "@/components/MarkDownViewer";
import { PrivacyPolicySkeleton } from "@/components/ui/skeletons";
import { useState, useEffect } from "react";

const PrivacyPolicy = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PrivacyPolicySkeleton />;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <MarkdownViewer fileUrl='https://ovexmcodlyhefuhmdfez.supabase.co/storage/v1/object/public/policies//privacy-policy.md' />
      </div>
    </div>
  );
};

export default PrivacyPolicy;