
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { VideoFeed } from "@/components/VideoFeed";
import { TextFeed } from "@/components/TextFeed";
import { LiveStreams } from "@/components/LiveStreams";
import { LongFormVideos } from "@/components/LongFormVideos";
import { CreatePost } from "@/components/CreatePost";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'posts' | 'live' | 'longform'>('videos');
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onCreatePost={() => setShowCreatePost(true)}
      />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 max-w-4xl mx-auto">
          {activeTab === 'videos' && <VideoFeed />}
          {activeTab === 'posts' && <TextFeed />}
          {activeTab === 'live' && <LiveStreams />}
          {activeTab === 'longform' && <LongFormVideos />}
        </main>
      </div>

      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};

export default Index;
