
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Users, Layers } from "lucide-react";

const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/stories", label: "Stories", icon: BookOpen },
    { to: "/resources", label: "Resources", icon: Layers },
    { to: "/community", label: "Community", icon: Users },
];

const BottomNavigation: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/30 z-50">
            <div className="max-w-md mx-auto flex items-center justify-around py-3">
                {navItems.map(({ to, label, icon: Icon }) => {
                    const isActive = location.pathname === to;
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`flex flex-col items-center space-y-1 transition-colors ${isActive ? "text-[#c4a91a]" : "text-[#5a7a85] hover:text-[#c4a91a]"
                                }`}
                        >
                            <Icon className="h-5 w-5" color={isActive ? "#c4a91a" : "#5a7a85"} />
                            <span className="text-xs">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavigation;
