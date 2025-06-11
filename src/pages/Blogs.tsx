
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import BlogCard from "@/components/blog/BlogCard";
import BlogFilters from "@/components/blog/BlogFilters";
import WriteBlogModal from "@/components/blog/WriteBlogModal";

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
    }
  ]);

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

  const handleSubmitBlog = (newBlogData: any) => {
    if (!newBlogData.title || !newBlogData.content || !newBlogData.category || !newBlogData.author) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPost = {
      id: blogPosts.length + 1,
      title: newBlogData.title,
      excerpt: newBlogData.content.substring(0, 150) + "...",
      content: newBlogData.content,
      author: newBlogData.author,
      category: newBlogData.category,
      date: new Date().toISOString().split('T')[0],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setBlogPosts(prevBlogs => [newPost, ...prevBlogs]);
    setIsDialogOpen(false);
    toast.success("Blog published successfully!");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 w-full">
      <SEOHead 
        title="Wellness Blog - Expert Fitness, Yoga & Spa Tips | GymSpaYoga"
        description="Read expert wellness blog posts about fitness, yoga, spa treatments, and healthy living. Get tips from certified trainers and wellness professionals."
        keywords="wellness blog, fitness tips, yoga advice, spa treatments, health blog, wellness articles"
        url="https://gymspayoga.com/blogs"
      />

      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
              Wellness
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Blog </span>
            </h2>
            <WriteBlogModal 
              isOpen={isDialogOpen} 
              setIsOpen={setIsDialogOpen} 
              onSubmit={handleSubmitBlog} 
            />
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover expert insights, tips, and inspiration for your fitness and wellness journey
          </p>

          {/* Search and Filter */}
          <BlogFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

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
            <BlogCard 
              key={blog.id}
              blog={blog}
              onLike={handleLike}
              onShare={handleShare}
              onReadMore={handleReadMore}
            />
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
    </div>
  );
};

export default Blogs;
