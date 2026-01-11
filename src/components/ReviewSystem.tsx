
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";

interface Review {
  id: number;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_name?: string;
}

interface ReviewSystemProps {
  businessId: string;
  businessType: string;
  businessName: string;
}

const ReviewSystem = ({ businessId, businessType, businessName }: ReviewSystemProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [businessId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('business_id', businessId)
        .eq('business_type', businessType)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(data || []);
      
      // Check if current user has already reviewed
      if (user) {
        const userReview = data?.find(review => review.user_id === user.id);
        setUserHasReviewed(!!userReview);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!user) {
      toast.error('Please log in to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      setSubmitting(true);

      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          business_id: businessId,
          business_type: businessType,
          rating,
          comment: comment.trim()
        });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setRating(0);
      setComment("");
      setUserHasReviewed(true);
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-200 rounded-lg"></div>;
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews & Ratings</span>
            <div className="flex items-center space-x-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user && !userHasReviewed && (
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-[#005EB8] hover:bg-[#004d96]"
            >
              Write a Review
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review for {businessName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              {renderStars(rating, true, setRating)}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Comment (optional)</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={submitReview}
                disabled={submitting || rating === 0}
                className="bg-[#005EB8] hover:bg-[#004d96]"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReviewForm(false);
                  setRating(0);
                  setComment("");
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#005EB8] rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
