
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, MessageSquare, BookOpen, Lightbulb } from "lucide-react";

export const InteractiveTools = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">🎮</span>
            <span className="text-indigo-700 font-medium">Interactive Tools</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Engage & Reflect
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive elements designed to help caregivers reflect on their experiences 
            and improve communication with care recipients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full">
                <Gamepad2 className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Digital Card Game</CardTitle>
              <CardDescription>
                Scenario-based cards with reflection questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Play Now
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Conversation Starters</CardTitle>
              <CardDescription>
                Questions to enhance communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Get Questions
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg">Story Builder</CardTitle>
              <CardDescription>
                Create and share your own experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Start Writing
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full">
                <Lightbulb className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Daily Insights</CardTitle>
              <CardDescription>
                Personalized tips and reflections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Get Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
