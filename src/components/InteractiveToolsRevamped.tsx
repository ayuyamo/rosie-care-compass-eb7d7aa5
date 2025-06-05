
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, MessageSquare, BookOpen, Lightbulb, Sparkles, Zap, Star } from "lucide-react";

const tools = [
  {
    title: "Cosmic Card Game",
    description: "Journey through scenarios with reflection",
    icon: Gamepad2,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50/20 to-pink-50/20",
    emoji: "🎮",
    action: "Launch Game"
  },
  {
    title: "Conversation Starters",
    description: "Unlock meaningful dialogues",
    icon: MessageSquare,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50/20 to-cyan-50/20",
    emoji: "💬",
    action: "Get Questions"
  },
  {
    title: "Story Architect",
    description: "Build and share your experiences",
    icon: BookOpen,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50/20 to-emerald-50/20",
    emoji: "📖",
    action: "Start Creating"
  },
  {
    title: "Daily Wisdom",
    description: "Personalized insights and reflections",
    icon: Lightbulb,
    gradient: "from-orange-500 to-amber-600",
    bgGradient: "from-orange-50/20 to-amber-50/20",
    emoji: "💡",
    action: "Get Insights"
  }
];

export const InteractiveToolsRevamped = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-indigo-400/20 rounded-full px-6 py-3 mb-8">
            <Zap className="h-6 w-6 text-indigo-300" />
            <span className="text-indigo-200 font-bold text-lg">Interactive Universe</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-6">
            Tools for Transformation
          </h3>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Engage with interactive experiences designed to deepen understanding, 
            spark conversations, and create meaningful connections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            
            return (
              <div
                key={tool.title}
                className="group"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Card className={`h-full bg-gradient-to-br ${tool.bgGradient} backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden`}>
                  {/* Floating Sparkles */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="h-5 w-5 text-yellow-300" />
                  </div>
                  
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${tool.gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 text-2xl">
                        {tool.emoji}
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-yellow-200 transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-purple-200 text-lg">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Button className={`w-full bg-gradient-to-r ${tool.gradient} hover:shadow-xl text-white py-3 rounded-xl transform hover:scale-105 transition-all duration-300 group-hover:animate-pulse`}>
                      <Star className="mr-2 h-5 w-5" />
                      {tool.action}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Reflection Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
                  Sample Reflection Questions
                </h4>
                <p className="text-purple-100 text-lg">
                  Thoughtfully crafted prompts to deepen understanding and strengthen bonds
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <h5 className="font-bold text-purple-200 mb-3 text-lg">🌱 For New Caregivers</h5>
                  <p className="text-white italic">"What hopes and fears are you carrying as you begin this journey?"</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <h5 className="font-bold text-purple-200 mb-3 text-lg">🤝 Managing Tensions</h5>
                  <p className="text-white italic">"How can we create space for both our needs in this relationship?"</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-2xl shadow-2xl">
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Access All Reflections
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
