
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Users, Layers, Blocks } from "lucide-react";

const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/chapters", label: "Chapters", icon: BookOpen },
    { to: "/resources", label: "Resources", icon: Layers },
    { to: "/flashcards", label: "Conversation Cards", icon: Blocks },
];

const BottomNavigation: React.FC = () => {
    const location = useLocation();

    return (
        <nav id='bottom-nav' className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/30 z-50">
            <div className="flex flex-wrap max-w-md mx-auto items-center justify-around py-3">
                {navItems.map(({ to, label, icon: Icon }) => {
                    const isActive = location.pathname === to;
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`flex flex-col px-2 items-center space-y-1 transition-colors ${isActive ? "text-[#c4a91a]" : "text-[#5a7a85] hover:text-[#c4a91a]"
                                }`}
                        >
                            <Icon className="h-5 w-5" color={isActive ? "#c4a91a" : "#5a7a85"} />
                            <span className="text-sm">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavigation;
