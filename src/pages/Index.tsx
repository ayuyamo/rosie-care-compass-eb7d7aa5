
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Menu, X, Sparkles, Star, Zap, Camera, Bell, Search } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";
import { FloatingModuleGrid } from "@/components/FloatingModuleGrid";
import { CreativeStorySection } from "@/components/CreativeStorySection";
import { InteractiveToolsRevamped } from "@/components/InteractiveToolsRevamped";
import { ArtisticCommunitySection } from "@/components/ArtisticCommunitySection";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#373618] via-[#232323] to-[#2b6cb0] relative overflow-hidden transition-all duration-1000 ease-in-out">
      {/* Mobile App Header */}
      <header className="relative z-50 p-4 animate-fade-in bg-[#232323]/80 backdrop-blur-md border-b border-[#dab216]/20">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#dab216] rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-[#232323]" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#679aa3] rounded-full flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Rosie Care</h1>
              <p className="text-[#dab216] text-xs">Your Companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-[#679aa3]/20 rounded-lg">
              <Search className="h-5 w-5 text-[#dab216]" />
            </button>
            <button className="p-2 bg-[#679aa3]/20 rounded-lg">
              <Menu className="h-5 w-5 text-[#dab216]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Profile Picture */}
      <section className="relative z-10 py-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="max-w-md mx-auto px-4">
          <div className="text-center">
            {/* Profile Card */}
            <div className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 rounded-3xl p-6 shadow-2xl mb-6">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face" 
                  alt="Rosie - Your Care Companion" 
                  className="w-20 h-20 rounded-full mx-auto border-4 border-[#dab216] shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#679aa3] px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-bold">Online</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-[#dab216] mb-2">
                Welcome to Your Journey
              </h2>
              
              <p className="text-[#679aa3] mb-4 text-sm leading-relaxed">
                I'm Rosie, your AI companion for caregiving. Let's navigate this path together with stories, wisdom, and support.
              </p>
              
              <Button className="w-full bg-[#dab216] hover:bg-[#dab216]/80 text-[#232323] font-bold py-3 rounded-2xl mb-3">
                <Zap className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
              
              <Button variant="outline" className="w-full border-[#679aa3] text-[#679aa3] hover:bg-[#679aa3]/10 py-3 rounded-2xl">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[#679aa3]/20 backdrop-blur-sm rounded-2xl p-3 border border-[#679aa3]/30">
                <div className="text-[#dab216] font-bold text-lg">120+</div>
                <div className="text-[#679aa3] text-xs">Stories</div>
              </div>
              <div className="bg-[#679aa3]/20 backdrop-blur-sm rounded-2xl p-3 border border-[#679aa3]/30">
                <div className="text-[#dab216] font-bold text-lg">50k+</div>
                <div className="text-[#679aa3] text-xs">Members</div>
              </div>
              <div className="bg-[#679aa3]/20 backdrop-blur-sm rounded-2xl p-3 border border-[#679aa3]/30">
                <div className="text-[#dab216] font-bold text-lg">24/7</div>
                <div className="text-[#679aa3] text-xs">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories with Images */}
      <section className="relative z-10 py-6">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#dab216]">Featured Stories</h3>
            <Button variant="ghost" size="sm" className="text-[#679aa3]">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 overflow-hidden">
              <div className="flex">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop" 
                  alt="Caregiving story" 
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1 p-4">
                  <Badge className="bg-[#679aa3] text-white text-xs mb-2">New</Badge>
                  <h4 className="text-[#dab216] font-bold text-sm mb-1">Finding Strength</h4>
                  <p className="text-[#679aa3] text-xs mb-2">When caregiving finds you unprepared...</p>
                  <div className="flex items-center space-x-2 text-[#679aa3]">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs">5 min read</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 overflow-hidden">
              <div className="flex">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=80&h=80&fit=crop" 
                  alt="Home care story" 
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1 p-4">
                  <Badge className="bg-[#2b6cb0] text-white text-xs mb-2">Popular</Badge>
                  <h4 className="text-[#dab216] font-bold text-sm mb-1">Safe Spaces</h4>
                  <p className="text-[#679aa3] text-xs mb-2">Creating comfort in familiar places...</p>
                  <div className="flex items-center space-x-2 text-[#679aa3]">
                    <Heart className="h-3 w-3 fill-current" />
                    <span className="text-xs">3 min read</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Floating Modules Grid */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <FloatingModuleGrid />
      </div>

      {/* Enhanced Creative Stories Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <CreativeStorySection />
      </div>

      {/* Tools Section */}
      <section className="relative z-10 py-6">
        <div className="max-w-md mx-auto px-4">
          <h3 className="text-xl font-bold text-[#dab216] mb-4">Quick Tools</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 p-4 text-center">
              <div className="w-12 h-12 bg-[#679aa3] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-[#dab216] font-bold text-sm mb-1">Care Guide</h4>
              <p className="text-[#679aa3] text-xs">Step-by-step guidance</p>
            </Card>

            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 p-4 text-center">
              <div className="w-12 h-12 bg-[#2b6cb0] rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-[#dab216] font-bold text-sm mb-1">Chat Support</h4>
              <p className="text-[#679aa3] text-xs">24/7 assistance</p>
            </Card>

            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 p-4 text-center">
              <div className="w-12 h-12 bg-[#373618] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-[#dab216]" />
              </div>
              <h4 className="text-[#dab216] font-bold text-sm mb-1">Safety Check</h4>
              <p className="text-[#679aa3] text-xs">Home assessment</p>
            </Card>

            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 p-4 text-center">
              <div className="w-12 h-12 bg-[#679aa3] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-[#dab216] font-bold text-sm mb-1">Legal Help</h4>
              <p className="text-[#679aa3] text-xs">Document guidance</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section with Pictures */}
      <section className="relative z-10 py-6">
        <div className="max-w-md mx-auto px-4">
          <h3 className="text-xl font-bold text-[#dab216] mb-4">Community Highlights</h3>
          
          <div className="space-y-4">
            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=40&h=40&fit=crop&crop=face" 
                  alt="Community member" 
                  className="w-10 h-10 rounded-full border-2 border-[#dab216]"
                />
                <div>
                  <div className="text-[#dab216] font-bold text-sm">Maria S.</div>
                  <div className="text-[#679aa3] text-xs">Shared a resource</div>
                </div>
              </div>
              <p className="text-[#679aa3] text-sm mb-3">"Found an amazing physical therapist who does home visits. Game changer!"</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-[#dab216]">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">24</span>
                </button>
                <button className="flex items-center space-x-1 text-[#679aa3]">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">8</span>
                </button>
              </div>
            </Card>

            <Card className="bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=40&h=40&fit=crop&crop=face" 
                  alt="Community member" 
                  className="w-10 h-10 rounded-full border-2 border-[#679aa3]"
                />
                <div>
                  <div className="text-[#dab216] font-bold text-sm">David K.</div>
                  <div className="text-[#679aa3] text-xs">Posted in Legal Advice</div>
                </div>
              </div>
              <p className="text-[#679aa3] text-sm mb-3">"Finally got the power of attorney sorted. Here's what I learned..."</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-[#dab216]">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">18</span>
                </button>
                <button className="flex items-center space-x-1 text-[#679aa3]">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">12</span>
                </button>
              </div>
            </Card>
          </div>

          <Button className="w-full mt-4 bg-[#2b6cb0] hover:bg-[#2b6cb0]/80 text-white py-3 rounded-2xl">
            <Users className="mr-2 h-5 w-5" />
            Join the Conversation
          </Button>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#232323]/90 backdrop-blur-md border-t border-[#dab216]/20 z-50">
        <div className="max-w-md mx-auto flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1 text-[#dab216]">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-[#679aa3]">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Stories</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-[#679aa3]">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Chat</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-[#679aa3]">
            <Users className="h-5 w-5" />
            <span className="text-xs">Community</span>
          </button>
        </div>
      </nav>

      {/* Bottom spacing for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;
