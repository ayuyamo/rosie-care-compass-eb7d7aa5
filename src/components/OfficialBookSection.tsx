
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const OfficialBookSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <div ref={sectionRef} className={`transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold text-[#232323] mb-4">Our Official Book</h3>
          <Link to="/book-details">
            <Card className="relative overflow-hidden p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-xl">
              {/* Background image layer */}
              <div className="absolute inset-0 bg-[url('https://villagecore.org/wp-content/uploads/2024/09/91UyCtrS8ZL._SL1500_.jpg')] bg-cover bg-center opacity-70 scale-110"></div>

              {/* Optional white overlay to soften further */}
              <div className="absolute inset-0 bg-white/70 backdrop-saturate-150"></div>

              {/* Foreground content */}
              <div className="relative z-10 flex items-start space-x-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#4a4a4a] leading-relaxeddrop-shadow-sm mb-2">
                    Caregiving with Heart: A Journey of Love and Resilience
                  </h4>
                  <p className="text-[#4a4a4a] text-sm leading-relaxed">
                    A comprehensive guide filled with real stories, practical advice, and emotional support for caregivers. Written by our community, for our community.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default OfficialBookSection;
