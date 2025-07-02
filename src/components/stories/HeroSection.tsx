
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  topicId: string;
  heroImage: string;
}

export const HeroSection = ({ topicId, heroImage }: HeroSectionProps) => {
  return (
    <div className="relative h-64 overflow-hidden">
      <img
        src={heroImage}
        alt="Stories Collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      <div className="absolute top-4 left-4">
        <Link to={`/topic/${topicId}/sections`}>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sections
          </Button>
        </Link>
      </div>
    </div>
  );
};
