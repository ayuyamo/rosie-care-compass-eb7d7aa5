
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MessageCircle, Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CommunitySkeleton } from "@/components/ui/skeletons";
import { useState, useEffect } from "react";

const Community = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: postsRef, isVisible: postsVisible } = useScrollAnimation();
  const { ref: groupRef, isVisible: groupVisible } = useScrollAnimation();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const posts = [
    {
      id: 1,
      author: "Maria S.",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face",
      time: "2 hours ago",
      content: "Just wanted to share this amazing resource I found - a physical therapist who does home visits! Game changer for my dad's mobility exercises.",
      category: "Resources",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: "David K.",
      avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=40&h=40&fit=crop&crop=face",
      time: "4 hours ago",
      content: "Finally got the power of attorney documents sorted out. Happy to share what I learned about the process if anyone needs help navigating this!",
      category: "Legal",
      likes: 18,
      comments: 12
    },
    {
      id: 3,
      author: "Lisa M.",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face",
      time: "6 hours ago",
      content: "Anyone else feeling exhausted today? Sometimes I forget to take care of myself while caring for mom. Reminder to all of us to practice self-care! 💕",
      category: "Support",
      likes: 42,
      comments: 15
    }
  ];

  const groups = [
    { name: "Dementia Care Support", members: 1250, color: "#679267" },
    { name: "Legal & Financial", members: 890, color: "#5a7a85" },
    { name: "Home Safety Tips", members: 2100, color: "#4a90a4" }
  ];

  useEffect(() => {
    // Simulate initial load time
    setTimeout(() => setIsLoading(false), 900);
  }, []);

  if (isLoading) {
    return <CommunitySkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center justify-between mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-[#5a7a85]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-[#F08080]">Community</h1>
          </div>
          <Button className="bg-[#F08080] hover:bg-[#F08080]/80 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Post
          </Button>
        </header>

        {/* Popular Groups */}
        <div className="mb-6">
          <h2 ref={titleRef} className={`text-lg font-bold text-[#5a7a85] mb-3 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>Popular Groups</h2>
          <div className="space-y-2">
            {groups.map((group, index) => (
              <Card ref={groupRef} key={index} className={`bg-white/80 backdrop-blur-md border border-gray-200 p-3 ${groupVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} transition-all duration-700`}
                style={{
                  transitionDelay: groupVisible ? `${index * 150}ms` : '0ms'
                }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: group.color }}
                    >
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5a7a85]">{group.name}</h3>
                      <p className="text-sm text-[#7a8a90]">{group.members} members</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-2 border-[#F08080] text-[#F08080] text-md">
                    Join
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div ref={postsRef}>
          <h2 className={`text-lg font-bold text-[#5a7a85] mb-3 transition-all duration-700 ${postsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>Recent Posts</h2>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <Card key={post.id} className={`bg-white/80 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-lg ${postsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} transition-all duration-700`}
                style={{
                  transitionDelay: postsVisible ? `${index * 200}ms` : '0ms'
                }}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full border-2 border-[#679267]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[#5a7a85]">{post.author}</span>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{ borderColor: "#F08080", color: "#F08080" }}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#7a8a90]">{post.time}</p>
                    </div>
                  </div>

                  <p className="text-[#5a7a85] mb-4">{post.content}</p>

                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-[#F08080] hover:text-[#F08080]/80">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-[#5a7a85] hover:text-[#5a7a85]/80">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Community;
