
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Heart, Clock, Download, Share, Star, ChevronDown, ChevronUp, Tag, Calendar, Globe, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const BookDetails = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [showDetails, setShowDetails] = useState(false);

  const chapters = [
    {
      title: "The Story of This Book",
      description: "An introduction to how this caregiving collection came to be.",
      pages: "16 pages"
    },
    {
      title: "Caregiving Journeys Begin",
      description: "Stories of how caregiving starts, from reluctant to instant caregivers.",
      pages: "24 pages"
    },
    {
      title: "Navigating Conflicts",
      description: "Managing disagreements, emotional strain, and family chaos.",
      pages: "50 pages"
    },
    {
      title: "Evaluating Housing Options",
      description: "Exploring living arrangements from shared homes to retirement communities.",
      pages: "43 pages"
    },
    {
      title: "Ensuring Safety & Security",
      description: "Addressing risks like abuse, theft, falls, and medication mismanagement.",
      pages: "64 pages"
    },
    {
      title: "Accepting Dependence",
      description: "Navigating changes in independence, mobility, and competence.",
      pages: "24 pages"
    },
    {
      title: "Leveraging Legal Documents",
      description: "Understanding POAs, wills, directives, and end-of-life legal prep.",
      pages: "29 pages"
    },
    {
      title: "Easing Transition",
      description: "Supportive care like hospice, respite, and emotional comfort.",
      pages: "20 pages"
    },
    {
      title: "Supporting End of Life",
      description: "Providing dignity and closure in final caregiving moments.",
      pages: "27 pages"
    },
    {
      title: "Ending the Caregiving Journey",
      description: "Reflecting on what comes after caregiving ends.",
      pages: "7 pages"
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
          <Card className="relative bg-white/90 backdrop-blur-md shadow-lg overflow-hidden p-0 mb-6">
            {/* Book cover background top half */}
            <div
              className="h-48 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://villagecore.org/wp-content/uploads/2024/09/91UyCtrS8ZL._SL1500_.jpg')`,
              }}
            >
            </div>

            {/* Content over bottom half */}
            <div className="relative z-10 p-6 -mt-10 bg-white/90 backdrop-blur-md rounded-t-3xl">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-[#232323] mb-2">
                  Caregiving with Heart: A Journey of Love and Resilience
                </h2>
                <p className="text-[#373618] text-sm mb-4">
                  A comprehensive guide filled with real stories, practical advice, and emotional support for caregivers. Written by our community, for our community.
                </p>

                {/* Pricing Cards */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-[#ff7f50]/10 to-[#ff7f50]/20 border border-[#ff7f50]/30 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <Download className="h-4 w-4 text-[#ff7f50]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#232323] mb-1">Digital Edition</h4>
                    <p className="text-xl font-bold text-[#ff7f50] mb-1">$12.99</p>
                    <p className="text-xs text-[#373618]">Instant download</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#679aa3]/10 to-[#679aa3]/20 border border-[#679aa3]/30 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <BookOpen className="h-4 w-4 text-[#679aa3]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#232323] mb-1">Paperback</h4>
                    <p className="text-xl font-bold text-[#679aa3] mb-1">$24.99</p>
                    <p className="text-xs text-[#373618]">Free shipping</p>
                  </div>
                </div>

                {/* Book Details Dropdown */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between p-3 bg-white/50 hover:bg-white/70 border border-gray-200/50 rounded-lg transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-[#232323] flex items-center">
                      <Bookmark className="h-4 w-4 mr-2 text-[#679aa3]" />
                      Book Details
                    </span>
                    {showDetails ? 
                      <ChevronUp className="h-4 w-4 text-[#679aa3]" /> : 
                      <ChevronDown className="h-4 w-4 text-[#679aa3]" />
                    }
                  </button>
                  
                  {showDetails && (
                    <div className="mt-2 p-4 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg space-y-3 animate-fade-in">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-[#679aa3]" />
                        <div>
                          <p className="text-xs text-[#373618]">Published</p>
                          <p className="text-sm font-medium text-[#232323]">September 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Tag className="h-4 w-4 text-[#679aa3]" />
                        <div>
                          <p className="text-xs text-[#373618]">ISBN</p>
                          <p className="text-sm font-medium text-[#232323]">978-0-123456-78-9</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-[#679aa3]" />
                        <div>
                          <p className="text-xs text-[#373618]">Language</p>
                          <p className="text-sm font-medium text-[#232323]">English</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Heart className="h-4 w-4 text-[#679aa3]" />
                        <div>
                          <p className="text-xs text-[#373618]">Genre</p>
                          <p className="text-sm font-medium text-[#232323]">Self-Help, Caregiving, Health & Wellness</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#dab216] text-[#dab216]" />
                    ))}
                  </div>
                  <span className="text-[#373618] text-sm">5/5 rating</span>
                </div>

                {/* Button */}
                <div className="flex space-x-3">
                  <a
                    href="https://www.amazon.com/Experience-Caregiving-Seniors-Stories-Lighten/dp/B0D5QWBQPS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#ff7f50] text-white hover:bg-[#ff6a33] transition-colors duration-200">
                      {/* Amazon icon */}
                      <svg
                        className="mr-2 h-4 w-4 relative top-[2px]"
                        xmlns="http://www.w3.org/2000/svg"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        viewBox="0 0 512 465.46">
                        <path fill="#fff" fill-rule="nonzero" d="M141.03 228.54c0-21.41 5.28-39.72 15.83-54.92 10.55-15.21 24.98-26.69 43.29-34.45 16.75-7.13 37.39-12.25 61.9-15.36 8.38-.93 22.03-2.17 40.96-3.72v-7.91c0-19.86-2.17-33.21-6.51-40.03-6.52-9.31-16.76-13.97-30.73-13.97h-3.72c-10.24.93-19.08 4.19-26.53 9.78-7.45 5.58-12.26 13.34-14.43 23.27-1.24 6.21-4.34 9.77-9.31 10.71l-53.53-6.52c-5.27-1.24-7.91-4.03-7.91-8.38 0-.93.16-2.02.47-3.26 5.27-27.61 18.23-48.09 38.86-61.44C210.31 9 234.43 1.55 262.05 0h11.64c35.37 0 62.99 9.15 82.85 27.46 3.11 3.12 5.99 6.46 8.61 10.01 2.64 3.57 4.73 6.75 6.28 9.54 1.56 2.79 2.95 6.83 4.19 12.1 1.24 5.28 2.17 8.93 2.8 10.94.62 2.02 1.08 6.36 1.39 13.04.31 6.67.47 10.62.47 11.86v112.64c0 8.07 1.16 15.44 3.49 22.11 2.32 6.68 4.58 11.48 6.75 14.43 2.17 2.95 5.74 7.68 10.7 14.2 1.86 2.79 2.8 5.27 2.8 7.45 0 2.48-1.25 4.65-3.73 6.51-25.76 22.35-39.72 34.45-41.89 36.31-3.72 2.79-8.22 3.1-13.5.93-4.34-3.73-8.14-7.29-11.4-10.71-3.26-3.41-5.59-5.89-6.98-7.44-1.4-1.56-3.65-4.58-6.75-9.08-3.11-4.5-5.28-7.52-6.52-9.08-17.38 18.93-34.44 30.72-51.2 35.38-10.55 3.1-23.58 4.65-39.1 4.65-23.89 0-43.52-7.37-58.88-22.11-15.36-14.74-23.04-35.6-23.04-62.6zm275.55 140.57c.62-1.24 1.55-2.49 2.8-3.73 7.75-5.27 15.2-8.84 22.34-10.7 11.79-3.1 23.27-4.81 34.44-5.12 3.1-.31 6.05-.16 8.84.46 13.97 1.24 22.35 3.57 25.14 6.98 1.24 1.87 1.86 4.66 1.86 8.38v3.26c0 10.86-2.95 23.66-8.84 38.4-5.9 14.74-14.12 26.61-24.67 35.61-1.55 1.24-2.95 1.86-4.19 1.86-.62 0-1.24-.15-1.86-.46-1.86-.93-2.33-2.64-1.4-5.13 11.48-26.99 17.22-45.76 17.22-56.31 0-3.42-.62-5.9-1.86-7.45-3.1-3.72-11.79-5.59-26.06-5.59-5.28 0-11.49.31-18.62.93-7.76.94-14.9 1.86-21.42 2.8-1.86 0-3.1-.31-3.72-.94-.62-.62-.77-1.24-.46-1.86 0-.31.15-.77.46-1.39zM.93 361.2c1.55-2.49 4.03-2.64 7.45-.47 77.57 44.99 161.98 67.49 253.21 67.49 60.81 0 120.86-11.33 180.13-33.98 1.55-.62 3.8-1.55 6.75-2.79s5.04-2.17 6.28-2.79c4.65-1.86 8.3-.93 10.94 2.79 2.64 3.72 1.78 7.14-2.56 10.24-5.59 4.03-12.73 8.69-21.41 13.96-26.69 15.83-56.48 28.09-89.37 36.77-32.89 8.69-65.01 13.04-96.35 13.04-48.41 0-94.18-8.46-137.31-25.37-43.13-16.91-81.77-40.73-115.9-71.45-1.86-1.55-2.79-3.1-2.79-4.65 0-.93.31-1.87.93-2.79zm220.16-141.97c0 12.1 3.03 21.8 9.08 29.09 6.05 7.29 14.19 10.94 24.43 10.94.93 0 2.25-.16 3.96-.47 1.71-.31 2.87-.46 3.49-.46 13.03-3.41 23.12-11.79 30.25-25.13 3.42-5.9 5.98-12.34 7.68-19.32 1.71-6.98 2.64-12.65 2.8-16.99.15-4.35.23-11.48.23-21.41v-11.64c-18 0-31.65 1.24-40.96 3.72-27.31 7.76-40.96 24.98-40.96 51.67z" />
                      </svg>
                      Buy from Amazon
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>


          {/* Book Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="bg-white/90 backdrop-blur-md p-4 text-center">
              <div className="font-bold text-lg text-[#ff7f50]">313</div>
              <div className="text-xs text-[#373618]">Pages</div>
            </Card>
            <Card className="bg-white/90 backdrop-blur-md p-4 text-center">
              <div className="font-bold text-lg text-[#679aa3]">15k+</div>
              <div className="text-xs text-[#373618]">Downloads</div>
            </Card>
            <Card className="bg-white/90 backdrop-blur-md p-4 text-center">
              <div className="font-bold text-lg text-[#2b6cb0]">5.0</div>
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
