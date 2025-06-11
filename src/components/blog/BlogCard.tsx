
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Heart, MessageCircle, Share2 } from "lucide-react";

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    date: string;
    image: string;
    likes: number;
    comments: number;
    isLiked: boolean;
  };
  onLike: (id: number) => void;
  onShare: (blog: any) => void;
  onReadMore: (blog: any) => void;
}

const BlogCard = ({ blog, onLike, onShare, onReadMore }: BlogCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4 bg-emerald-500">
          {blog.category}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold group-hover:text-emerald-600 transition-colors line-clamp-2">
          {blog.title}
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-3">
          {blog.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="truncate">{blog.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button 
              onClick={() => onLike(blog.id)}
              className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${blog.isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${blog.isLiked ? 'fill-current' : ''}`} />
              <span>{blog.likes}</span>
            </button>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{blog.comments}</span>
            </div>
            <button 
              onClick={() => onShare(blog)}
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="group-hover:bg-emerald-500 group-hover:text-white"
            onClick={() => onReadMore(blog)}
          >
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
