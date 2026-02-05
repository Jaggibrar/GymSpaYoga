 import { useState, useEffect } from "react";
 import { useParams, useNavigate } from "react-router-dom";
 import { Activity, Heart, Sparkles, MessageCircle } from "lucide-react";
 import { supabase } from "@/integrations/supabase/client";
 import { toast } from "sonner";
 import ListingLayout from "@/components/listing/ListingLayout";
 import MediaGallery from "@/components/listing/MediaGallery";
 import BookingPanel from "@/components/listing/BookingPanel";
 import AboutSection from "@/components/listing/AboutSection";
 import AmenitiesGrid from "@/components/listing/AmenitiesGrid";
 import PricingBox from "@/components/listing/PricingBox";
 import WhatsAppButton from "@/components/WhatsAppButton";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 
 interface Business {
   id: string;
   slug?: string;
   business_name: string;
   business_type: string;
   description?: string;
   address: string;
   city: string;
   state: string;
   phone: string;
   email: string;
   opening_time: string;
   closing_time: string;
   amenities?: string[];
   image_urls?: string[];
   session_price?: number;
   monthly_price?: number;
   category: string;
 }
 
 const ChiropractorDetails = () => {
   const { slug } = useParams();
   const navigate = useNavigate();
   const [chiropractor, setChiropractor] = useState<Business | null>(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     if (slug) {
       fetchChiropractorDetails(slug);
     }
   }, [slug]);
 
   const fetchChiropractorDetails = async (slugOrId: string) => {
     try {
       let query = supabase
         .from('business_profiles')
         .select('*')
         .eq('business_type', 'chiropractor')
         .eq('status', 'approved');
 
       const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
       
       if (isUUID) {
         query = query.eq('id', slugOrId);
       } else {
         query = query.eq('slug', slugOrId);
       }
 
       const { data, error } = await query.maybeSingle();
 
       if (error) throw error;
       if (!data) {
         toast.error('Chiropractor not found');
         return;
       }
       setChiropractor(data);
     } catch (error) {
       console.error('Error fetching chiropractor details:', error);
       toast.error('Failed to load chiropractor details');
     } finally {
       setLoading(false);
     }
   };
 
   if (loading) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="text-center space-y-4">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
           <p className="text-muted-foreground font-medium">Loading chiropractor details...</p>
         </div>
       </div>
     );
   }
 
   if (!chiropractor) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="text-center space-y-6">
           <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
             <Activity className="h-12 w-12 text-primary" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-foreground mb-2">Chiropractor not found</h2>
             <p className="text-muted-foreground mb-6">The chiropractor you're looking for doesn't exist.</p>
           </div>
         </div>
       </div>
     );
   }
 
   const pricingOptions = [];
   if (chiropractor.session_price) {
     pricingOptions.push({
       type: 'session' as const,
       price: chiropractor.session_price,
       title: 'Per Session',
       duration: 'Single Session',
       description: 'Perfect for trying out our services',
       features: ['45-60 minute session', 'Spinal assessment', 'Personalized treatment']
     });
   }
   if (chiropractor.monthly_price) {
     pricingOptions.push({
       type: 'monthly' as const,
       price: chiropractor.monthly_price,
       title: 'Monthly Package',
       duration: '4 Sessions per Month',
       description: 'Best value for ongoing care',
       isPopular: true,
       features: ['4 adjustment sessions', 'Progress tracking', 'Home exercise guidance', 'Priority booking']
     });
   }
 
   return (
     <ListingLayout
       backLink="/chiropractors"
       backText="Back to Chiropractors"
       brandIcon={<Activity className="h-7 w-7 text-white" />}
       brandGradient="from-teal-500 to-cyan-500"
     >
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
           <MediaGallery
             images={chiropractor.image_urls || []}
             name={chiropractor.business_name}
             category={chiropractor.category}
           />
 
           <AboutSection
             businessName={chiropractor.business_name}
             description={chiropractor.description}
             defaultDescription="Experience professional chiropractic care focused on spinal health, pain relief, and overall wellness. Our certified chiropractors use evidence-based techniques to help you achieve optimal musculoskeletal health."
             icon={<Heart className="h-5 w-5 text-white" />}
             gradient="from-teal-500 to-cyan-500"
           />
 
           {chiropractor.amenities && chiropractor.amenities.length > 0 && (
             <AmenitiesGrid
               amenities={chiropractor.amenities}
               title="Services & Facilities"
               icon={<Sparkles className="h-5 w-5 text-white" />}
               gradient="from-teal-500 to-cyan-500"
               defaultAmenities={[
                 'Spinal Adjustment',
                 'Posture Correction',
                 'Pain Management',
                 'Sports Injury Treatment',
                 'Digital X-Ray',
                 'Rehabilitation Therapy',
                 'Ergonomic Assessment',
                 'Wellness Counseling'
               ]}
             />
           )}
 
           {pricingOptions.length > 0 && (
             <PricingBox
               options={pricingOptions}
               title="Treatment Packages"
               icon={<Activity className="h-5 w-5 text-white" />}
               gradient="from-teal-500 to-cyan-500"
             />
           )}
         </div>
 
         <div className="lg:col-span-1 space-y-6">
           <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
             <CardContent className="p-6">
               <WhatsAppButton
                 phoneNumber={chiropractor.phone}
                 businessName={chiropractor.business_name}
                 variant="default"
                 size="lg"
                 className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
               />
             </CardContent>
           </Card>
 
           <BookingPanel
             businessId={chiropractor.id}
             businessName={chiropractor.business_name}
             businessType="chiropractor"
             location={{
               city: chiropractor.city,
               state: chiropractor.state,
               address: chiropractor.address
             }}
             hours={{
               opening: chiropractor.opening_time,
               closing: chiropractor.closing_time
             }}
             phone={chiropractor.phone}
             pricing={{
               session: chiropractor.session_price,
               monthly: chiropractor.monthly_price
             }}
           />
         </div>
       </div>
     </ListingLayout>
   );
 };
 
 export default ChiropractorDetails;