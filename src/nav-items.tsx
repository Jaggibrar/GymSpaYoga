
import { HomeIcon, Building2, Sparkles, Heart, Users, BookOpen } from "lucide-react";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Gyms", 
    to: "/gyms",
    icon: <Building2 className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Spas",
    to: "/spas", 
    icon: <Sparkles className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Yoga",
    to: "/yoga",
    icon: <Heart className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Trainers",
    to: "/trainers",
    icon: <Users className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Blogs",
    to: "/blogs",
    icon: <BookOpen className="h-4 w-4" />,
    page: null,
  },
];
