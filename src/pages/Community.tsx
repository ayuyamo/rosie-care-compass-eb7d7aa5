
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MessageCircle, Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
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
    { name: "Dementia Care Support", members: 1250, color: "#c4a91a" },
    { name: "Legal & Financial", members: 890, color: "#5a7a85" },
    { name: "Home Safety Tips", members: 2100, color: "#4a90a4" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f2d0] via-[#e8e5e0] to-[#d6e5f0] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-[#5a7a85]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-[#c4a91a]">Community</h1>
          </div>
          <Button className="bg-[#c4a91a] hover:bg-[#c4a91a]/80 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Post
          </Button>
        </header>

        {/* Popular Groups */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#5a7a85] mb-3">Popular Groups</h2>
          <div className="space-y-2">
            {groups.map((group, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-md border border-[#c4a91a]/20 p-3">
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
                  <Button variant="outline" size="sm" className="border-[#c4a91a] text-[#c4a91a]">
                    Join
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-lg font-bold text-[#5a7a85] mb-3">Recent Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-white/80 backdrop-blur-md border border-[#c4a91a]/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={post.avatar} 
                      alt={post.author}
                      className="w-10 h-10 rounded-full border-2 border-[#c4a91a]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[#5a7a85]">{post.author}</span>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ borderColor: "#c4a91a", color: "#c4a91a" }}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#7a8a90]">{post.time}</p>
                    </div>
                  </div>
                  
                  <p className="text-[#5a7a85] mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-[#c4a91a] hover:text-[#c4a91a]/80">
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
    </div>
  );
};

export default Community;
