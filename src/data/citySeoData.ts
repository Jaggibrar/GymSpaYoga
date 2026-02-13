// City SEO data for programmatic landing pages
export interface CitySeoEntry {
  slug: string;
  name: string;
  state: string;
  heroImage: string;
  description: string;
}

export interface CategorySeoEntry {
  slug: string;
  label: string;
  businessType: string;
  icon: string;
  heroImage: string;
}

export const cities: CitySeoEntry[] = [
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1920&q=80', description: 'the City of Joy' },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi', heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=80', description: 'the national capital' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80', description: 'the city of dreams' },
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka', heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1920&q=80', description: 'the Silicon Valley of India' },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', heroImage: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&w=1920&q=80', description: 'the City of Pearls' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', heroImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?auto=format&fit=crop&w=1920&q=80', description: 'the Oxford of the East' },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=80', description: 'the Gateway to South India' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', heroImage: 'https://images.unsplash.com/photo-1609948543911-7f1a6d0tried?auto=format&fit=crop&w=1920&q=80', description: 'the Manchester of India' },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80', description: 'the Pink City' },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', heroImage: 'https://images.unsplash.com/photo-1590766940554-634f7a2c3348?auto=format&fit=crop&w=1920&q=80', description: 'the City of Nawabs' },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Punjab', heroImage: 'https://images.unsplash.com/photo-1590766940554-634f7a2c3348?auto=format&fit=crop&w=1920&q=80', description: 'the City Beautiful' },
  { slug: 'goa', name: 'Goa', state: 'Goa', heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80', description: 'India\'s beach paradise' },
  { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=80', description: 'the IT hub of NCR' },
  { slug: 'gurgaon', name: 'Gurgaon', state: 'Haryana', heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=80', description: 'the Millennium City' },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', heroImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?auto=format&fit=crop&w=1920&q=80', description: 'the cleanest city of India' },
  { slug: 'kochi', name: 'Kochi', state: 'Kerala', heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=80', description: 'the Queen of the Arabian Sea' },
  { slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', heroImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?auto=format&fit=crop&w=1920&q=80', description: 'the City of Lakes' },
  { slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra', heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80', description: 'the Orange City' },
  { slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=80', description: 'the Manchester of South India' },
  { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', heroImage: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&w=1920&q=80', description: 'the Jewel of the East Coast' },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', heroImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?auto=format&fit=crop&w=1920&q=80', description: 'the Diamond City' },
  { slug: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=80', description: 'the Evergreen City' },
  { slug: 'patna', name: 'Patna', state: 'Bihar', heroImage: 'https://images.unsplash.com/photo-1590766940554-634f7a2c3348?auto=format&fit=crop&w=1920&q=80', description: 'one of the oldest cities in the world' },
  { slug: 'vadodara', name: 'Vadodara', state: 'Gujarat', heroImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?auto=format&fit=crop&w=1920&q=80', description: 'the Cultural Capital of Gujarat' },
];

export const categories: CategorySeoEntry[] = [
  { slug: 'gyms', label: 'Gyms', businessType: 'gym', icon: '🏋️', heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80' },
  { slug: 'spas', label: 'Spas', businessType: 'spa', icon: '💆', heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80' },
  { slug: 'yoga-classes', label: 'Yoga Classes', businessType: 'yoga', icon: '🧘', heroImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80' },
];

export const getCityBySlug = (slug: string): CitySeoEntry | undefined =>
  cities.find(c => c.slug === slug);

export const getCategoryBySlug = (slug: string): CategorySeoEntry | undefined =>
  categories.find(c => c.slug === slug);

// Generate unique FAQ content per city+category combo
export const generateFaqs = (categoryLabel: string, cityName: string) => [
  {
    question: `What are the best ${categoryLabel.toLowerCase()} in ${cityName}?`,
    answer: `GymSpaYoga lists the top-rated ${categoryLabel.toLowerCase()} in ${cityName} across Luxury, Premium, and Budget tiers. Browse verified listings with real photos, pricing, amenities, and user reviews to find the perfect fit for your wellness goals.`,
  },
  {
    question: `How much do ${categoryLabel.toLowerCase()} cost in ${cityName}?`,
    answer: `Prices for ${categoryLabel.toLowerCase()} in ${cityName} vary by tier: Budget-friendly options start from ₹500/month, Premium centers range ₹2,000–₹5,000/month, and Luxury facilities go from ₹5,000+ per month. Session-based pricing is also available at many centres.`,
  },
  {
    question: `How do I book a ${categoryLabel.toLowerCase().replace(/s$/, '')} in ${cityName} on GymSpaYoga?`,
    answer: `Simply browse ${categoryLabel.toLowerCase()} in ${cityName} on GymSpaYoga, select a listing, and click "Book Now" to connect directly via WhatsApp or use our booking form. No commission is charged — you deal directly with the business.`,
  },
  {
    question: `Are listings on GymSpaYoga verified?`,
    answer: `Yes, all ${categoryLabel.toLowerCase()} listed on GymSpaYoga go through a verification process. Look for the "Verified" badge on listings for extra assurance. We also display real photos and genuine reviews from users.`,
  },
  {
    question: `Can I get a free trial at ${categoryLabel.toLowerCase()} in ${cityName}?`,
    answer: `Many ${categoryLabel.toLowerCase()} in ${cityName} offer a free 1-day trial pass for new visitors. Check individual listings on GymSpaYoga for trial availability, or click "WhatsApp Inquiry" to ask the business directly.`,
  },
];

// Generate long-form SEO content per city+category
export const generateSeoContent = (categoryLabel: string, cityName: string, cityDescription: string) => {
  const cat = categoryLabel.toLowerCase();
  return `
## Why Choose ${categoryLabel} in ${cityName}?

${cityName}, known as ${cityDescription}, has seen a massive surge in wellness culture. Whether you're a fitness enthusiast, a working professional seeking stress relief, or someone starting their wellness journey, ${cityName} offers world-class ${cat} to suit every need and budget.

## What to Look for in ${categoryLabel} in ${cityName}

When choosing the right ${cat.replace(/s$/, '')} in ${cityName}, consider these factors:

- **Location & Accessibility** — Choose a centre close to your home or office for consistency.
- **Equipment & Facilities** — Look for modern equipment, clean changing rooms, and quality amenities.
- **Certified Trainers** — Professional guidance makes a huge difference in achieving your goals.
- **Pricing Transparency** — Compare monthly and session-based pricing across Budget, Premium, and Luxury tiers.
- **User Reviews** — Read genuine reviews from other members on GymSpaYoga.

## ${categoryLabel} Pricing in ${cityName} (2025)

| Tier | Monthly Price Range | What to Expect |
|------|-------------------|----------------|
| Budget | ₹500 – ₹2,000 | Basic equipment, group classes |
| Premium | ₹2,000 – ₹5,000 | Modern equipment, AC, personal training options |
| Luxury | ₹5,000+ | Premium amenities, spa facilities, elite trainers |

## How GymSpaYoga Helps You Find the Best ${categoryLabel}

GymSpaYoga is India's fastest-growing wellness discovery platform. We connect users with verified ${cat} across ${cityName} with:

- **No Commission Model** — Businesses pay a one-time registration fee only.
- **Direct Booking** — Connect directly via WhatsApp or our booking system.
- **Verified Listings** — Every listing goes through our verification process.
- **Real Reviews** — Genuine feedback from real users.
- **Free Trial Passes** — Many listed ${cat} offer 1-day free trials.

## Popular Areas for ${categoryLabel} in ${cityName}

Explore ${cat} in popular neighbourhoods and localities across ${cityName}. Whether you're in the heart of the city or in the suburbs, GymSpaYoga has listings near you.
  `.trim();
};
