import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Palette, Paintbrush } from "lucide-react";
import { useState } from "react";

export function DesignNavigator() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Extract base path to determine which design we're in
  const path = location.pathname.split("/")[1];

  const links = [
    { name: "Main App", path: "/", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Luxury / Art Deco", path: "/1", icon: <Palette className="w-4 h-4" /> },
    { name: "Soft Glassmorphism", path: "/2", icon: <Palette className="w-4 h-4" /> },
    { name: "Bauhaus Geometric", path: "/3", icon: <Palette className="w-4 h-4" /> },
    { name: "Neumorphism", path: "/4", icon: <Palette className="w-4 h-4" /> },
    { name: "Ultra-Brutalist", path: "/5", icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div 
      className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-2 font-sans"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div 
        className={`flex flex-col gap-2 transition-all duration-300 origin-bottom ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {links.map((link) => {
          const isActive = path === link.path.replace("/", "") || (path === "" && link.path === "/");
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-xl transition-all ${
                isActive 
                  ? "bg-primary text-primary-foreground scale-105 shadow-primary/25 border border-primary/20" 
                  : "bg-white/90 dark:bg-zinc-900/90 text-foreground hover:scale-105 border border-white/20 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800"
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? "bg-white/20" : "bg-muted"}`}>
                {link.icon}
              </div>
              {link.name}
            </Link>
          );
        })}
      </div>
      
      <button 
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 border backdrop-blur-xl ${
          open 
            ? "bg-primary text-primary-foreground border-primary scale-110 shadow-primary/30" 
            : "bg-white/90 dark:bg-zinc-900/90 text-foreground border-white/20 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800 hover:scale-105"
        }`}
      >
        <Paintbrush className="w-6 h-6" />
      </button>
    </div>
  );
}
