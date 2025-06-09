import { Card } from "@/components/ui/card";
import { Compass, MessageCircle, Shield, Scale } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const QuickToolsSection = () => {
    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
    return (
        <section className="relative z-10 py-6">
            <div className="max-w-md mx-auto px-4">
                <h3 ref={titleRef} className={`text-xl font-bold text-[#232323] mb-4 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Quick Tools</h3>
                <div ref={gridRef} className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
                    <Card className="bg-white/60 backdrop-blur-md border border-gray-200 p-4 text-center">
                        <div className="w-12 h-12 bg-[#5a7a85] rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Compass className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-[#232323] font-bold text-sm mb-1">Care Guide</h4>
                        <p className="text-[#373618] text-xs">Step-by-step guidance</p>
                    </Card>
                    <Card className="bg-white/60 backdrop-blur-md border border-gray-200 p-4 text-center">
                        <div className="w-12 h-12 bg-[#4a90a4] rounded-xl flex items-center justify-center mx-auto mb-3">
                            <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-[#232323] font-bold text-sm mb-1">Chat Support</h4>
                        <p className="text-[#373618] text-xs">24/7 assistance</p>
                    </Card>
                    <Card className="bg-white/60 backdrop-blur-md border border-gray-200 p-4 text-center">
                        <div className="w-12 h-12 bg-[#7a8a60] rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-[#232323] font-bold text-sm mb-1">Safety Check</h4>
                        <p className="text-[#373618] text-xs">Home assessment</p>
                    </Card>
                    <Card className="bg-white/60 backdrop-blur-md border border-gray-200 p-4 text-center">
                        <div className="w-12 h-12 bg-[#5a7a85] rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Scale className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-[#232323] font-bold text-sm mb-1">Legal Help</h4>
                        <p className="text-[#373618] text-xs">Document guidance</p>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default QuickToolsSection;