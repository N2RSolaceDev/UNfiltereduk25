
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Image, Video, Smile, MapPin, Hash } from "lucide-react";

interface CreatePostProps {
  onClose: () => void;
}

export const CreatePost = ({ onClose }: CreatePostProps) => {
  const [postType, setPostType] = useState<'text' | 'video' | 'live'>('text');
  const [content, setContent] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create New Post</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Post Type Selector */}
        <div className="p-4 border-b">
          <div className="flex space-x-2">
            <Button
              variant={postType === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('text')}
              className="flex items-center space-x-2"
            >
              <Hash size={16} />
              <span>Text Post</span>
            </Button>
            <Button
              variant={postType === 'video' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('video')}
              className="flex items-center space-x-2"
            >
              <Video size={16} />
              <span>Video</span>
            </Button>
            <Button
              variant={postType === 'live' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('live')}
              className="flex items-center space-x-2"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>Go Live</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {postType === 'text' && (
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[120px] border-none resize-none text-lg"
                  />
                </div>
              </div>

              {/* Media Upload Area */}
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <Image size={48} className="mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Add photos or videos</p>
                    <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
                  </div>
                </div>
              </div>

              {/* Post Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Image size={16} />
                    <span>Photo</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Video size={16} />
                    <span>Video</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Smile size={16} />
                    <span>Emoji</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>Location</span>
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{280 - content.length}</span>
                  <Button disabled={!content.trim()}>Post</Button>
                </div>
              </div>
            </div>
          )}

          {postType === 'video' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                <Video size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Video</h3>
                <p className="text-sm text-muted-foreground mb-4">Select or drag and drop your video file</p>
                <Button>Select Video</Button>
              </div>
              
              <Textarea
                placeholder="Write a caption..."
                className="min-h-[80px]"
              />

              <div className="flex justify-end">
                <Button>Upload Video</Button>
              </div>
            </div>
          )}

          {postType === 'live' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Go Live?</h3>
                <p className="text-sm opacity-90">Start broadcasting to your audience instantly</p>
              </div>

              <div className="space-y-3">
                <input 
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Stream title..."
                />
                <Textarea
                  placeholder="Stream description (optional)..."
                  className="min-h-[80px]"
                />
                <select className="w-full px-4 py-3 border rounded-lg">
                  <option>Gaming</option>
                  <option>Music</option>
                  <option>Just Chatting</option>
                  <option>Art</option>
                  <option>Sports</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Schedule</Button>
                <Button className="bg-red-500 hover:bg-red-600">
                  🔴 Start Live Stream
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
