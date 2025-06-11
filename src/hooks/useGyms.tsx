
import { useState, useEffect } from "react";

export interface Gym {
  id: number;
  name: string;
  type: string;
  category: "luxury" | "premium" | "budget";
  rating: number;
  location: string;
  price: string;
  image: string;
  amenities: string[];
  link: string;
}

export const useGyms = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setLoading(true);
        // For now, using static data. Later this will connect to Supabase
        const staticGyms: Gym[] = [
          {
            id: 1,
            name: "Elite Fitness Hub",
            type: "Premium Gym",
            category: "luxury",
            rating: 4.8,
            location: "Bandra West, Mumbai",
            price: "₹2,500/month",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            amenities: ["AC", "Parking", "Locker", "Personal Training", "Modern Equipment"],
            link: "/gym/1"
          },
          {
            id: 2,
            name: "The Strength Factory",
            type: "Modern Gym",
            category: "premium",
            rating: 4.5,
            location: "Koregaon Park, Pune",
            price: "₹1,800/month",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            amenities: ["AC", "Showers", "Cardio", "Group Classes"],
            link: "/gym/2"
          },
          {
            id: 3,
            name: "Flex Zone Gym",
            type: "Community Gym",
            category: "budget",
            rating: 4.2,
            location: "Indiranagar, Bangalore",
            price: "₹1,000/month",
            image: "https://images.unsplash.com/photo-1583454110551-4515c1934342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            amenities: ["Basic Equipment", "Personal Training", "Flexible Hours"],
            link: "/gym/3"
          },
          {
            id: 4,
            name: "Iron Paradise",
            type: "Hardcore Gym",
            category: "luxury",
            rating: 4.9,
            location: "Andheri West, Mumbai",
            price: "₹3,200/month",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            amenities: ["Premium Equipment", "Spa Access", "Nutrition Counseling", "VIP Lounge"],
            link: "/gym/4"
          },
          {
            id: 5,
            name: "FitHub Express",
            type: "Quick Workout",
            category: "budget",
            rating: 4.1,
            location: "Sector 18, Gurgaon",
            price: "₹800/month",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            amenities: ["24/7 Access", "Basic Cardio", "Weight Training"],
            link: "/gym/5"
          },
          {
            id: 6,
            name: "Elite Powerhouse",
            type: "Professional Gym",
            category: "premium",
            rating: 4.7,
            location: "Whitefield, Bangalore",
            price: "₹2,200/month",
            image: "https://images.unsplash.com/photo-1583454110551-4515c1934342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            amenities: ["CrossFit", "Olympic Lifting", "Recovery Zone", "Meal Plans"],
            link: "/gym/6"
          }
        ];

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGyms(staticGyms);
        setError(null);
      } catch (err) {
        setError("Failed to fetch gyms");
        console.error("Error fetching gyms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  return { gyms, loading, error };
};
