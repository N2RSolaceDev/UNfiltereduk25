
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Bell, MessageCircle, User, Home, Video, Radio, PlaySquare } from "lucide-react";

interface NavigationProps {
  activeTab: 'videos' | 'posts' | 'live' | 'longform';
  setActiveTab: (tab: 'videos' | 'posts' | 'live' | 'longform') => void;
  onCreatePost: () => void;
}

export const Navigation = ({ activeTab, setActiveTab, onCreatePost }: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UnfilteredUK
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1">
            <Button
              variant={activeTab === 'videos' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('videos')}
              className="flex items-center space-x-2"
            >
              <Home size={16} />
              <span>Videos</span>
            </Button>
            <Button
              variant={activeTab === 'posts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('posts')}
              className="flex items-center space-x-2"
            >
              <MessageCircle size={16} />
              <span>Posts</span>
            </Button>
            <Button
              variant={activeTab === 'live' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('live')}
              className="flex items-center space-x-2"
            >
              <Radio size={16} />
              <span>Live</span>
            </Button>
            <Button
              variant={activeTab === 'longform' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('longform')}
              className="flex items-center space-x-2"
            >
              <PlaySquare size={16} />
              <span>YouTube</span>
            </Button>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search UnfilteredUK..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button onClick={onCreatePost} size="sm" className="flex items-center space-x-2">
              <Plus size={16} />
              <span>Create</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Bell size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <User size={16} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
