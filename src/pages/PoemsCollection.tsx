
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookText, Heart, Clock, Share, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchPoems } from "@/lib/supabase/supabaseApi";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PoemsCollection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const location = useLocation();

  const [poems, setPoems] = useState([]);

  useEffect(() => {
    if (location.state?.poems) {
      console.log("Using passed poems from location state");
      setPoems(location.state.poems);
    } else {
      const loadPoems = async () => {
        const fetchedPoems = await fetchPoems();
        setPoems(fetchedPoems);
      };
      console.log("Fetching poems from Supabase");
      loadPoems();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#679aa3]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#232323]">Poetry Collection</h1>
        </header>

        <div ref={gridRef} className={`transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {/* Collection Overview */}
          <Card className="bg-white/90 backdrop-blur-md shadow-lg p-6 mb-6 text-center">
            <BookText className="h-12 w-12 text-[#dab216] mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#232323] mb-2">
              Voices of Care: A Poetry Collection
            </h2>
            <p className="text-[#373618] text-sm mb-4">
              Heartfelt poems written by our caregiving community, capturing the beauty, struggle, and triumph of the caregiving journey.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-[#679aa3]">
              <span>{poems.length} Poems</span>
            </div>
          </Card>

          {/* Poems Grid */}
          <div className="space-y-4">
            {poems.map((poem, index) => (
              <Card key={poem.title} className={`
                  bg-white/90 backdrop-blur-md shadow-lg p-5 cursor-pointer hover:shadow-xl transition-all duration-700
                  ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                `}
                style={{
                  transitionDelay: gridVisible ? `${index * 100}ms` : '0ms'
                }}>
                <div className="space-y-3">
                  {/* Title and Author */}
                  <div>
                    <h3 className="text-lg font-medium italic text-[#297bb5] mb-1">
                      {poem.title}
                    </h3>
                  </div>

                  {/* Full Text */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-[#373618] text-sm italic whitespace-pre-line leading-relaxed">
                      {poem.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 text-[#679aa3]">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">24 likes</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-[#679aa3]">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-[#679aa3]">
                        <Share className="h-4 w-4" />
                      </Button>
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

export default PoemsCollection;
