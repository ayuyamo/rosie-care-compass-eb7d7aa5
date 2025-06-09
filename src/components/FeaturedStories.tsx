import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FeaturedStories = () => {
    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

    return (
        <section className="relative z-10 py-6">
            <div className="max-w-md mx-auto px-4">
                <div ref={titleRef} className={`flex items-center justify-between mb-4 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h3 className="text-xl font-bold text-[#232323]">Featured Stories</h3>
                    <Button variant="ghost" size="sm" className="text-[#2b6cb0]">
                        View All
                    </Button>
                </div>
                <div ref={gridRef} className={`space-y-4 transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Card className="bg-white/90 backdrop-blur-md border border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#679aa3]">
                                    <span className="text-xl">🌱</span>
                                </div>
                                <div className="flex-1">
                                    <Badge className="text-white text-xs mb-2 bg-[#679aa3]">New</Badge>
                                    <h4 className="font-bold text-sm mb-1 text-[#232323]">Finding Strength</h4>
                                    <p className="text-xs mb-2 text-[#373618]">When caregiving finds you unprepared...</p>
                                    <div className="flex items-center space-x-2 text-[#dab216]">
                                        <Heart className="h-3 w-3" />
                                        <span className="text-xs">5 min read</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/90 backdrop-blur-md border border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#2b6cb0]">
                                    <span className="text-xl">🏠</span>
                                </div>
                                <div className="flex-1">
                                    <Badge className="text-white text-xs mb-2 bg-[#2b6cb0]">Popular</Badge>
                                    <h4 className="font-bold text-sm mb-1 text-[#232323]">Safe Spaces</h4>
                                    <p className="text-xs mb-2 text-[#373618]">Creating comfort in familiar places...</p>
                                    <div className="flex items-center space-x-2 text-[#679aa3]">
                                        <Heart className="h-3 w-3" />
                                        <span className="text-xs">3 min read</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

    );
}

export default FeaturedStories;