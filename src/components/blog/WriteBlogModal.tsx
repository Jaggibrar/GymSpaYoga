
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";

interface WriteBlogModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (blog: any) => void;
}

const WriteBlogModal = ({ isOpen, setIsOpen, onSubmit }: WriteBlogModalProps) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
    author: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newBlog);
    setNewBlog({ title: "", content: "", category: "", author: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Write Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a New Blog Post</DialogTitle>
          <DialogDescription>
            Share your wellness knowledge with our community
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              value={newBlog.author}
              onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
              placeholder="Enter your blog title"
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={newBlog.category} onValueChange={(value) => setNewBlog({...newBlog, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Wellness">Wellness</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
                <SelectItem value="Mindfulness">Mindfulness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={newBlog.content}
              onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
              placeholder="Write your blog content here..."
              className="min-h-[200px]"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-blue-500">
            Publish Blog
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WriteBlogModal;
