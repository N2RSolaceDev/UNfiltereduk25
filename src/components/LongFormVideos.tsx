
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, ThumbsUp, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { mockLongFormVideos } from "@/data/mockData";

export const LongFormVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());

  const toggleLike = (videoId: number) => {
    const newLiked = new Set(likedVideos);
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
    } else {
      newLiked.add(videoId);
    }
    setLikedVideos(newLiked);
  };

  if (selectedVideo) {
    const video = mockLongFormVideos.find(v => v.id === selectedVideo);
    if (!video) return null;

    return (
      <div className="max-w-6xl mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <div className="aspect-video bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center relative cursor-pointer">
                <div className="text-white text-center">
                  <Play size={64} className="mx-auto mb-4" />
                  <p className="text-xl font-medium">Video Player</p>
                  <p className="text-sm opacity-75">{video.duration}</p>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold mb-2">{video.title}</h1>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{video.views} views</span>
                    </span>
                    <span>{video.uploadDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`flex items-center space-x-2 ${likedVideos.has(video.id) ? 'text-blue-500' : ''}`}
                      onClick={() => toggleLike(video.id)}
                    >
                      <ThumbsUp size={16} fill={likedVideos.has(video.id) ? 'currentColor' : 'none'} />
                      <span>{video.likes + (likedVideos.has(video.id) ? 1 : 0)}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Share size={16} />
                      <span>Share</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Channel Info */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channel}`}
                    alt={video.channel}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{video.channel}</h3>
                    <p className="text-sm text-muted-foreground">{video.subscribers} subscribers</p>
                  </div>
                </div>
                <Button>Subscribe</Button>
              </div>

              {/* Description */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm leading-relaxed">{video.description}</p>
                {video.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {video.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Up Next</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedVideo(null)}
              >
                Back to Grid
              </Button>
            </div>
            
            {mockLongFormVideos.filter(v => v.id !== selectedVideo).slice(0, 5).map((relatedVideo) => (
              <div 
                key={relatedVideo.id}
                className="flex space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                onClick={() => setSelectedVideo(relatedVideo.id)}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Play size={16} className="text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {relatedVideo.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">{relatedVideo.title}</h4>
                  <p className="text-xs text-muted-foreground">{relatedVideo.channel}</p>
                  <p className="text-xs text-muted-foreground">{relatedVideo.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockLongFormVideos.map((video) => (
          <div 
            key={video.id}
            className="bg-card rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedVideo(video.id)}
          >
            {/* Video Thumbnail */}
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                <Play size={32} className="text-white" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </span>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-medium text-sm line-clamp-2 mb-2">{video.title}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channel}`}
                  alt={video.channel}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-xs text-muted-foreground">{video.channel}</p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.uploadDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
