
import { Button } from "@/components/ui/button";
import { BookOpen, Users, MessageCircle, Heart, Home, Sparkles } from "lucide-react";

interface NavigationMenuProps {
  mobile?: boolean;
}

export const NavigationMenu = ({ mobile = false }: NavigationMenuProps) => {
  const navItems = [
    { label: "Stories", icon: BookOpen, href: "#stories" },
    { label: "Modules", icon: Heart, href: "#modules" },
    { label: "Community", icon: Users, href: "#community" },
    { label: "Resources", icon: MessageCircle, href: "#resources" },
  ];

  if (mobile) {
    return (
      <nav className="space-y-3">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center space-x-4 px-4 py-3 text-white hover:text-pink-300 hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <item.icon className="h-6 w-6" />
            <span className="text-lg">{item.label}</span>
          </a>
        ))}
        <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl shadow-xl">
          <Sparkles className="mr-2 h-5 w-5" />
          Get Started
        </Button>
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex items-center space-x-2 text-white hover:text-pink-300 transition-all duration-300 font-medium group"
        >
          <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>{item.label}</span>
        </a>
      ))}
      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300">
        <Sparkles className="mr-2 h-4 w-4" />
        Get Started
      </Button>
    </nav>
  );
};
