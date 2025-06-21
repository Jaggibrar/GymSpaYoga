
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Starting Your Fitness Journey",
      excerpt: "Discover the fundamental principles that will set you up for success in your fitness transformation.",
      author: "GymSpaYoga Team",
      date: "2024-01-15",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Yoga for Beginners",
      excerpt: "Learn the basics of yoga practice and discover how to start your mindfulness journey.",
      author: "Sarah Johnson",
      date: "2024-01-12",
      category: "Yoga",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Spa Treatments: Your Path to Ultimate Relaxation",
      excerpt: "Explore different spa treatments and their benefits for both body and mind wellness.",
      author: "Michael Chen",
      date: "2024-01-10",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop"
    }
  ];

  return (
    <>
      <SEOHead
        title="Fitness & Wellness Blog - Expert Tips & Guides"
        description="Stay updated with the latest fitness trends, wellness tips, and expert advice from our team of professionals."
        keywords="fitness blog, wellness tips, gym advice, yoga guides, spa treatments"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 mr-4 text-emerald-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Fitness & Wellness Blog
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover expert tips, guides, and insights to enhance your fitness and wellness journey.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest fitness tips, wellness guides, and exclusive content.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blogs;
