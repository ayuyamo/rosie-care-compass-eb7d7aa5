
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookText, ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPoems } from "@/lib/supabase/supabaseApi";

const PoetryCollectionSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const loadPoems = async () => {
      const fetchedPoems = await fetchPoems();
      setPoems(fetchedPoems);
    };

    loadPoems();
  }, []);

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <h3 ref={titleRef} className={`text-xl font-bold text-[#232323] mb-4 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Poetry Collection
        </h3>

        <div ref={gridRef} className={`space-y-4 transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {poems.slice(0, 3).map((poem, index) => (
            <Card
              key={poem.title}
              className={`
    relative overflow-hidden rounded-xl p-4 shadow-lg backdrop-blur-md bg-white/50 transition-all duration-700
    ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
  `}>
              {/* White overlay for contrast */}
              <div className="absolute inset-0 bg-white/70 z-0"></div>

              {/* Foreground content */}
              <div className="relative z-10 flex items-center justify-between space-x-4">
                {/* Poem info */}
                <div className="flex flex-col min-w-0">
                  <h4 className="text-base font-bold text-[#425672] mb-1">
                    {poem.title}
                  </h4>
                  <p className="text-[#334155] text-sm italic line-clamp-2">
                    {poem.content.length > 100
                      ? poem.content.slice(0, 100) + "..."
                      : poem.content}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <div className="text-center mt-4">
            <Link to="/poems-collection" state={{ poems }}>
              <button
                className="w-full inline-flex items-center rounded-md justify-center min-w-[140px] md:min-w-[170px] h-12 px-4 shadow-lg border-2 border-[#4f4875] text-[#4f4875] font-semibold text-base leading-6 tracking-tight bg-white hover:text-[#06f] hover:border-[#06f] focus:text-[#171e29] transition-all duration-300"
              >
                View Complete Collection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoetryCollectionSection;
