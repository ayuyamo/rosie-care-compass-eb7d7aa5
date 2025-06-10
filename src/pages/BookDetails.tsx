
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Heart, Clock, Download, Share, Star } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const BookDetails = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const chapters = [
    {
      title: "Understanding the Journey",
      description: "Beginning your caregiving path with wisdom and preparation",
      pages: "12 pages"
    },
    {
      title: "Emotional Resilience",
      description: "Building strength through difficult times",
      pages: "18 pages"
    },
    {
      title: "Practical Care Strategies",
      description: "Day-to-day tips for effective caregiving",
      pages: "25 pages"
    },
    {
      title: "Self-Care for Caregivers",
      description: "Maintaining your own well-being while caring for others",
      pages: "15 pages"
    },
    {
      title: "Building Support Networks",
      description: "Creating and maintaining helpful connections",
      pages: "20 pages"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#679aa3]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#232323]">Our Official Book</h1>
        </header>

        <div ref={contentRef} className={`transition-all duration-1000 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {/* Book Overview Card */}
          <Card className="bg-white/90 backdrop-blur-md shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-24 h-32 bg-[#dab216] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#232323] mb-2">
                Caregiving with Heart: A Journey of Love and Resilience
              </h2>
              <p className="text-[#373618] text-sm mb-4">
                A comprehensive guide filled with real stories, practical advice, and emotional support for caregivers. Written by our community, for our community.
              </p>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#dab216] text-[#dab216]" />
                  ))}
                </div>
                <span className="text-[#373618] text-sm">4.9/5 rating</span>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-[#dab216] text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="border-[#679aa3] text-[#679aa3]">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Book Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="bg-white/90 backdrop-blur-md p-4 text-center">
              <div className="font-bold text-lg text-[#dab216]">90</div>
              <div className="text-xs text-[#373618]">Pages</div>
            </Card>
            <Card className="bg-white/90 backdrop-blur-md p-4 text-center">
              <div className="font-bold text-lg text-[#679aa3]">15k+</div>
              <div className="text-xs text-[#373618]">Downloads</div>
            </Card>
            <Card className="bg-white/90 backdrop-blur-md p-4 text-center">
              <div className="font-bold text-lg text-[#2b6cb0]">4.9</div>
              <div className="text-xs text-[#373618]">Rating</div>
            </Card>
          </div>

          {/* Chapters */}
          <h3 className="text-lg font-bold text-[#232323] mb-4">Table of Contents</h3>
          <div className="space-y-3">
            {chapters.map((chapter, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-md p-4 cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#679aa3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#232323] mb-1">{chapter.title}</h4>
                    <p className="text-[#373618] text-sm mb-2">{chapter.description}</p>
                    <div className="flex items-center space-x-2 text-[#679aa3]">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{chapter.pages}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default BookDetails;
