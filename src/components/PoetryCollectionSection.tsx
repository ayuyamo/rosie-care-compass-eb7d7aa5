
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookText, ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const PoetryCollectionSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const poems = [
    {
      title: "Gentle Hands",
      preview: "In the quiet moments of care, love speaks without words...",
      category: "Compassion",
      color: "#679aa3",
      background: 'https://ovexmcodlyhefuhmdfez.supabase.co/storage/v1/object/public/section-images//advocating.png'
    },
    {
      title: "Strength in Silence",
      preview: "When the world feels heavy, we find grace in small acts...",
      category: "Resilience",
      color: "#8DA399",
      background: 'https://ovexmcodlyhefuhmdfez.supabase.co/storage/v1/object/public/section-images//aging-in-the-village.png'
    },
    {
      title: "Morning Light",
      preview: "Each new day brings hope, even in the darkest times...",
      category: "Hope",
      color: "#d79a8c",
      background: 'https://ovexmcodlyhefuhmdfez.supabase.co/storage/v1/object/public/section-images//instantly.png'
    }
  ];

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <h3 ref={titleRef} className={`text-xl font-bold text-[#232323] mb-4 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Poetry Collection
        </h3>

        <div ref={gridRef} className={`space-y-4 transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {poems.map((poem, index) => (
            <Card
              key={poem.title}
              className={`
    relative overflow-hidden rounded-xl p-4 shadow-lg backdrop-blur-md bg-white/50 transition-all duration-700
    ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
  `}
              style={{
                transitionDelay: gridVisible ? `${index * 100}ms` : '0ms',
                backgroundImage: `url(${poem.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* White overlay for contrast */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-0"></div>

              {/* Foreground content */}
              <div className="relative z-10 flex items-center justify-between space-x-4">
                {/* Poem info */}
                <div className="flex flex-col min-w-0">
                  <h4 className="text-base font-bold text-[#425672] mb-1">
                    {poem.title}
                  </h4>
                  <p className="text-[#334155] text-sm italic line-clamp-2">
                    {poem.preview}
                  </p>
                </div>

                {/* Right CTA (matching story card arrow style) */}
                <div className="flex items-center space-x-2 text-[#334155]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Card>
          ))}

          <div className="text-center mt-4">
            <Link to="/poems-collection">
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
