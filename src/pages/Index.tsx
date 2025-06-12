
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

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative overflow-hidden">
      {/* Mobile App Header */}
      <header className="relative z-50 p-4 animate-fade-in bg-white/80 backdrop-blur-md border-b border-gray-200/30">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#ff7f50] rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#679aa3] rounded-full flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#232323]">Rosie Care</h1>
              <p className="text-[#2b6cb0] text-xs">Your Companion</p>
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
            <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-2xl mb-6">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full mx-auto border-4 border-[#ff7f50] bg-[#679aa3] shadow-lg flex items-center justify-center">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#2b6cb0] px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-bold">Online</span>
                </div>
              </div>

              <h2 className="text-2xl font-black text-[#232323] mb-2">
                Welcome to Your Journey
              </h2>

              <p className="text-[#373618] mb-4 text-sm leading-relaxed">
                I'm Rosie, your AI companion for caregiving. Let's navigate this path together with stories, wisdom, and support.
              </p>

              <Button className="w-full bg-[#ff7f50]  text-white font-bold py-3 rounded-2xl mb-3">
                <Zap className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>

              <Button variant="outline" className="w-full border-[#2b6cb0]  text-[#2b6cb0] py-3 rounded-2xl">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="backdrop-blur-sm rounded-2xl p-3 bg-[rgba(43,108,176,0.1)]">
                <div className="font-bold text-lg text-[#2b6cb0]">120+</div>
                <div className="text-xs text-[#373618]">Stories</div>
              </div>
              <div className="backdrop-blur-sm rounded-2xl p-3 bg-[rgba(218,178,22,0.1)]">
                <div className="font-bold text-lg text-[#ff7f50]">50k+</div>
                <div className="text-xs text-[#373618]">Members</div>
              </div>
              <div className="backdrop-blur-sm rounded-2xl p-3 bg-[rgba(103,154,163,0.1)]">
                <div className="font-bold text-lg text-[#679aa3]">24/7</div>
                <div className="text-xs text-[#373618]">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories with Images */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <FeaturedStories />
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

      {/* Enhanced Creative Stories Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <CreativeStorySection />
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
