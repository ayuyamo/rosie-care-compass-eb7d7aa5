import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Menu, X, Sparkles, Star, Zap, Camera, Bell, Search } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { FloatingModuleGrid } from "@/components/FloatingModuleGrid";
import { CreativeStorySection } from "@/components/CreativeStorySection";
import { InteractiveToolsRevamped } from "@/components/InteractiveToolsRevamped";
import { ArtisticCommunitySection } from "@/components/ArtisticCommunitySection";
import FeaturedStories from "@/components/FeaturedStories";
import CommunityHighlights from "@/components/CommunityHighlights";
import OfficialBookSection from "@/components/OfficialBookSection";
import PoetryCollectionSection from "@/components/PoetryCollectionSection";
import { injectElevenLabsWidget } from "@/lib/elevenlabsWidget";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    injectElevenLabsWidget();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Mobile App Header */}
      <header className="relative z-50 p-4 animate-fade-in bg-white/90 backdrop-blur-md border-b border-gray-200/30">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-[#B8E6C1] rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="/lovable-uploads/fe0b3df9-3769-49f8-8198-98831a293061.png"
                  alt="Rosie Care Bot"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#679aa3] rounded-full flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#232323]">Rosie Care</h1>
              <p className="text-[#4B5320] text-sm">Your Companion</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 bg-[#679aa3] rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg">
              <Menu className="h-5 w-5 text-[#373618]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Profile Picture */}
      <section className="relative z-10 py-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="max-w-md mx-auto px-4">
          <div className="text-center">
            {/* Profile Card */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-2xl">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full mx-auto border-4 border-[#537c83a6] bg-[#B8E6C1] shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/lovable-uploads/fe0b3df9-3769-49f8-8198-98831a293061.png"
                    alt="Rosie Care Bot"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#4b63b3] px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-bold">Online</span>
                </div> */}
              </div>

              <h2 className="text-2xl font-black text-[#232323] mb-2">
                Welcome to Your Journey
              </h2>

              <p className="text-[#373618] mb-4 text-sm leading-relaxed">
                I'm Rosie, your AI companion for caregiving. Let's navigate this path together with stories, wisdom, and support.
              </p>

              <Button className="w-full bg-[#537c83]  text-white font-bold py-3 rounded-2xl mb-3">
                <Zap className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>

              <Button variant="outline" className="w-full border-2 border-[#18453B]  text-[#18453B] py-3 rounded-2xl">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Creative Stories Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <CreativeStorySection />
      </div>

      {/* Official Book Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <OfficialBookSection />
      </div>

      {/* Poetry Collection Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <PoetryCollectionSection />
      </div>

      {/* Enhanced Floating Modules Grid */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <FloatingModuleGrid />
      </div>

      {/* Community Section with Pictures */}
      <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <CommunityHighlights />
      </div>

      <BottomNavigation />
      {/* Bottom spacing for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;
