
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Compass, MessageCircle, Shield, Scale, FileText, Phone, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Resources = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: resourcesRef, isVisible: resourcesVisible } = useScrollAnimation();

  const resourceCategories = [
    {
      title: "Care Guides",
      icon: Compass,
      color: "#dab216",
      resources: [
        { name: "Daily Care Planning Worksheet", type: "PDF", description: "Step-by-step guidance for organizing daily routines" },
        { name: "Medication Management Guide", type: "Guide", description: "Safe practices for medication administration" },
        { name: "Nutrition Planning Templates", type: "Template", description: "Meal planning for special dietary needs" }
      ]
    },
    {
      title: "Safety Resources",
      icon: Shield,
      color: "#2b6cb0",
      resources: [
        { name: "Home Safety Checklist", type: "Checklist", description: "Complete assessment for home modifications" },
        { name: "Emergency Contact Templates", type: "Template", description: "Organize important phone numbers and contacts" },
        { name: "Fall Prevention Guide", type: "PDF", description: "Strategies to prevent accidents and injuries" }
      ]
    },
    {
      title: "Legal Support",
      icon: Scale,
      color: "#679aa3",
      resources: [
        { name: "Power of Attorney Guide", type: "Guide", description: "Understanding legal documentation requirements" },
        { name: "Healthcare Directive Templates", type: "Template", description: "Advance care planning documents" },
        { name: "Financial Planning Worksheets", type: "PDF", description: "Organize finances and important documents" }
      ]
    },
    {
      title: "Communication Tools",
      icon: MessageCircle,
      color: "#373618",
      resources: [
        { name: "Doctor Visit Preparation Sheet", type: "Template", description: "Questions and information to bring to appointments" },
        { name: "Family Communication Templates", type: "Template", description: "Facilitate conversations about care decisions" },
        { name: "Care Team Contact List", type: "Template", description: "Organize all healthcare providers and services" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#232323]">Resources</h1>
            <p className="text-[#373618] text-sm">Tools and templates for caregiving</p>
          </div>
        </header>

        <div ref={resourcesRef} className="space-y-6">
          {resourceCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title}
                className={`transition-all duration-700 ${resourcesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{
                  transitionDelay: resourcesVisible ? `${categoryIndex * 200}ms` : '0ms'
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center" 
                    style={{ backgroundColor: category.color }}
                  >
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-[#232323]">{category.title}</h2>
                </div>

                <div className="space-y-3">
                  {category.resources.map((resource, resourceIndex) => (
                    <Card 
                      key={resource.name}
                      className={`
                        bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer
                        ${resourcesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                      `}
                      style={{
                        transitionDelay: resourcesVisible ? `${(categoryIndex * 200) + (resourceIndex * 100)}ms` : '0ms'
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-bold text-sm text-[#232323]">{resource.name}</h3>
                              <Badge 
                                className="text-white text-xs" 
                                style={{ backgroundColor: category.color }}
                              >
                                {resource.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-[#373618] mb-3">{resource.description}</p>
                            <div className="flex items-center space-x-3">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs p-1"
                                style={{ color: category.color }}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs p-1"
                                style={{ color: category.color }}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Resources;
