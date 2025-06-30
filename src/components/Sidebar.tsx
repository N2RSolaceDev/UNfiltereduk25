
import { Button } from "@/components/ui/button";
import { Home, Compass, Users, Bookmark, Settings, HelpCircle, TrendingUp } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: TrendingUp, label: "Trending" },
    { icon: Compass, label: "Explore" },
    { icon: Users, label: "Following" },
    { icon: Bookmark, label: "Saved" },
  ];

  const footerItems = [
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-muted/30 border-r p-4 hidden lg:block">
      <nav className="space-y-2">
        {menuItems.map(({ icon: Icon, label, active }) => (
          <Button
            key={label}
            variant={active ? "secondary" : "ghost"}
            className="w-full justify-start space-x-3"
          >
            <Icon size={20} />
            <span>{label}</span>
          </Button>
        ))}
      </nav>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">CATEGORIES</h3>
        <div className="space-y-1">
          {["Gaming", "Music", "Comedy", "Sports", "News", "Tech", "Art", "Food"].map((category) => (
            <Button key={category} variant="ghost" className="w-full justify-start text-sm">
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        {footerItems.map(({ icon: Icon, label }) => (
          <Button key={label} variant="ghost" className="w-full justify-start space-x-3">
            <Icon size={16} />
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
};
