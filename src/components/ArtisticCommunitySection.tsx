
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, BookOpen, Calendar, TrendingUp, Star, Heart, Sparkles } from "lucide-react";

const communitySpaces = [
  {
    title: "Community Constellation",
    description: "A galaxy of caregivers sharing wisdom and support",
    icon: Users,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50/20 to-indigo-50/20",
    members: "2.3k",
    status: "Thriving",
    emoji: "🌌",
    highlights: [
      { title: "Recent Discussion", content: "Managing care transitions during holidays", icon: Star },
      { title: "Support Circle", content: "First-time caregivers welcome here", icon: Heart }
    ]
  },
  {
    title: "Wisdom Library",
    description: "Stories, insights, and guidance from the community",
    icon: BookOpen,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50/20 to-pink-50/20",
    members: "Weekly",
    status: "Updates",
    emoji: "📚",
    highlights: [
      { title: "Latest Post", content: "Navigating Legal Documents: A Step-by-Step Guide", icon: BookOpen },
      { title: "Popular", content: "Self-Care for Caregivers: Why It Matters", icon: Star }
    ]
  },
  {
    title: "Resource Galaxy",
    description: "Comprehensive tools and templates for every journey",
    icon: MessageCircle,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50/20 to-emerald-50/20",
    members: "100+",
    status: "Resources",
    emoji: "🛠️",
    highlights: [
      { title: "Care Planning", content: "Downloadable planning worksheets", icon: MessageCircle },
      { title: "Emergency Kit", content: "Important contacts template", icon: Star }
    ]
  }
];

export const ArtisticCommunitySection = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-teal-400/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="h-6 w-6 text-teal-300" />
            <span className="text-teal-200 font-bold text-lg">Community Cosmos</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300 mb-6">
            Connect, Learn, Flourish
          </h3>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Join a constellation of caring souls, sharing experiences, resources, 
            and encouragement across the infinite expanse of caregiving.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {communitySpaces.map((space, index) => {
            const IconComponent = space.icon;
            
            return (
              <div
                key={space.title}
                className="group"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <Card className={`h-full bg-gradient-to-br ${space.bgGradient} backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 relative overflow-hidden`}>
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${space.gradient} opacity-20 rounded-full blur-3xl`}></div>
                  </div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${space.gradient} shadow-xl group-hover:rotate-12 transition-transform duration-500`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-3xl">{space.emoji}</span>
                          <CardTitle className="text-2xl text-white group-hover:text-yellow-200 transition-colors">
                            {space.title}
                          </CardTitle>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-white/20 text-white border-white/30 text-xs">
                            {space.members} {space.status}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-xs text-green-300">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-purple-200 text-lg">
                      {space.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <div className="space-y-4 mb-6">
                      {space.highlights.map((highlight) => {
                        const HighlightIcon = highlight.icon;
                        return (
                          <div key={highlight.title} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                            <div className="flex items-start space-x-3">
                              <HighlightIcon className="h-5 w-5 text-yellow-300 mt-0.5" />
                              <div>
                                <span className="text-white font-semibold block">{highlight.title}</span>
                                <p className="text-purple-200 text-sm mt-1">{highlight.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Button className={`w-full bg-gradient-to-r ${space.gradient} hover:shadow-xl text-white py-3 rounded-xl transform hover:scale-105 transition-all duration-300`}>
                      <Star className="mr-2 h-5 w-5" />
                      Explore Space
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-3xl rounded-3xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h4 className="text-2xl font-bold text-white mb-4">Ready to Join Our Universe?</h4>
              <p className="text-purple-200 mb-6">
                Become part of a community that understands your journey and celebrates your strength.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Users className="mr-3 h-6 w-6" />
                Join the Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
