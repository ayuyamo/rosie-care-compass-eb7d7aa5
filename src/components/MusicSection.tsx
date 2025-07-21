import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink, Headphones, Play } from "lucide-react";

const MusicSection = () => {
  const musicPlatforms = [
    {
      name: "Spotify",
      icon: "https://img.icons8.com/?size=100&id=11116&format=png&color=000000",
      description: "Curated playlists for caregiving moments",
      url: "https://spotify.link/pJf1XMHj7Tb",
      color: "bg-green-500"
    },
    {
      name: "Apple Music",
      icon: "https://img.icons8.com/?size=100&id=mpeojql23sni&format=png&color=000000",
      description: "Soothing albums for peaceful times",
      url: "https://music.apple.com/us/album/caregiving-for-seniors/1818346520",
      color: "bg-gray-800"
    },
    {
      name: "iHeart",
      icon: "/iHeart-icon.png",
      description: "Comfort music for difficult days",
      url: "https://www.iheart.com/artist/villagecore-46948319/albums/caregiving-for-seniors-331852948/?utm_campaign=website&utm_medium=Email%20&utm_source=SendGrid",
      color: "bg-blue-500"
    }
  ];

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-white to-gray-50 transition-all duration-1000 animate-slide-up">
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

        <div className="grid grid-cols-3 gap-2">
          {musicPlatforms.map((platform, index) => (
            <Card key={platform.name} className="group hover:shadow-md transition-all duration-300 border border-gray-200/50">
              <CardContent className="p-4">
                <div className="text-center">
                  {/* <div className="text-2xl mb-2">{platform.icon}</div> */}
                  <img src={platform.icon} alt={`${platform.name} icon`} />
                  <h3 className="font-semibold text-[#232323] text-sm mb-1">{platform.name}</h3>
                  <p className="text-xs text-[#4B5320] mb-3 leading-tight">{platform.description}</p>
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