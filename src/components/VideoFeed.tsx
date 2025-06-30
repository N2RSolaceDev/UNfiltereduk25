
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, Bookmark, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { mockVideos } from "@/data/mockData";

export const VideoFeed = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLike = (videoId: number) => {
    const newLiked = new Set(likedVideos);
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
    } else {
      newLiked.add(videoId);
    }
    setLikedVideos(newLiked);
  };

  const currentVideoData = mockVideos[currentVideo];

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentVideo < mockVideos.length - 1) {
        setCurrentVideo(currentVideo + 1);
      } else if (e.deltaY < 0 && currentVideo > 0) {
        setCurrentVideo(currentVideo - 1);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentVideo]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Container */}
      <div className="relative w-full h-full bg-black flex items-center justify-center">
        <div className="relative max-w-md w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden">
          {/* Mock Video Background */}
          <div 
            className="w-full h-full cursor-pointer flex items-center justify-center relative"
            onClick={handleVideoClick}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-4">
                  <Play size={48} className="text-white ml-2" />
                </div>
              </div>
            )}

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentVideoData.author}`}
                  alt={currentVideoData.author}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">@{currentVideoData.author}</span>
                <Button size="sm" variant="outline" className="text-xs">Follow</Button>
              </div>
              <p className="text-sm mb-2">{currentVideoData.description}</p>
              <div className="flex flex-wrap gap-1">
                {currentVideoData.hashtags.map((tag, index) => (
                  <span key={index} className="text-xs text-blue-300">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full p-3 ${likedVideos.has(currentVideoData.id) ? 'text-red-500' : 'text-white'}`}
                onClick={() => toggleLike(currentVideoData.id)}
              >
                <Heart size={24} fill={likedVideos.has(currentVideoData.id) ? 'currentColor' : 'none'} />
              </Button>
              <span className="text-white text-xs mt-1">{currentVideoData.likes + (likedVideos.has(currentVideoData.id) ? 1 : 0)}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button variant="ghost" size="sm" className="rounded-full p-3 text-white">
                <MessageCircle size={24} />
              </Button>
              <span className="text-white text-xs mt-1">{currentVideoData.comments}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button variant="ghost" size="sm" className="rounded-full p-3 text-white">
                <Share size={24} />
              </Button>
              <span className="text-white text-xs mt-1">{currentVideoData.shares}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button variant="ghost" size="sm" className="rounded-full p-3 text-white">
                <Bookmark size={24} />
              </Button>
            </div>

            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full p-3 text-white"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Navigation */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-2">
        {mockVideos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-8 rounded-full cursor-pointer transition-colors ${
              index === currentVideo ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => setCurrentVideo(index)}
          />
        ))}
      </div>
    </div>
  );
};
