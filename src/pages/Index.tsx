
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Menu, X, Sparkles, Star, Zap } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";
import { FloatingModuleGrid } from "@/components/FloatingModuleGrid";
import { CreativeStorySection } from "@/components/CreativeStorySection";
import { InteractiveToolsRevamped } from "@/components/InteractiveToolsRevamped";
import { ArtisticCommunitySection } from "@/components/ArtisticCommunitySection";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Navigation */}
      <header className="relative z-50 p-4">
        <div className="container mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Heart className="h-10 w-10 text-pink-400" />
                  <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Experiences</h1>
                  <p className="text-pink-200 text-sm">of Living</p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <NavigationMenu />
              </div>
              
              <button 
                className="md:hidden p-2 text-white bg-white/20 rounded-xl backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            
            {mobileMenuOpen && (
              <div className="md:hidden mt-6 pt-6 border-t border-white/20">
                <NavigationMenu mobile />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Artistic Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">👋</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-900" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-pink-200 text-lg">Welcome from</p>
                    <p className="text-white text-2xl font-bold">Rosie</p>
                  </div>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-8 leading-tight">
                  Your Journey
                  <br />
                  <span className="text-white">Starts Here</span>
                </h2>
                
                <p className="text-xl text-purple-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                  Step into a world of shared experiences and wisdom. I'm your virtual companion, 
                  here to illuminate your caregiving path with stories, resources, and heartfelt guidance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Zap className="mr-3 h-6 w-6" />
                    Begin Your Journey
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl backdrop-blur-sm">
                    <Users className="mr-3 h-6 w-6" />
                    Join Our Circle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Modules Grid */}
      <FloatingModuleGrid />

      {/* Creative Stories Section */}
      <CreativeStorySection />

      {/* Interactive Tools Revamped */}
      <InteractiveToolsRevamped />

      {/* Artistic Community */}
      <ArtisticCommunitySection />

      {/* Floating Book Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-3xl rounded-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center space-x-3 bg-amber-400/20 rounded-full px-6 py-3 mb-6">
                    <span className="text-3xl">📖</span>
                    <span className="text-amber-200 font-bold text-lg">Book Integration</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300 mb-6">
                    Stories that Transform
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-white">
                      Companion to "Experience: Caregiving for Seniors"
                    </h4>
                    <p className="text-purple-100 text-lg leading-relaxed">
                      Dive deeper into Yasmin Shah's transformative book with interactive content, 
                      expanded resources, and a community of caring souls on similar journeys.
                    </p>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl shadow-xl">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Explore the Book
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl transform hover:rotate-3 transition-transform duration-300">
                      <BookOpen className="h-16 w-16 text-white mx-auto mb-4" />
                      <p className="text-white font-bold text-lg">Available Now</p>
                      <p className="text-amber-100">Digital & Print Editions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cosmic Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                <Heart className="h-8 w-8 text-pink-400" />
                <div>
                  <span className="text-xl font-bold text-white block">Experiences</span>
                  <span className="text-pink-200 text-sm">of Living</span>
                </div>
              </div>
              <p className="text-purple-200">
                Illuminating the caregiving journey with compassion and wisdom.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Discover</h4>
              <ul className="space-y-3 text-purple-200">
                <li><a href="#" className="hover:text-pink-300 transition-colors">Stories</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Modules</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Connect</h4>
              <ul className="space-y-3 text-purple-200">
                <li><a href="#" className="hover:text-pink-300 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">About</h4>
              <ul className="space-y-3 text-purple-200">
                <li><a href="#" className="hover:text-pink-300 transition-colors">Rosie's Story</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">The Book</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-purple-200">
              &copy; 2024 Experiences of Living. Crafted with ❤️ for caregivers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
