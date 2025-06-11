import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, User, Search, Plus, Heart, MessageCircle, Share2, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import AppFooter from "@/components/AppFooter";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "10 Essential Gym Exercises for Beginners",
      excerpt: "Starting your fitness journey? Here are the fundamental exercises every beginner should master for a strong foundation.",
      content: "Embarking on a fitness journey can be overwhelming, especially when you step into a gym for the first time. This comprehensive guide will walk you through 10 essential exercises that form the foundation of any effective workout routine.\n\n1. Squats - The king of all exercises, squats work your entire lower body and core. Start with bodyweight squats and gradually add weight as you progress.\n\n2. Push-ups - A classic upper body exercise that targets your chest, shoulders, and triceps. Modify by doing them on your knees if needed.\n\n3. Deadlifts - One of the most effective full-body exercises. Focus on proper form before adding weight.\n\n4. Planks - Build core strength and stability with this isometric exercise. Start with 30 seconds and work your way up.\n\n5. Pull-ups/Assisted Pull-ups - Develop your back and biceps. Use assistance bands or machines if you can't do full pull-ups yet.\n\n6. Lunges - Great for leg strength and balance. Alternate legs and focus on controlled movements.\n\n7. Overhead Press - Build shoulder strength and stability. Start light and focus on form.\n\n8. Rows - Balance out your pushing exercises with pulling movements for your back.\n\n9. Hip Thrusts - Activate and strengthen your glutes, which are often underactive in beginners.\n\n10. Farmer's Walks - Improve grip strength and overall stability while working your entire body.\n\nRemember, consistency is key. Start with 2-3 workouts per week and gradually increase as your fitness improves.",
      author: "Dr. Priya Sharma",
      category: "Fitness",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 23,
      isLiked: false
    },
    {
      id: 2,
      title: "The Science Behind Spa Treatments: More Than Just Relaxation",
      excerpt: "Discover how spa treatments benefit your body and mind beyond just feeling good. The science will surprise you.",
      content: "Spa treatments have evolved from luxury indulgences to scientifically-backed wellness therapies. Modern research reveals the profound physiological and psychological benefits of various spa treatments...",
      author: "Anjali Gupta",
      category: "Wellness",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 89,
      comments: 12,
      isLiked: false
    },
    {
      id: 3,
      title: "Yoga for Mental Health: Ancient Wisdom Meets Modern Science",
      excerpt: "Explore how yoga practices can significantly improve mental health, backed by scientific research and centuries of wisdom.",
      content: "In our fast-paced modern world, mental health challenges are increasingly common. Yoga, an ancient practice rooted in Indian philosophy, offers powerful tools for mental wellness...",
      author: "Ravi Kumar",
      category: "Yoga",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 134,
      comments: 18,
      isLiked: false
    },
    {
      id: 4,
      title: "Building a Home Gym: Essential Equipment Guide",
      excerpt: "Create an effective workout space at home with these carefully selected pieces of equipment that won't break the bank.",
      content: "With busy schedules and convenience becoming paramount, home gyms are gaining popularity. This guide will help you create an effective workout space without overwhelming your budget...",
      author: "Sanjay Patel",
      category: "Fitness",
      date: "2024-01-08",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 201,
      comments: 35,
      isLiked: false
    },
    {
      id: 5,
      title: "Ayurvedic Spa Rituals: Timeless Healing Traditions",
      excerpt: "Dive deep into ancient Ayurvedic practices that form the foundation of many modern spa treatments.",
      content: "Ayurveda, the 5,000-year-old Indian system of medicine, forms the backbone of many contemporary spa treatments. Understanding these ancient principles can enhance your spa experience...",
      author: "Dr. Meera Nair",
      category: "Wellness",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1563461717-96a5efe542c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 98,
      comments: 14,
      isLiked: false
    },
    {
      id: 6,
      title: "Power Yoga vs Traditional Yoga: Which is Right for You?",
      excerpt: "Understanding the differences between various yoga styles to choose the perfect practice for your goals and lifestyle.",
      content: "The world of yoga offers numerous styles and approaches, each with unique benefits and characteristics. Two popular forms that often create confusion are Power Yoga and Traditional Yoga...",
      author: "Kavita Singh",
      category: "Yoga",
      date: "2024-01-03",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 167,
      comments: 29,
      isLiked: false
    }
  ]);
  
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
    author: ""
  });

  const postsPerPage = 6;
  const categories = ["All", "Fitness", "Wellness", "Yoga", "Nutrition", "Mindfulness"];

  // Filter and paginate blogs
  const filteredBlogs = useMemo(() => {
    return blogPosts.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + postsPerPage);

  // Blog interactions
  const handleLike = (blogId: number) => {
    setBlogPosts(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === blogId 
          ? { 
              ...blog, 
              likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
              isLiked: !blog.isLiked 
            }
          : blog
      )
    );
    toast.success("Thanks for your reaction!");
  };

  const handleShare = (blog: any) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${blog.title} - ${window.location.href}`);
      toast.success("Blog link copied to clipboard!");
    }
  };

  const handleReadMore = (blog: any) => {
    setSelectedBlog(blog);
    setIsReadMoreOpen(true);
  };

  const handleSubmitBlog = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBlog.title || !newBlog.content || !newBlog.category || !newBlog.author) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPost = {
      id: blogPosts.length + 1,
      title: newBlog.title,
      excerpt: newBlog.content.substring(0, 150) + "...",
      content: newBlog.content,
      author: newBlog.author,
      category: newBlog.category,
      date: new Date().toISOString().split('T')[0],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setBlogPosts(prevBlogs => [newPost, ...prevBlogs]);
    setNewBlog({ title: "", content: "", category: "", author: "" });
    setIsDialogOpen(false);
    toast.success("Blog published successfully!");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <SEOHead 
        title="Wellness Blog - Expert Fitness, Yoga & Spa Tips | GymSpaYoga"
        description="Read expert wellness blog posts about fitness, yoga, spa treatments, and healthy living. Get tips from certified trainers and wellness professionals."
        keywords="wellness blog, fitness tips, yoga advice, spa treatments, health blog, wellness articles"
        url="https://gymspayoga.com/blogs"
      />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section with Write Blog Button */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
              Wellness
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Blog </span>
            </h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <form onSubmit={handleSubmitBlog} className="space-y-4">
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
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover expert insights, tips, and inspiration for your fitness and wellness journey
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-600 mb-6">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'} found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedBlogs.map((blog) => (
            <Card key={blog.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
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
                      onClick={() => handleLike(blog.id)}
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
                      onClick={() => handleShare(blog)}
                      className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group-hover:bg-emerald-500 group-hover:text-white"
                    onClick={() => handleReadMore(blog)}
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No blogs found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setCurrentPage(1);
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Read More Dialog */}
      <Dialog open={isReadMoreOpen} onOpenChange={setIsReadMoreOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedBlog && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-emerald-500">{selectedBlog.category}</Badge>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedBlog.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-left">
                  {selectedBlog.title}
                </DialogTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>By {selectedBlog.author}</span>
                </div>
              </DialogHeader>
              <div className="mt-6">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedBlog.content}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button 
                      onClick={() => handleLike(selectedBlog.id)}
                      className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${selectedBlog.isLiked ? 'text-red-500' : ''}`}
                    >
                      <Heart className={`h-4 w-4 ${selectedBlog.isLiked ? 'fill-current' : ''}`} />
                      <span>{selectedBlog.likes}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{selectedBlog.comments}</span>
                    </div>
                    <button 
                      onClick={() => handleShare(selectedBlog)}
                      className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AppFooter />
    </div>
  );
};

export default Blogs;
