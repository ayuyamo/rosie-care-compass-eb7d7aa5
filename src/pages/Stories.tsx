
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Stories = () => {
  const stories = [
    {
      id: 1,
      title: "Finding Strength in Unexpected Places",
      description: "Sarah's journey of caring for her mother with dementia",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop",
      readTime: "5 min",
      category: "Family Care"
    },
    {
      id: 2,
      title: "Building a Support Network",
      description: "How community helped during the hardest times",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      readTime: "7 min",
      category: "Community"
    },
    {
      id: 3,
      title: "Home Safety Transformations",
      description: "Making spaces safe and comfortable for aging loved ones",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
      readTime: "4 min",
      category: "Safety"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f2d0] via-[#e8e5e0] to-[#d6e5f0] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#c4a91a]">Stories</h1>
        </header>

        <div className="space-y-4">
          {stories.map((story) => (
            <Card key={story.id} className="bg-white/80 backdrop-blur-md border border-[#c4a91a]/20 shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{story.readTime}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{story.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                  <p className="text-white/90 text-sm">{story.description}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#5a7a85]">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Helpful story</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#c4a91a]">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
