
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookText, Heart, Clock, Share, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PoemsCollection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const poems = [
    {
      title: "Gentle Hands",
      preview: "In the quiet moments of care, love speaks without words...",
      fullText: "In the quiet moments of care, love speaks without words,\nGentle hands that comfort, hearts that truly understand.\nThrough sleepless nights and weary days,\nWe find strength in the smallest ways.",
      category: "Compassion",
      color: "#679aa3",
      readTime: "2 min",
      author: "Sarah M."
    },
    {
      title: "Strength in Silence",
      preview: "When the world feels heavy, we find grace in small acts...",
      fullText: "When the world feels heavy, we find grace in small acts,\nIn morning coffee shared, in stories from the past.\nSilence holds its own power,\nIn each tender, loving hour.",
      category: "Resilience",
      color: "#2b6cb0",
      readTime: "3 min",
      author: "Michael R."
    },
    {
      title: "Morning Light",
      preview: "Each new day brings hope, even in the darkest times...",
      fullText: "Each new day brings hope, even in the darkest times,\nLike golden rays that pierce through storm clouds high.\nIn caregiving's sacred space,\nWe discover love's true grace.",
      category: "Hope",
      color: "#dab216",
      readTime: "2 min",
      author: "Linda K."
    },
    {
      title: "Unspoken Bond",
      preview: "Between caregiver and cared for, words are not needed...",
      fullText: "Between caregiver and cared for, words are not needed,\nA glance, a touch, a presence felt so deep.\nThis bond transcends all measure,\nA love beyond all treasure.",
      category: "Connection",
      color: "#679aa3",
      readTime: "3 min",
      author: "David L."
    },
    {
      title: "Finding Peace",
      preview: "In the chaos of caregiving, moments of calm emerge...",
      fullText: "In the chaos of caregiving, moments of calm emerge,\nLike dewdrops on petals at break of day.\nPeace is found not in the absence of storm,\nBut in learning to dance with its form.",
      category: "Serenity",
      color: "#2b6cb0",
      readTime: "2 min",
      author: "Maria S."
    },
    {
      title: "Legacy of Love",
      preview: "What we give in care returns to us tenfold...",
      fullText: "What we give in care returns to us tenfold,\nIn memories made and stories yet untold.\nEach act of kindness plants a seed,\nFor future hearts in time of need.",
      category: "Legacy",
      color: "#dab216",
      readTime: "3 min",
      author: "Robert H."
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
              <span>•</span>
              <span>6 Authors</span>
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
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <Badge className="text-white border-white/30 text-xs" style={{ backgroundColor: poem.color }}>
                      {poem.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{poem.readTime}</span>
                    </div>
                  </div>

                  {/* Title and Author */}
                  <div>
                    <h3 className="text-lg font-bold text-[#232323] mb-1">
                      {poem.title}
                    </h3>
                    <p className="text-xs text-[#679aa3]">by {poem.author}</p>
                  </div>

                  {/* Full Text */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-[#373618] text-sm italic whitespace-pre-line leading-relaxed">
                      {poem.fullText}
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
