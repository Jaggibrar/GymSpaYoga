
import { useState } from "react";
import { Star, User, MapPin, Verified, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  comment: string;
  businessResponse?: string;
  verified: boolean;
  helpfulCount: number;
  date: string;
  category: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Priya Sharma",
    userLocation: "Mumbai",
    rating: 5,
    comment: "Amazing experience! The equipment is top-notch and the trainers are very professional. Worth every penny.",
    businessResponse: "Thank you Priya! We're glad you enjoyed your experience with us.",
    verified: true,
    helpfulCount: 12,
    date: "2 days ago",
    category: "Gym"
  },
  {
    id: "2",
    userName: "Rahul Kumar",
    userLocation: "Delhi",
    rating: 4,
    comment: "Great yoga classes and peaceful environment. The instructors are knowledgeable and helpful.",
    verified: true,
    helpfulCount: 8,
    date: "1 week ago",
    category: "Yoga Studio"
  },
  {
    id: "3",
    userName: "Anita Desai",
    userLocation: "Bangalore",
    rating: 5,
    comment: "Luxury spa experience with excellent service. The relaxation package was exactly what I needed.",
    businessResponse: "We appreciate your kind words! Looking forward to your next visit.",
    verified: true,
    helpfulCount: 15,
    date: "3 days ago",
    category: "Spa"
  }
];

interface ReviewsSystemProps {
  businessId?: string;
  showBusinessName?: boolean;
}

const ReviewsSystem = ({ businessId, showBusinessName = false }: ReviewsSystemProps) => {
  const [reviews] = useState<Review[]>(mockReviews);
  const [filter, setFilter] = useState<"all" | 5 | 4 | 3 | 2 | 1>("all");

  const filteredReviews = filter === "all" 
    ? reviews 
    : reviews.filter(review => review.rating === filter);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className="text-4xl font-black text-gray-800">{averageRating.toFixed(1)}</div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-6 w-6 ${
                        index < Math.floor(averageRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 font-medium">
                Based on {totalReviews} verified reviews
              </p>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.rating} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right">{dist.rating}★</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${dist.percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-gray-600">{dist.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="font-medium"
        >
          All Reviews ({totalReviews})
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = reviews.filter(r => r.rating === rating).length;
          return count > 0 ? (
            <Button
              key={rating}
              variant={filter === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(rating as 5 | 4 | 3 | 2 | 1)}
              className="font-medium"
            >
              {rating}★ ({count})
            </Button>
          ) : null;
        })}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                    {review.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-800">{review.userName}</h4>
                    {review.verified && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        <Verified className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge className="bg-gray-100 text-gray-700 text-xs">
                      {review.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{review.userLocation}</span>
                    </div>
                    <span className="text-sm text-gray-500">• {review.date}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                  
                  {review.businessResponse && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-emerald-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                          Business Response
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm">{review.businessResponse}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpfulCount})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No reviews found</h3>
          <p className="text-gray-500">No reviews match your current filter.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSystem;
