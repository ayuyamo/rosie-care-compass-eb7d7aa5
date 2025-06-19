
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
      color: "#679aa3"
    },
    {
      title: "Strength in Silence",
      preview: "When the world feels heavy, we find grace in small acts...",
      category: "Resilience",
      color: "#8DA399"
    },
    {
      title: "Morning Light",
      preview: "Each new day brings hope, even in the darkest times...",
      category: "Hope",
      color: "#d79a8c"
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
            <Card key={poem.title} className={`
                bg-white/60 backdrop-blur-md border border-gray-200 p-4 shadow-lg transition-all duration-700
                ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              `}
              style={{
                transitionDelay: gridVisible ? `${index * 100}ms` : '0ms'
              }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: poem.color }}>
                  <BookText className="h-5 w-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="text-white border-white/30 text-xs" style={{ backgroundColor: poem.color }}>
                      {poem.category}
                    </Badge>
                    <Sparkles className="h-4 w-4 text-[#dab216]" />
                  </div>

                  <h4 className="text-base font-bold text-[#232323] mb-1">
                    {poem.title}
                  </h4>
                  <p className="text-[#373618] text-sm mb-3 italic">
                    {poem.preview}
                  </p>

                  <Button variant="ghost" size="sm" className="text-sm font-medium" style={{ color: poem.color }}>
                    Read Full Poem
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <div className="text-center mt-4">
            <Link to="/poems-collection">
              <Button className="w-full bg-[#a45a52ad] text-white font-bold py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                <BookText className="mr-2 h-5 w-5" />
                View Complete Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoetryCollectionSection;
