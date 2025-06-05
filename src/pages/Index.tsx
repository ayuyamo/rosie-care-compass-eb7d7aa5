
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Menu, X } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";
import { ModuleCard } from "@/components/ModuleCard";
import { StoryCard } from "@/components/StoryCard";
import { InteractiveTools } from "@/components/InteractiveTools";
import { CommunitySection } from "@/components/CommunitySection";

const caregivingModules = [
  {
    id: "new-to-caregiving",
    title: "New to Caregiving",
    description: "Guidance for those starting their caregiving journey",
    icon: Compass,
    color: "bg-emerald-100 text-emerald-700",
    stories: ["Reluctantly", "Obligatory", "Overwhelmed"]
  },
  {
    id: "conflicts",
    title: "Conflicts",
    description: "Strategies for resolving common caregiving tensions",
    icon: MessageCircle,
    color: "bg-amber-100 text-amber-700",
    stories: ["Timeliness", "Money Matters", "Family Dynamics"]
  },
  {
    id: "housing",
    title: "Housing",
    description: "Navigating housing decisions for seniors",
    icon: Home,
    color: "bg-blue-100 text-blue-700",
    stories: ["Not in the Same City", "Shared Housing with Other Care Recipients"]
  },
  {
    id: "safety",
    title: "Safety",
    description: "Ensuring safety for caregivers and care recipients",
    icon: Shield,
    color: "bg-red-100 text-red-700",
    stories: ["Financial Obstacles", "Hazard Falls"]
  },
  {
    id: "dependence",
    title: "Dependence",
    description: "Coping with increasing dependence",
    icon: Heart,
    color: "bg-purple-100 text-purple-700",
    stories: ["Independence vs Safety", "Role Reversal"]
  },
  {
    id: "legal",
    title: "Legal",
    description: "Understanding legal responsibilities",
    icon: Scale,
    color: "bg-indigo-100 text-indigo-700",
    stories: ["Power of Attorney", "Healthcare Directives"]
  },
  {
    id: "transition",
    title: "Transition",
    description: "Managing significant changes in caregiving",
    icon: ArrowRight,
    color: "bg-teal-100 text-teal-700",
    stories: ["Moving to Care Facility", "Changing Needs"]
  },
  {
    id: "end-of-life",
    title: "End of Life",
    description: "Support for life's final stages",
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
    stories: ["Difficult Conversations", "Comfort Care"]
  },
  {
    id: "end-of-caregiving",
    title: "End of Caregiving",
    description: "Finding closure after caregiving concludes",
    icon: BookOpen,
    color: "bg-slate-100 text-slate-700",
    stories: ["Grief and Healing", "Moving Forward"]
  }
];

const Index = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <h1 className="text-2xl font-bold text-gray-800">Experiences of Living</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu />
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-rose-100">
              <NavigationMenu mobile />
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-rose-100 rounded-full px-4 py-2 mb-6">
                <span className="text-2xl">👋</span>
                <span className="text-rose-700 font-medium">Welcome from Rosie</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Your Caregiving Journey <br />
                <span className="text-rose-500">Starts Here</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                I'm Rosie, your virtual companion sharing personal experiences in senior caregiving. 
                Find guidance, empathy, and curated resources to support you at every stage of your journey.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Stories
              </Button>
              <Button size="lg" variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Caregiving Modules */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
              <span className="text-2xl">🧭</span>
              <span className="text-blue-700 font-medium">Main Caregiving Modules</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Navigate Your Caregiving Path
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nine comprehensive modules addressing every aspect of caregiving, each featuring personal stories, 
              practical resources, and guided questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caregivingModules.map((module) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                isSelected={selectedModule === module.id}
                onSelect={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Connect Deeper Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-4 py-2 mb-6">
              <span className="text-2xl">💬</span>
              <span className="text-purple-700 font-medium">Connect Deeper</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Guided Reflection
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reflective questions designed to foster meaningful conversations between 
              caregivers and their loved ones, enhancing understanding and strengthening relationships.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Sample Reflection Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2">For New Caregivers</h4>
                    <p className="text-gray-600">"What are your biggest concerns about starting this journey?"</p>
                  </div>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2">Managing Conflicts</h4>
                    <p className="text-gray-600">"How can we better communicate about our different needs?"</p>
                  </div>
                </div>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Access All Reflection Questions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stories & Resources Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-6">
              <span className="text-2xl">📚</span>
              <span className="text-green-700 font-medium">Explore Stories & Resources</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Real Experiences, Practical Solutions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StoryCard 
              category="New to Caregiving"
              title="Reluctantly"
              description="Starting the caregiving journey when you're not ready"
              color="emerald"
            />
            <StoryCard 
              category="Conflicts"
              title="Money Matters"
              description="Navigating financial disagreements in caregiving"
              color="amber"
            />
            <StoryCard 
              category="Housing"
              title="Not in the Same City"
              description="Managing care from a distance"
              color="blue"
            />
            <StoryCard 
              category="Safety"
              title="Hazard Falls"
              description="Preventing falls and ensuring home safety"
              color="red"
            />
            <StoryCard 
              category="Dependence"
              title="Role Reversal"
              description="When you become the decision maker"
              color="purple"
            />
            <StoryCard 
              category="Legal"
              title="Power of Attorney"
              description="Understanding legal responsibilities"
              color="indigo"
            />
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <InteractiveTools />

      {/* Book Integration */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-4 py-2 mb-6">
              <span className="text-2xl">📖</span>
              <span className="text-amber-700 font-medium">Book Integration</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Companion to "Experience: Caregiving for Seniors"
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              This website expands on the themes from Yasmin Shah's book, offering additional 
              resources and interactive content to support caregivers on their journey.
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="bg-amber-200 rounded-lg p-4">
                  <BookOpen className="h-12 w-12 text-amber-700" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="text-xl font-bold text-amber-800 mb-2">
                    "Stories that Lighten the Journey"
                  </h4>
                  <p className="text-amber-700">
                    Discover how real stories can provide comfort, guidance, and hope during challenging times.
                  </p>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Get the Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <CommunitySection />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-rose-400" />
                <span className="text-lg font-bold">Experiences of Living</span>
              </div>
              <p className="text-gray-400">
                Supporting caregivers with stories, resources, and community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resource Library</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interactive Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Groups</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Rosie</a></li>
                <li><a href="#" className="hover:text-white transition-colors">The Book</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Experiences of Living. Made with ❤️ for caregivers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
