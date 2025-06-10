import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Heart, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Stories = () => {
  const stories = [
    {
      id: 1,
      title: "Finding Strength in Unexpected Places",
      description: "Sarah's journey of caring for her mother with dementia",
      readTime: "5 min",
      category: "Family Care",
      color: "#dab216"
    },
    {
      id: 2,
      title: "Building a Support Network",
      description: "How community helped during the hardest times",
      readTime: "7 min",
      category: "Community",
      color: "#679aa3"
    },
    {
      id: 3,
      title: "Home Safety Transformations",
      description: "Making spaces safe and comfortable for aging loved ones",
      readTime: "4 min",
      category: "Safety",
      color: "#2b6cb0"
    }
  ];

  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#c4a91a]">Stories</h1>
        </header>

        <div ref={gridRef} className="space-y-4">
          {stories.map((story, index) => (
            <Card key={story.id} className={`
                bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer transition-all duration-700
                ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              `}
              style={{
                transitionDelay: gridVisible ? `${index * 150}ms` : '0ms'
              }}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: story.color }}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="text-white border-white/30 text-xs" style={{ backgroundColor: story.color }}>
                        {story.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs">{story.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                      {story.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#373618' }}>
                      {story.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">Helpful story</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn" style={{ color: story.color }}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Stories;