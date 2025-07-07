
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Menu, X, Sparkles, Star, Zap, Camera, Bell, Search } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { FloatingModuleGrid } from "@/components/FloatingModuleGrid";
import { CreativeStorySection } from "@/components/CreativeStorySection";
import CommunityHighlights from "@/components/CommunityHighlights";
import OfficialBookSection from "@/components/OfficialBookSection";
import PoetryCollectionSection from "@/components/PoetryCollectionSection";
import { injectElevenLabsWidget } from "@/lib/elevenlabsWidget";

const Index = () => {
  useEffect(() => {
    injectElevenLabsWidget();
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Mobile App Header */}
      <header className="relative z-50 p-4 animate-fade-in bg-white/90 backdrop-blur-md border-b border-gray-200/30">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl border-4 border-[#e4e8e1] overflow-hidden">
                <img
                  src="/ChatGPT-rosie.png"
                  alt="Rosie Care Bot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ceda88] rounded-full flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#232323]">Rosie Care</h1>
              <p className="text-[#4B5320] text-sm">Your Companion</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 bg-[#a5aba0] rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg">
              <Menu className="h-5 w-5 text-[#373618]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Profile Picture */}
      <section className="relative z-10 py-8 animate-fade-in duration-500">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center">
            {/* Profile Card */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-2xl">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full mx-auto border-4 border-[#e4e8e1] shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/ChatGPT-rosie.png"
                    alt="Rosie Care Bot"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-black text-[#232323] mb-2">
                Welcome to Your Journey
              </h2>

              <p className="text-[#373618] mb-4 text-sm leading-relaxed">
                I'm Rosie, your AI companion for caregiving. Let's navigate this path together with stories, wisdom, and support.
              </p>
              <Button
                className="relative w-full text-[#18453B] font-bold py-4 px-6 rounded-2xl mb-3 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-[url('/ChatGPT-rosie.png')] bg-cover bg-center border-0 overflow-hidden"
              >
                {/* White transparent overlay */}
                <div className="absolute inset-0 bg-white/60 rounded-2xl backdrop-blur-lg pointer-events-none" />

                {/* Content on top */}
                <div className="relative z-10 flex items-center justify-center">
                  <Zap className="mr-3 h-5 w-5" />
                  <span className="text-base">Start Your Journey</span>
                </div>
              </Button>

              <Button className="w-full font-bold py-4 px-6 rounded-2xl shadow-lg bg-white hover:bg-white transform hover:scale-[1.02] transition-all duration-300 text-[#18453B] border-2 border-[#18453B]">
                <Users className="mr-3 h-5 w-5" />
                <span className="text-base">Join Community</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Creative Stories Section */}
      <div className="animate-slide-up">
        <CreativeStorySection />
      </div>

      {/* Official Book Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <OfficialBookSection />
      </div>

      {/* Poetry Collection Section */}
      {/* <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <PoetryCollectionSection />
      </div> */}

      {/* Enhanced Floating Modules Grid */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <FloatingModuleGrid />
      </div>

      {/* Community Section with Pictures */}
      {/* <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <CommunityHighlights />
      </div> */}

      <BottomNavigation />
      {/* Bottom spacing for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;
