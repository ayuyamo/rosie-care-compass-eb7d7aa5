
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Menu, X, Sparkles, Star, Zap, Camera, Bell, Search } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { FloatingModuleGrid } from "@/components/FloatingModuleGrid";
import { CreativeStorySection } from "@/components/CreativeStorySection";
import CommunityHighlights from "@/components/CommunityHighlights";
import OfficialBookSection from "@/components/OfficialBookSection";
import PoetryCollectionSection from "@/components/PoetryCollectionSection";
import { injectElevenLabsWidget } from "@/lib/elevenlabsWidget";
import { searchContent } from "@/lib/searchContent";
import { Link } from "react-router-dom";

type SearchResults = {
  chapters: any[];
  books: any[];
  topics: any[];
  stories: any[];
};

const Index = () => {
  function highlightMatch(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ?
        (<mark key={i} className='bg-yellow-200'>{part}</mark>) : (part)
    )
  }
  function highlightSnippet(content: string, query: string, radius = 40): JSX.Element {
    if (!content || !query) return <>{content}</>;

    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIndex = lowerContent.indexOf(lowerQuery);

    if (matchIndex === -1) {
      // no match, fallback
      return <>{content.slice(0, 80)}...</>;
    }

    const start = Math.max(0, matchIndex - radius);
    const end = Math.min(content.length, matchIndex + query.length + radius);

    const before = content.slice(start, matchIndex);
    const match = content.slice(matchIndex, matchIndex + query.length);
    const after = content.slice(matchIndex + query.length, end);

    return (
      <>
        {start > 0 && '...'}
        {before}
        <span className="bg-yellow-200 font-semibold text-black">{match}</span>
        {after}
        {end < content.length && '...'}
      </>
    );
  }

  useEffect(() => {
    injectElevenLabsWidget();
  }, []);

  const [results, setResults] = useState<SearchResults | null>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Mobile App Header */}
      <header className="relative z-50 p-4 animate-fade-in bg-white/90 backdrop-blur-md border-b border-gray-200/30">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl border-4 border-[#e4e8e1] overflow-hidden">
                <img
                  src="/ChatGPT-rosie.png"
                  alt="Rosie Care Bot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ceda88] rounded-full flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#232323]">Rosie Care</h1>
              <p className="text-[#4B5320] text-sm">Your Guide</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="p-2 bg-[#a5aba0] rounded-lg"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg">
              <Menu className="h-5 w-5 text-[#373618]" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex flex-col items-center justify-center">
          <div className="relative w-[340px] md:w-[400px] lg:w-[500px] px-6">
            {/* Close Button */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute -top-10 right-0 text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Search Bar */}
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  setQuery(inputQuery);
                  const results = await searchContent(inputQuery);
                  setResults(results);
                  console.log('results: ', results)
                }
              }}
              className="w-full p-4 rounded-lg text-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#a5aba0]"
            />
          </div>
          {results ? (

            <div className='mt-6 bg-white p-4 rounded shadow max-h-[60vh] overflow-y-auto w-[340px] md:w-[400px] lg:w-[470px]'>
              {Object.entries(results).map(([table, items]) => {
                if (!items || items.length === 0) return null;
                return (
                  <div key={table} className='mb-4'>
                    <h2 className='text-lg font-semibold capitalize'>{table}</h2>
                    <ul className='list-none ml-6'>
                      {items.map((item, i) => {
                        return (
                          <li key={item.id || i} className="text-sm border-b pb-2">
                            {table === "chapters" && (
                              <Link
                                to={`/chapters/${item.id}/topics`}
                              >
                                <p className="font-semibold">{highlightMatch(item.name, query)}</p>
                                <p className="text-gray-600">{highlightMatch(item.description, query)}</p>
                              </Link>
                            )}

                            {table === "books" && (
                              <Link to={`/book-details/${item.id}`}>
                                <p className="font-semibold">{highlightMatch(item.title, query)}</p>
                                <p className="text-gray-600 italic">by {highlightMatch(item.author, query)}</p>
                              </Link>
                            )}

                            {table === "stories" && (
                              <Link to={`/chapters/${item.chapter_id}/topics/${item.topic_id}/stories?storyId=${item.id}`}>
                                <p className="font-semibold">{highlightMatch(item.title, query)}</p>
                                <p className="text-gray-600">{highlightSnippet(item.content, query)}...</p>
                              </Link>
                            )}

                            {table === "topics" && (
                              <Link to={`/chapters/${item.chapter_id}/topics/${item.id}/stories`}>
                                <p className="font-semibold">{highlightMatch(item.name, query)}</p>
                              </Link>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='mt-6 bg-white p-4 rounded shadow max-h-[60vh] overflow-y-auto w-[340px] md:w-[400px] lg:w-[470px]'>
              <h2>No results found.</h2>
            </div>
          )}
        </div>
      )}
      {/* Hero Section with Profile Picture */}
      <section className="relative z-10 py-8 animate-fade-in duration-500">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center">
            {/* Profile Card */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-2xl">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full mx-auto border-4 border-[#e4e8e1] shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/ChatGPT-rosie.png"
                    alt="Rosie Care Bot"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-black text-[#232323] mb-2">
                Welcome to Your Journey
              </h2>

              <p className="text-[#373618] mb-4 text-sm leading-relaxed">
                I'm Rosie, your AI guide for caregiving. Let's navigate this path together with stories, wisdom, and support.
              </p>
              <Button
                className="relative w-full text-[#18453B] font-bold py-4 px-6 rounded-2xl mb-3 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-[url('/ChatGPT-rosie.png')] bg-cover bg-center border-0 overflow-hidden"
              >
                {/* White transparent overlay */}
                <div className="absolute inset-0 bg-white/60 rounded-2xl backdrop-blur-lg pointer-events-none" />

                {/* Content on top */}
                <div className="relative z-10 flex items-center justify-center">
                  <Zap className="mr-3 h-5 w-5" />
                  <span className="text-base">Start Your Journey</span>
                </div>
              </Button>

              <Button className="w-full font-bold py-4 px-6 rounded-2xl shadow-lg bg-white hover:bg-white transform hover:scale-[1.02] transition-all duration-300 text-[#18453B] border-2 border-[#18453B]">
                <Users className="mr-3 h-5 w-5" />
                <span className="text-base">Join Community</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Creative Stories Section */}
      <div className="animate-slide-up">
        <CreativeStorySection />
      </div>

      {/* Official Book Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <OfficialBookSection />
      </div>

      {/* Poetry Collection Section */}
      {/* <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <PoetryCollectionSection />
      </div> */}

      {/* Enhanced Floating Modules Grid */}
      {/* <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <FloatingModuleGrid />
      </div> */}

      {/* Community Section with Pictures */}
      {/* <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <CommunityHighlights />
      </div> */}

      <BottomNavigation />
      {/* Bottom spacing for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;
