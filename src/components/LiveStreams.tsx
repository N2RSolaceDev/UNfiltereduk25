
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Heart, MessageCircle, Gift } from "lucide-react";
import { mockLiveStreams } from "@/data/mockData";

export const LiveStreams = () => {
  const [selectedStream, setSelectedStream] = useState<number | null>(null);

  return (
    <div className="py-4">
      {!selectedStream ? (
        // Stream Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLiveStreams.map((stream) => (
            <div 
              key={stream.id} 
              className="bg-card rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedStream(stream.id)}
            >
              {/* Stream Thumbnail */}
              <div className="relative">
                <div className={`w-full h-48 bg-gradient-to-br ${stream.thumbnail} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">{stream.category === 'Gaming' ? '🎮' : stream.category === 'Music' ? '🎵' : '💬'}</div>
                    <p className="font-medium">Live Stream</p>
                  </div>
                </div>
                
                {/* Live Badge */}
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  🔴 LIVE
                </Badge>
                
                {/* Viewer Count */}
                <div className="absolute top-2 right-2 bg-black/70 rounded px-2 py-1 flex items-center space-x-1">
                  <Eye size={12} className="text-white" />
                  <span className="text-white text-xs">{stream.viewers}</span>
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.streamer}`}
                    alt={stream.streamer}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{stream.streamer}</h3>
                    <p className="text-xs text-muted-foreground">{stream.category}</p>
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-2 line-clamp-2">{stream.title}</h4>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users size={12} />
                    <span>{stream.viewers}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stream.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Live Stream Player
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Stream */}
            <div className="lg:col-span-3">
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🔴</div>
                    <p className="text-xl font-medium">Live Stream</p>
                    <p className="text-sm opacity-75">Interactive broadcast</p>
                  </div>
                  
                  {/* Live overlay */}
                  <div className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-full text-white text-sm font-medium">
                    🔴 LIVE
                  </div>
                  
                  {/* Viewer count */}
                  <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                    👁 {mockLiveStreams.find(s => s.id === selectedStream)?.viewers} watching
                  </div>
                </div>
              </div>

              {/* Stream Info */}
              <div className="mt-4 p-4 bg-card rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockLiveStreams.find(s => s.id === selectedStream)?.streamer}`}
                      alt="streamer"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="font-bold">{mockLiveStreams.find(s => s.id === selectedStream)?.title}</h2>
                      <p className="text-sm text-muted-foreground">@{mockLiveStreams.find(s => s.id === selectedStream)?.streamer}</p>
                    </div>
                  </div>
                  <Button onClick={() => setSelectedStream(null)} variant="outline">
                    Back to Streams
                  </Button>
                </div>

                {/* Stream Actions */}
                <div className="flex items-center space-x-4">
                  <Button size="sm" className="flex items-center space-x-2">
                    <Heart size={16} />
                    <span>Follow</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center space-x-2">
                    <Gift size={16} />
                    <span>Gift</span>
                  </Button>
                  <Button size="sm" variant="outline">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="bg-card rounded-lg p-4">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <MessageCircle size={16} />
                <span>Live Chat</span>
              </h3>
              
              <div className="space-y-3 h-96 overflow-y-auto mb-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium text-blue-500">User{i + 1}:</span>
                    <span className="ml-2">Amazing stream! 🔥</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input 
                  className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm"
                  placeholder="Say something..."
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
