import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink, Headphones, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchMusicInfo, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { useEffect, useState, useLayoutEffect } from "react";
import { MusicSkeleton } from "@/components/ui/skeletons";

const MusicSection = () => {
  const [musicPlatforms, setMusicPlatforms] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(window.innerHeight, hasLoaded);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(window.innerHeight, hasLoaded);

  useEffect(() => {
    const fetchMusicData = async () => {
      const musicInfo = await fetchMusicInfo();
      setMusicPlatforms(musicInfo);
    }

    fetchMusicData();
    const musicSubscriber = subscribeToTableChanges('music', (payload) => {
      const { eventType, new: newData, old: oldData } = payload;
      setMusicPlatforms((prev) => {
        if (eventType == 'INSERT') {
          return [...prev, newData];
        }
        if (eventType == 'UPDATE') {
          return prev.map((data) => data.id === newData.id ? { ...data, newData } : data);
        }
        if (eventType === 'DELETE') {
          return prev.filter((data) => data.id !== oldData.id);
        }
      });
    });

    return () => {
      musicSubscriber();
    }
  }, []);

  useLayoutEffect(() => {
    if (musicPlatforms.length > 0) {
      setHasLoaded(true);
    }

  }, [musicPlatforms]);

  if (!hasLoaded || musicPlatforms.length === 0) {
    return <MusicSkeleton />;
  }

  return (
    <section ref={headerRef} className={`py-8 px-4 bg-gradient-to-b from-white to-gray-50 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 rounded-full bg-[#ceda88]/20 flex items-center justify-center mr-3">
              <Music className="w-5 h-5 text-[#4B5320]" />
            </div>
            <h2 className="text-xl font-bold text-[#232323]">Music for the Journey</h2>
          </div>
          <p className="text-[#373618] text-sm leading-relaxed">
            Find comfort and peace with carefully curated music collections
          </p>
        </div>

        <div ref={gridRef} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {musicPlatforms.map((platform, index) => (
            <Card key={platform.name} className="group hover:shadow-md transition-all duration-300 border border-gray-200/50">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <img src={platform.icon_url} alt={`${platform.name} icon`} />
                  <h3 className="font-semibold text-[#232323] text-sm mb-1">{platform.name}</h3>
                  <p className="text-xs text-[#4B5320] mb-3 leading-tight text-center">{platform.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs group-hover:bg-[#ceda88]/10 group-hover:border-[#ceda88] group-hover:text-[#4B5320] transition-all"
                    onClick={() => window.open(platform.url, '_blank')}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Listen
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="bg-[#f8f9f6] rounded-2xl p-4 border border-[#e4e8e1]">
            <Headphones className="w-6 h-6 text-[#4B5320] mx-auto mb-2" />
            <p className="text-xs text-[#4B5320] leading-relaxed">
              Music can provide comfort during challenging caregiving moments.
              These collections are thoughtfully chosen to support your emotional well-being.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;