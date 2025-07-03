
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

// https://villagecore.org/wp-content/uploads/2025/04/3D-Book-and-Kindle-image-1.png

// https://villagecore.org/wp-content/uploads/2024/09/91UyCtrS8ZL._SL1500_.jpg

const OfficialBookSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <div ref={sectionRef} className={`transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold text-[#232323] mb-4">Our Official Book</h3>

          <Card className="bg-white/60 backdrop-blur-md border border-gray-200 p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-20 flex items-center justify-center flex-shrink-0">
                <img src="https://villagecore.org/wp-content/uploads/2024/09/91UyCtrS8ZL._SL1500_.jpg" alt="Official Book Cover" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-[#232323] mb-2">
                  Caregiving with Heart: A Journey of Love and Resilience
                </h4>
                <p className="text-[#373618] text-sm mb-4 leading-relaxed">
                  A comprehensive guide filled with real stories, practical advice, and emotional support for caregivers. Written by our community, for our community.
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#679aa3]">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">Community Favorite</span>
                  </div>
                  <Link to="/book-details">
                    <Button className="bg-[#f96c5d] text-white text-sm">
                      Read Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OfficialBookSection;
