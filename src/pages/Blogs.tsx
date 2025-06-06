
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Search, Plus, Heart, MessageCircle, Share2, Dumbbell, MapPin, Phone, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
    author: ""
  });

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Gym Exercises for Beginners",
      excerpt: "Starting your fitness journey? Here are the fundamental exercises every beginner should master for a strong foundation.",
      content: "Embarking on a fitness journey can be overwhelming, especially when you step into a gym for the first time. This comprehensive guide will walk you through 10 essential exercises that form the foundation of any effective workout routine...",
      author: "Dr. Priya Sharma",
      category: "Fitness",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 23
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
      comments: 12
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
      comments: 18
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
      comments: 35
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
      comments: 14
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
      comments: 29
    },
    {
      id: 7,
      title: "Nutrition for Gym Goers: Fueling Your Fitness Journey",
      excerpt: "Learn how proper nutrition can amplify your gym results and accelerate your fitness goals.",
      content: "Exercise is only half the equation when it comes to achieving your fitness goals. Proper nutrition plays a crucial role in performance, recovery, and results...",
      author: "Nutritionist Rajesh Verma",
      category: "Nutrition",
      date: "2024-01-01",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 143,
      comments: 21
    },
    {
      id: 8,
      title: "Meditation in Motion: Active Meditation Techniques",
      excerpt: "Discover how to incorporate mindfulness into your daily activities and movement practices.",
      content: "Traditional seated meditation isn't the only path to mindfulness. Active meditation techniques allow you to cultivate awareness while engaging in physical activities...",
      author: "Mindfulness Coach Arjun Kapoor",
      category: "Mindfulness",
      date: "2023-12-28",
      image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 112,
      comments: 16
    },
    {
      id: 9,
      title: "Hot Stone Massage: Benefits and What to Expect",
      excerpt: "Everything you need to know about hot stone massage therapy and its incredible health benefits.",
      content: "Hot stone massage combines the benefits of heat therapy with traditional massage techniques, creating a deeply relaxing and therapeutic experience...",
      author: "Spa Therapist Neha Joshi",
      category: "Wellness",
      date: "2023-12-25",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 87,
      comments: 9
    },
    {
      id: 10,
      title: "CrossFit vs Traditional Gym Workouts: A Complete Comparison",
      excerpt: "Weighing the pros and cons of CrossFit against traditional gym routines to help you make an informed choice.",
      content: "The fitness world offers various training methodologies, with CrossFit and traditional gym workouts being two popular approaches. Each has distinct advantages and considerations...",
      author: "Fitness Expert Vikram Rao",
      category: "Fitness",
      date: "2023-12-22",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 189,
      comments: 33
    },
    {
      id: 11,
      title: "Prenatal Yoga: Safe Practices for Expecting Mothers",
      excerpt: "A comprehensive guide to practicing yoga safely during pregnancy, with modifications and benefits.",
      content: "Pregnancy brings numerous physical and emotional changes, making it an ideal time to embrace the gentle, nurturing practice of prenatal yoga...",
      author: "Prenatal Yoga Instructor Sunita Devi",
      category: "Yoga",
      date: "2023-12-20",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 27
    },
    {
      id: 12,
      title: "The Ultimate Guide to Recovery: Rest Days and Active Recovery",
      excerpt: "Learn why recovery is just as important as your workout and how to optimize your rest days.",
      content: "In the pursuit of fitness goals, many people overlook one of the most crucial components of any training program: recovery. Understanding how to properly rest and recover...",
      author: "Recovery Specialist Dr. Amit Sharma",
      category: "Fitness",
      date: "2023-12-18",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 178,
      comments: 24
    },
    {
      id: 13,
      title: "Aromatherapy in Spa Treatments: Scents for Healing",
      excerpt: "Explore how different essential oils and aromatherapy techniques enhance spa treatments and promote wellness.",
      content: "Aromatherapy, the therapeutic use of essential oils, has been a cornerstone of spa treatments for centuries. The power of scent to influence mood, emotions, and physical well-being...",
      author: "Aromatherapist Priyanka Mehta",
      category: "Wellness",
      date: "2023-12-15",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 94,
      comments: 11
    },
    {
      id: 14,
      title: "Functional Fitness: Training for Real-Life Movements",
      excerpt: "Discover how functional fitness can improve your daily life and prevent injuries through natural movement patterns.",
      content: "Functional fitness focuses on training your body for the activities you perform in daily life. Unlike traditional gym exercises that isolate specific muscles...",
      author: "Functional Training Expert Rohit Kumar",
      category: "Fitness",
      date: "2023-12-12",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 167,
      comments: 31
    },
    {
      id: 15,
      title: "Chakra Balancing: Understanding Energy Centers in Yoga",
      excerpt: "A beginner's guide to understanding and working with chakras in your yoga and meditation practice.",
      content: "The concept of chakras, or energy centers, is fundamental to many yoga and meditation practices. Understanding these energy points can deepen your spiritual practice...",
      author: "Spiritual Guide Guru Ananda",
      category: "Yoga",
      date: "2023-12-10",
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 123,
      comments: 19
    },
    {
      id: 16,
      title: "High-Intensity Interval Training (HIIT): Maximum Results, Minimum Time",
      excerpt: "Learn how HIIT can revolutionize your fitness routine with efficient, effective workouts that fit any schedule.",
      content: "High-Intensity Interval Training (HIIT) has gained immense popularity for its efficiency and effectiveness. This training method alternates between high-intensity bursts and recovery periods...",
      author: "HIIT Specialist Sarah Johnson",
      category: "Fitness",
      date: "2023-12-08",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 203,
      comments: 38
    },
    {
      id: 17,
      title: "Deep Tissue Massage: Healing Beyond the Surface",
      excerpt: "Understanding the benefits and techniques of deep tissue massage for chronic pain and muscle tension relief.",
      content: "Deep tissue massage goes beyond relaxation to target chronic muscle tension and pain. This therapeutic technique uses firm pressure and slow strokes...",
      author: "Licensed Massage Therapist Kiran Reddy",
      category: "Wellness",
      date: "2023-12-05",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 145,
      comments: 22
    },
    {
      id: 18,
      title: "Restorative Yoga: The Art of Deep Relaxation",
      excerpt: "Discover how restorative yoga can help reduce stress, improve sleep, and promote overall well-being.",
      content: "In our fast-paced world, restorative yoga offers a sanctuary of calm and healing. This gentle practice uses props to support the body in relaxing poses...",
      author: "Restorative Yoga Teacher Madhavi Iyer",
      category: "Yoga",
      date: "2023-12-03",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 134,
      comments: 15
    },
    {
      id: 19,
      title: "Strength Training for Women: Myths vs. Reality",
      excerpt: "Debunking common myths about women and weight training while highlighting the incredible benefits of strength training.",
      content: "Despite growing awareness, myths about women and strength training persist. This comprehensive guide addresses common misconceptions and reveals the truth...",
      author: "Women's Fitness Coach Sneha Patel",
      category: "Fitness",
      date: "2023-12-01",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 187,
      comments: 29
    },
    {
      id: 20,
      title: "The Psychology of Wellness: Mind-Body Connection in Spa Therapy",
      excerpt: "Exploring how spa treatments impact mental health and the science behind the mind-body connection.",
      content: "The relationship between mental and physical well-being is complex and profound. Spa therapies work on multiple levels, addressing both physical symptoms and psychological states...",
      author: "Wellness Psychologist Dr. Rajeev Malhotra",
      category: "Wellness",
      date: "2023-11-28",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 21
    }
  ];

  const categories = ["All", "Fitness", "Wellness", "Yoga", "Nutrition", "Mindfulness"];

  const filteredBlogs = blogPosts.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitBlog = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New blog submitted:", newBlog);
    // Add blog submission logic here
    setNewBlog({ title: "", content: "", category: "", author: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/trainers">
                <Button variant="outline" className="text-xs sm:text-sm">
                  Find Trainers
                </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xs sm:text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Write Blog
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
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
                      <Select onValueChange={(value) => setNewBlog({...newBlog, category: value})}>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Wellness
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Blog </span>
          </h2>
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
              <Select onValueChange={setSelectedCategory}>
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
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
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
                <CardTitle className="text-xl font-bold group-hover:text-emerald-600 transition-colors">
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
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{blog.comments}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-emerald-500 group-hover:text-white">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <X className="h-5 w-5 text-white" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>

              {/* Payment Methods */}
              <div>
                <h6 className="text-sm font-semibold text-gray-400 mb-3">We Accept</h6>
                <div className="flex space-x-3">
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://logos-world.net/wp-content/uploads/2020/09/PayPal-Logo.png" alt="PayPal" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 w-10" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-blue-400">For Business</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing Plans</Link></li>
                <li><span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Support</span></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-purple-400">Contact</h5>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-purple-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blogs;
