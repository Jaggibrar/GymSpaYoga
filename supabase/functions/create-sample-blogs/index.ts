import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const sampleBlogs = [
      {
        title: 'Ultimate Guide to Yoga for Beginners',
        content: 'Discover the transformative power of yoga with our comprehensive beginner guide. Learn basic poses, breathing techniques, and how to start your yoga journey safely and effectively. Yoga is more than just physical exercise; it\'s a holistic practice that combines movement, breath, and mindfulness to promote overall well-being.\n\nStarting with basic poses like Mountain Pose, Downward Dog, and Child\'s Pose, beginners can gradually build strength, flexibility, and confidence. Remember to listen to your body and never force any position.\n\nBreathing is equally important in yoga. Practice deep, mindful breathing to enhance your poses and create a meditative state. As you progress, you\'ll discover that yoga offers not just physical benefits but also mental clarity and emotional balance.',
        excerpt: 'Start your yoga journey with confidence using our complete beginner guide covering essential poses, breathing, and mindfulness practices.',
        slug: 'ultimate-guide-yoga-beginners',
        category: 'yoga',
        tags: ['yoga', 'beginners', 'wellness', 'mindfulness'],
        image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
        published: true,
        featured: true,
        views_count: 245,
        likes_count: 18,
        meta_description: 'Complete yoga guide for beginners with essential poses and breathing techniques'
      },
      {
        title: '5 Best Spa Treatments for Stress Relief',
        content: 'Explore the most effective spa treatments that help melt away stress and restore your inner balance. From massage therapy to aromatherapy, find your perfect relaxation ritual.\n\n1. Hot Stone Massage: Warm stones placed on key points of your body help release tension and promote deep relaxation.\n\n2. Aromatherapy Sessions: Essential oils like lavender and chamomile naturally reduce cortisol levels and calm the mind.\n\n3. Deep Tissue Massage: Targets chronic muscle tension and knots, providing both physical and mental relief.\n\n4. Hydrotherapy: Water-based treatments help reduce inflammation and promote circulation.\n\n5. Meditation and Sound Therapy: Combine relaxation techniques with healing sounds for ultimate stress relief.',
        excerpt: 'Discover the top 5 spa treatments that effectively reduce stress and promote deep relaxation for mind and body wellness.',
        slug: 'best-spa-treatments-stress-relief',
        category: 'spa',
        tags: ['spa', 'stress-relief', 'relaxation', 'wellness'],
        image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
        published: true,
        featured: true,
        views_count: 189,
        likes_count: 24,
        meta_description: 'Top spa treatments for stress relief and relaxation therapy'
      },
      {
        title: 'Home Workout Routines Without Equipment',
        content: 'Get fit from home with these effective bodyweight exercises that require no equipment. Perfect for busy schedules and small spaces.\n\nBodyweight exercises are incredibly versatile and effective for building strength, endurance, and flexibility. Here\'s a complete routine you can do anywhere:\n\nWarm-up (5 minutes):\n- Jumping jacks\n- Arm circles\n- High knees\n- Butt kicks\n\nMain Workout (20-30 minutes):\n- Push-ups (3 sets of 10-15)\n- Squats (3 sets of 15-20)\n- Planks (3 sets of 30-60 seconds)\n- Burpees (3 sets of 5-10)\n- Mountain climbers (3 sets of 20)\n\nCool-down (5 minutes):\n- Stretching and deep breathing\n\nThis routine targets all major muscle groups and can be adapted for any fitness level.',
        excerpt: 'Effective home workout routines using only bodyweight exercises - no equipment needed for a complete fitness routine.',
        slug: 'home-workout-routines-no-equipment',
        category: 'fitness',
        tags: ['fitness', 'home-workout', 'bodyweight', 'exercise'],
        image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        published: true,
        featured: false,
        views_count: 156,
        likes_count: 12,
        meta_description: 'Complete home workout routines using bodyweight exercises with no equipment required'
      },
      {
        title: 'Nutrition Tips for Optimal Wellness',
        content: 'Learn essential nutrition principles that support your wellness journey. Discover how proper nutrition can enhance your fitness and spa experiences.\n\nNutrition is the foundation of wellness. What you eat directly impacts your energy levels, recovery time, and overall health. Here are key principles to follow:\n\n1. Hydration First: Drink plenty of water throughout the day. Aim for at least 8 glasses daily.\n\n2. Balanced Macronutrients: Include proteins, healthy fats, and complex carbohydrates in every meal.\n\n3. Colorful Plates: Eat a variety of colorful fruits and vegetables to ensure diverse nutrient intake.\n\n4. Timing Matters: Eat smaller, frequent meals to maintain steady energy levels.\n\n5. Pre and Post-Workout Nutrition: Fuel your workouts properly and aid recovery with the right foods.\n\n6. Mindful Eating: Pay attention to hunger cues and eat slowly to improve digestion.',
        excerpt: 'Essential nutrition tips to support your wellness journey and enhance your fitness and spa experiences.',
        slug: 'nutrition-tips-optimal-wellness',
        category: 'nutrition',
        tags: ['nutrition', 'wellness', 'healthy-eating', 'lifestyle'],
        image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
        published: true,
        featured: false,
        views_count: 203,
        likes_count: 15,
        meta_description: 'Nutrition tips for optimal wellness and healthy lifestyle choices'
      }
    ];

    // Get current user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Insert sample blogs
    const blogsWithAuthor = sampleBlogs.map(blog => ({
      ...blog,
      author_id: user.id
    }));

    const { data: insertedBlogs, error: blogError } = await supabase
      .from('blogs')
      .insert(blogsWithAuthor)
      .select();

    if (blogError) {
      console.error('Error inserting blogs:', blogError);
      return new Response(JSON.stringify({ error: blogError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Created ${insertedBlogs.length} sample blogs`,
      blogs: insertedBlogs 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});