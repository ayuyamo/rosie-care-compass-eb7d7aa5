
import { Button } from "@/components/ui/button";
import { BookOpen, Users, MessageCircle, Heart, Home } from "lucide-react";

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
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
        <Button className="w-full mt-4 bg-rose-500 hover:bg-rose-600">
          <Home className="mr-2 h-4 w-4" />
          Get Started
        </Button>
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex items-center space-x-2 text-gray-700 hover:text-rose-600 transition-colors font-medium"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </a>
      ))}
      <Button className="bg-rose-500 hover:bg-rose-600 text-white">
        <Home className="mr-2 h-4 w-4" />
        Get Started
      </Button>
    </nav>
  );
};
