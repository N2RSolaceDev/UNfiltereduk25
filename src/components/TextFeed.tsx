
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { mockPosts } from "@/data/mockData";

export const TextFeed = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [retweetedPosts, setRetweetedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const toggleRetweet = (postId: number) => {
    const newRetweeted = new Set(retweetedPosts);
    if (newRetweeted.has(postId)) {
      newRetweeted.delete(postId);
    } else {
      newRetweeted.add(postId);
    }
    setRetweetedPosts(newRetweeted);
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <div key={post.id} className="bg-card rounded-lg border p-6 hover:bg-muted/50 transition-colors">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                  alt={post.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">@{post.author.toLowerCase()} • {post.timestamp}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-foreground mb-3">{post.content}</p>
              
              {post.image && (
                <div className="rounded-lg overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium">📸 Image Content</span>
                  </div>
                </div>
              )}

              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="text-sm text-blue-500 hover:underline cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between max-w-md">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                  <MessageCircle size={16} />
                </Button>
                <span className="text-sm text-muted-foreground">{post.replies}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${retweetedPosts.has(post.id) ? 'text-green-500' : 'text-muted-foreground hover:text-green-500'}`}
                  onClick={() => toggleRetweet(post.id)}
                >
                  <Share size={16} />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {post.retweets + (retweetedPosts.has(post.id) ? 1 : 0)}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${likedPosts.has(post.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart size={16} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </span>
              </div>

              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                <Bookmark size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
