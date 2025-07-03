import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CommunityHighlights = () => {
    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
    const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation();
    return (
        <section className="relative z-10 py-6">
            <div className="max-w-md mx-auto px-4">
                <h3 ref={titleRef} className={`text-xl font-bold text-[#232323] mb-4 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Community Highlights</h3>

                <div ref={highlightsRef} className={`space-y-4 transition-all duration-1000 ${highlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Card className="bg-white/90 backdrop-blur-md border border-gray-200 p-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#2b6cb0', backgroundColor: '#f0f9ff' }}>
                                <span className="text-sm font-bold text-[#2b6cb0]">MS</span>
                            </div>
                            <div>
                                <div className="font-bold text-sm text-[#232323]">Maria S.</div>
                                <div className="text-xs text-[#373618]">Shared a resource</div>
                            </div>
                        </div>
                        <p className="text-sm mb-3 text-[#373618]">"Found an amazing physical therapist who does home visits. Game changer!"</p>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-[#679aa3]">
                                <Heart className="h-4 w-4" />
                                <span className="text-xs">24</span>
                            </button>
                            <button className="flex items-center space-x-1 text-[#679aa3]">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-xs">8</span>
                            </button>
                        </div>
                    </Card>

                    <Card className="bg-white/90 backdrop-blur-md border border-gray-200 p-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#373618', backgroundColor: '#f9f9f9' }}>
                                <span className="text-sm font-bold text-[#373618]">DK</span>
                            </div>
                            <div>
                                <div className="font-bold text-sm text-[#232323]">David K.</div>
                                <div className="text-xs text-[#373618]">Posted in Legal Advice</div>
                            </div>
                        </div>
                        <p className="text-sm mb-3 text-[#373618]">"Finally got the power of attorney sorted. Here's what I learned..."</p>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-[#373618]">
                                <Heart className="h-4 w-4" />
                                <span className="text-xs">18</span>
                            </button>
                            <button className="flex items-center space-x-1 text-[#373618]">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-xs">12</span>
                            </button>
                        </div>
                    </Card>
                    <button
                        className="w-full inline-flex items-center rounded-md justify-center min-w-[140px] md:min-w-[170px] h-12 px-4 shadow-lg border-2 border-[#4e4875] text-[#4e4875] font-semibold text-base leading-6 tracking-tight bg-white hover:text-[#06f] hover:border-[#06f] focus:text-[#171e29] transition-all duration-300"
                    >
                        Join the Conversation
                    </button>
                </div>

            </div>
        </section>
    );
}

export default CommunityHighlights;