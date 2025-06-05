
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, BookOpen, Calendar, TrendingUp, Star } from "lucide-react";

export const CommunitySection = () => {
  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-teal-100 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">🔗</span>
            <span className="text-teal-700 font-medium">Community & Resources</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Connect, Learn, Grow Together
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our supportive community of caregivers sharing experiences, resources, 
            and encouragement on this meaningful journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Community Forum */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Community Forum</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">2.3k Members</Badge>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription>
                Connect with other caregivers, share experiences, and seek advice in our supportive community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-800">Recent Discussion</span>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                  <p className="text-xs text-gray-600">"Managing care transitions during holidays"</p>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-800">Support Group</span>
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-600">"First-time caregivers welcome here"</p>
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Join Forum
              </Button>
            </CardContent>
          </Card>
          
          {/* Blog */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Caregiving Blog</CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1">Weekly Updates</Badge>
                </div>
              </div>
              <CardDescription>
                Regular posts covering end-of-life care, legal matters, transitions, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-purple-800">Latest Post</span>
                  <p className="text-xs text-gray-600 mt-1">"Navigating Legal Documents: A Step-by-Step Guide"</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-purple-800">Popular</span>
                  <p className="text-xs text-gray-600 mt-1">"Self-Care for Caregivers: Why It Matters"</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-500">4.9/5 rating</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Read Blog
              </Button>
            </CardContent>
          </Card>
          
          {/* Resource Library */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Resource Library</CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1">100+ Resources</Badge>
                </div>
              </div>
              <CardDescription>
                Comprehensive collection of tools, templates, and external links for various caregiving aspects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Care Planning Templates</span>
                    <Badge variant="outline" className="text-xs">PDF</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Downloadable planning worksheets</p>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Emergency Contacts</span>
                    <Badge variant="outline" className="text-xs">Template</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Organize important phone numbers</p>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Legal Checklists</span>
                    <Badge variant="outline" className="text-xs">Guide</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Step-by-step legal preparations</p>
                </div>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Browse Library
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
