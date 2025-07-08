
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Heart, Clock, Download, Share, Star, ChevronDown, ChevronUp, Tag, Calendar, Globe, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchBookDetails, fetchBookChapters } from "@/lib/supabase/supabaseApi";

const BookDetails = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState('paperback');

  const [chapters, setChapters] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const bookDetails = await fetchBookDetails();
        const chaptersData = await fetchBookChapters(bookDetails?.id);
        setBookDetails(bookDetails || null);
        setChapters(chaptersData || []);
        if (bookDetails) { }
      } catch (error) {
        console.error("Failed to load book details:", error);
      }
    };

    fetchBookInfo();
  }, []);

  useLayoutEffect(() => {
    if (bookDetails && chapters.length > 0) {
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    }
  }, [bookDetails, chapters]);


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

        <div ref={contentRef} className={`transition-all duration-1000 ${contentVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {/* Book Overview Card */}
          <Card className="relative bg-white/90 backdrop-blur-md shadow-lg overflow-hidden p-0 mb-6">
            {/* Book cover background top half */}
            <div
              className="h-48 bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${bookDetails?.cover_url})`,
              }}
            >
            </div>

            {/* Content over bottom half */}
            <div className="relative z-10 p-6 -mt-10 bg-white/90 backdrop-blur-md rounded-t-3xl">
              <div className="text-center mb-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[#232323] mb-1 italic">
                    {bookDetails?.title}
                  </h2>
                  <p className="text-sm text-[#555]">by <span className="italic">{bookDetails?.author}</span></p>
                </div>
                <p className="text-[#373618] text-sm mb-4">
                  {bookDetails?.description}
                </p>

                {/* Edition Tabs */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setSelectedEdition('paperback')}
                      className={`px-6 py-2 text-sm font-medium transition-colors relative ${selectedEdition === 'paperback'
                        ? 'text-[#232323]'
                        : 'text-gray-500'
                        }`}
                    >
                      Paperback
                      {selectedEdition === 'paperback' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#232323] animate-in slide-in-from-right duration-500"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedEdition('digital')}
                      className={`px-6 py-2 text-sm font-medium transition-colors relative ${selectedEdition === 'digital'
                        ? 'text-[#232323]'
                        : 'text-gray-500'
                        }`}
                    >
                      Digital
                      {selectedEdition === 'digital' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#232323] animate-in slide-in-from-left duration-500"></div>
                      )}
                    </button>
                  </div>

                  <div className="pt-4">
                    {selectedEdition === 'paperback' && (
                      <div className="text-center">
                        <p className="text-lg font-medium text-[#232323]">${bookDetails?.price_paperback} US</p>
                      </div>
                    )}
                    {selectedEdition === 'digital' && (
                      <div className="text-center">
                        <p className="text-lg font-medium text-[#232323]">${bookDetails?.price_digital} US</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Button */}
                <div className="flex space-x-3">
                  <a
                    href={bookDetails?.amazon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-[#ff9500] to-[#ff7f00] text-white hover:from-[#ff8800] hover:to-[#ff6600] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-0 font-semibold text-base py-3 rounded-xl">
                      {/* Amazon icon */}
                      <svg
                        className="mr-3 h-5 w-5 pt-[3px]"
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


          <div className="mb-6 shadow-sm rounded-lg">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-3 bg-white/50 hover:bg-white/70 border border-gray-200/50 rounded-lg transition-all duration-300 hover:shadow-md"
            >
              <span className="text-sm font-medium text-[#232323] flex items-center transition-colors duration-200">
                <Bookmark className="h-4 w-4 mr-2 text-[#679aa3] transition-colors duration-200" />
                Book Details
              </span>
              <div className={`transition-transform duration-300 ${showDetails ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown className="h-4 w-4 text-[#679aa3]" />
              </div>
            </button>

            {showDetails && (
              <div className="mt-2 p-4 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg space-y-3 animate-in fade-in duration-300 ease-out overflow-hidden" style={{ transformOrigin: 'top' }}>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-[#679aa3]" />
                  <div>
                    <p className="text-xs text-[#373618]">Published</p>
                    <p className="text-sm font-medium text-[#232323]">{bookDetails?.published_date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Tag className="h-4 w-4 text-[#679aa3]" />
                  <div>
                    <p className="text-xs text-[#373618]">ISBN-13</p>
                    <p className="text-sm font-medium text-[#232323]">{bookDetails?.isbn13}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-[#679aa3]" />
                  <div>
                    <p className="text-xs text-[#373618]">Language</p>
                    <p className="text-sm font-medium text-[#232323]">{bookDetails?.language}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-4 w-4 text-[#679aa3]" />
                  <div>
                    <p className="text-xs text-[#373618]">Pages</p>
                    <p className="text-sm font-medium text-[#232323]">{bookDetails?.page_count}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-4 w-4 text-[#679aa3]" />
                  <div>
                    <p className="text-xs text-[#373618]">Genre</p>
                    <p className="text-sm font-medium text-[#232323]">{bookDetails?.genre}</p>
                  </div>
                </div>
              </div>
            )}
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
