// City SEO data for programmatic landing pages — Global Edition
export interface CitySeoEntry {
  slug: string;
  name: string;
  state: string; // state/province/region/country
  heroImage: string;
  description: string;
  country?: string;
}

export interface CategorySeoEntry {
  slug: string;
  label: string;
  businessType: string;
  icon: string;
  heroImage: string;
}

// Default hero images by region
const heroImg = {
  india: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=80',
  usa: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1920&q=80',
  uk: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80',
  uae: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80',
  canada: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1920&q=80',
  australia: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1920&q=80',
  europe: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1920&q=80',
  asia: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
  latam: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=80',
  africa: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80',
};

export const cities: CitySeoEntry[] = [
  // ===== INDIA (25 cities) =====
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', country: 'India', heroImage: heroImg.india, description: 'the City of Joy' },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi', country: 'India', heroImage: heroImg.india, description: 'the national capital' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', country: 'India', heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80', description: 'the city of dreams' },
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka', country: 'India', heroImage: heroImg.india, description: 'the Silicon Valley of India' },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', country: 'India', heroImage: heroImg.india, description: 'the City of Pearls' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', country: 'India', heroImage: heroImg.india, description: 'the Oxford of the East' },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', country: 'India', heroImage: heroImg.india, description: 'the Gateway to South India' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', country: 'India', heroImage: heroImg.india, description: 'the Manchester of India' },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', country: 'India', heroImage: heroImg.india, description: 'the Pink City' },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', heroImage: heroImg.india, description: 'the City of Nawabs' },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Punjab', country: 'India', heroImage: heroImg.india, description: 'the City Beautiful' },
  { slug: 'goa', name: 'Goa', state: 'Goa', country: 'India', heroImage: heroImg.india, description: 'India\'s beach paradise' },
  { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', country: 'India', heroImage: heroImg.india, description: 'the IT hub of NCR' },
  { slug: 'gurgaon', name: 'Gurgaon', state: 'Haryana', country: 'India', heroImage: heroImg.india, description: 'the Millennium City' },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', country: 'India', heroImage: heroImg.india, description: 'the cleanest city of India' },
  { slug: 'kochi', name: 'Kochi', state: 'Kerala', country: 'India', heroImage: heroImg.india, description: 'the Queen of the Arabian Sea' },
  { slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', country: 'India', heroImage: heroImg.india, description: 'the City of Lakes' },
  { slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra', country: 'India', heroImage: heroImg.india, description: 'the Orange City' },
  { slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', country: 'India', heroImage: heroImg.india, description: 'the Manchester of South India' },
  { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', heroImage: heroImg.india, description: 'the Jewel of the East Coast' },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', country: 'India', heroImage: heroImg.india, description: 'the Diamond City' },
  { slug: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', country: 'India', heroImage: heroImg.india, description: 'the Evergreen City' },
  { slug: 'patna', name: 'Patna', state: 'Bihar', country: 'India', heroImage: heroImg.india, description: 'one of the oldest cities in the world' },
  { slug: 'vadodara', name: 'Vadodara', state: 'Gujarat', country: 'India', heroImage: heroImg.india, description: 'the Cultural Capital of Gujarat' },
  { slug: 'mysore', name: 'Mysore', state: 'Karnataka', country: 'India', heroImage: heroImg.india, description: 'the City of Palaces and the birthplace of Ashtanga Yoga' },

  // ===== USA (40 cities) =====
  { slug: 'new-york', name: 'New York', state: 'New York', country: 'USA', heroImage: heroImg.usa, description: 'the city that never sleeps' },
  { slug: 'los-angeles', name: 'Los Angeles', state: 'California', country: 'USA', heroImage: heroImg.usa, description: 'the entertainment and fitness capital of the world' },
  { slug: 'chicago', name: 'Chicago', state: 'Illinois', country: 'USA', heroImage: heroImg.usa, description: 'the Windy City' },
  { slug: 'houston', name: 'Houston', state: 'Texas', country: 'USA', heroImage: heroImg.usa, description: 'the Space City' },
  { slug: 'miami', name: 'Miami', state: 'Florida', country: 'USA', heroImage: heroImg.usa, description: 'the Magic City of sun, sand, and wellness' },
  { slug: 'san-francisco', name: 'San Francisco', state: 'California', country: 'USA', heroImage: heroImg.usa, description: 'the Golden Gate City' },
  { slug: 'seattle', name: 'Seattle', state: 'Washington', country: 'USA', heroImage: heroImg.usa, description: 'the Emerald City' },
  { slug: 'boston', name: 'Boston', state: 'Massachusetts', country: 'USA', heroImage: heroImg.usa, description: 'the Cradle of Liberty' },
  { slug: 'austin', name: 'Austin', state: 'Texas', country: 'USA', heroImage: heroImg.usa, description: 'the Live Music Capital and wellness hub' },
  { slug: 'denver', name: 'Denver', state: 'Colorado', country: 'USA', heroImage: heroImg.usa, description: 'the Mile High City' },
  { slug: 'san-diego', name: 'San Diego', state: 'California', country: 'USA', heroImage: heroImg.usa, description: 'America\'s Finest City' },
  { slug: 'dallas', name: 'Dallas', state: 'Texas', country: 'USA', heroImage: heroImg.usa, description: 'the Big D' },
  { slug: 'atlanta', name: 'Atlanta', state: 'Georgia', country: 'USA', heroImage: heroImg.usa, description: 'the Capital of the South' },
  { slug: 'philadelphia', name: 'Philadelphia', state: 'Pennsylvania', country: 'USA', heroImage: heroImg.usa, description: 'the City of Brotherly Love' },
  { slug: 'phoenix', name: 'Phoenix', state: 'Arizona', country: 'USA', heroImage: heroImg.usa, description: 'the Valley of the Sun' },
  { slug: 'las-vegas', name: 'Las Vegas', state: 'Nevada', country: 'USA', heroImage: heroImg.usa, description: 'the Entertainment Capital' },
  { slug: 'portland', name: 'Portland', state: 'Oregon', country: 'USA', heroImage: heroImg.usa, description: 'the City of Roses' },
  { slug: 'nashville', name: 'Nashville', state: 'Tennessee', country: 'USA', heroImage: heroImg.usa, description: 'Music City' },
  { slug: 'minneapolis', name: 'Minneapolis', state: 'Minnesota', country: 'USA', heroImage: heroImg.usa, description: 'the City of Lakes' },
  { slug: 'charlotte', name: 'Charlotte', state: 'North Carolina', country: 'USA', heroImage: heroImg.usa, description: 'the Queen City' },
  { slug: 'washington-dc', name: 'Washington DC', state: 'District of Columbia', country: 'USA', heroImage: heroImg.usa, description: 'the nation\'s capital' },
  { slug: 'san-jose', name: 'San Jose', state: 'California', country: 'USA', heroImage: heroImg.usa, description: 'the Capital of Silicon Valley' },
  { slug: 'orlando', name: 'Orlando', state: 'Florida', country: 'USA', heroImage: heroImg.usa, description: 'the Theme Park Capital' },
  { slug: 'tampa', name: 'Tampa', state: 'Florida', country: 'USA', heroImage: heroImg.usa, description: 'the Cigar City on Tampa Bay' },
  { slug: 'pittsburgh', name: 'Pittsburgh', state: 'Pennsylvania', country: 'USA', heroImage: heroImg.usa, description: 'the Steel City' },
  { slug: 'salt-lake-city', name: 'Salt Lake City', state: 'Utah', country: 'USA', heroImage: heroImg.usa, description: 'the Crossroads of the West' },
  { slug: 'raleigh', name: 'Raleigh', state: 'North Carolina', country: 'USA', heroImage: heroImg.usa, description: 'the City of Oaks' },
  { slug: 'columbus', name: 'Columbus', state: 'Ohio', country: 'USA', heroImage: heroImg.usa, description: 'the Discovery City' },
  { slug: 'indianapolis', name: 'Indianapolis', state: 'Indiana', country: 'USA', heroImage: heroImg.usa, description: 'the Crossroads of America' },
  { slug: 'honolulu', name: 'Honolulu', state: 'Hawaii', country: 'USA', heroImage: heroImg.usa, description: 'the paradise of the Pacific' },
  { slug: 'scottsdale', name: 'Scottsdale', state: 'Arizona', country: 'USA', heroImage: heroImg.usa, description: 'the West\'s Most Western Town and spa destination' },
  { slug: 'savannah', name: 'Savannah', state: 'Georgia', country: 'USA', heroImage: heroImg.usa, description: 'the Hostess City of the South' },
  { slug: 'new-orleans', name: 'New Orleans', state: 'Louisiana', country: 'USA', heroImage: heroImg.usa, description: 'the Big Easy' },
  { slug: 'detroit', name: 'Detroit', state: 'Michigan', country: 'USA', heroImage: heroImg.usa, description: 'the Motor City' },
  { slug: 'milwaukee', name: 'Milwaukee', state: 'Wisconsin', country: 'USA', heroImage: heroImg.usa, description: 'the Brew City' },
  { slug: 'sacramento', name: 'Sacramento', state: 'California', country: 'USA', heroImage: heroImg.usa, description: 'the Farm-to-Fork Capital' },
  { slug: 'kansas-city', name: 'Kansas City', state: 'Missouri', country: 'USA', heroImage: heroImg.usa, description: 'the Heart of America' },
  { slug: 'jacksonville', name: 'Jacksonville', state: 'Florida', country: 'USA', heroImage: heroImg.usa, description: 'the River City by the sea' },
  { slug: 'richmond', name: 'Richmond', state: 'Virginia', country: 'USA', heroImage: heroImg.usa, description: 'the River City' },
  { slug: 'tucson', name: 'Tucson', state: 'Arizona', country: 'USA', heroImage: heroImg.usa, description: 'the Old Pueblo' },

  // ===== UK (20 cities) =====
  { slug: 'london', name: 'London', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the global capital of culture and wellness' },
  { slug: 'manchester', name: 'Manchester', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the original industrial powerhouse' },
  { slug: 'birmingham', name: 'Birmingham', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the second city of England' },
  { slug: 'edinburgh', name: 'Edinburgh', state: 'Scotland', country: 'UK', heroImage: heroImg.uk, description: 'the Athens of the North' },
  { slug: 'glasgow', name: 'Glasgow', state: 'Scotland', country: 'UK', heroImage: heroImg.uk, description: 'Scotland\'s largest city' },
  { slug: 'bristol', name: 'Bristol', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'a vibrant harbour city' },
  { slug: 'liverpool', name: 'Liverpool', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the birthplace of the Beatles' },
  { slug: 'leeds', name: 'Leeds', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the cultural heart of Yorkshire' },
  { slug: 'brighton', name: 'Brighton', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the seaside wellness destination' },
  { slug: 'oxford', name: 'Oxford', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the city of dreaming spires' },
  { slug: 'cambridge', name: 'Cambridge', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the historic university city' },
  { slug: 'bath', name: 'Bath', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the historic spa city of Roman baths' },
  { slug: 'nottingham', name: 'Nottingham', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the Queen of the Midlands' },
  { slug: 'cardiff', name: 'Cardiff', state: 'Wales', country: 'UK', heroImage: heroImg.uk, description: 'the capital of Wales' },
  { slug: 'belfast', name: 'Belfast', state: 'Northern Ireland', country: 'UK', heroImage: heroImg.uk, description: 'a revitalised waterfront city' },
  { slug: 'newcastle', name: 'Newcastle', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the Geordie capital' },
  { slug: 'sheffield', name: 'Sheffield', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the outdoor city' },
  { slug: 'coventry', name: 'Coventry', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the city of culture' },
  { slug: 'reading', name: 'Reading', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the Silicon Valley of the UK' },
  { slug: 'southampton', name: 'Southampton', state: 'England', country: 'UK', heroImage: heroImg.uk, description: 'the gateway to the south coast' },

  // ===== UAE (8 cities) =====
  { slug: 'dubai', name: 'Dubai', state: 'Dubai', country: 'UAE', heroImage: heroImg.uae, description: 'the city of luxury wellness and world-class spas' },
  { slug: 'abu-dhabi', name: 'Abu Dhabi', state: 'Abu Dhabi', country: 'UAE', heroImage: heroImg.uae, description: 'the capital of the UAE' },
  { slug: 'sharjah', name: 'Sharjah', state: 'Sharjah', country: 'UAE', heroImage: heroImg.uae, description: 'the Cultural Capital of the Arab World' },
  { slug: 'ajman', name: 'Ajman', state: 'Ajman', country: 'UAE', heroImage: heroImg.uae, description: 'the smallest emirate with big ambitions' },
  { slug: 'ras-al-khaimah', name: 'Ras Al Khaimah', state: 'RAK', country: 'UAE', heroImage: heroImg.uae, description: 'the adventure emirate' },
  { slug: 'fujairah', name: 'Fujairah', state: 'Fujairah', country: 'UAE', heroImage: heroImg.uae, description: 'the eastern gateway to the UAE' },
  { slug: 'al-ain', name: 'Al Ain', state: 'Abu Dhabi', country: 'UAE', heroImage: heroImg.uae, description: 'the Garden City of the UAE' },
  { slug: 'umm-al-quwain', name: 'Umm Al Quwain', state: 'UAQ', country: 'UAE', heroImage: heroImg.uae, description: 'the tranquil coastal emirate' },

  // ===== CANADA (15 cities) =====
  { slug: 'toronto', name: 'Toronto', state: 'Ontario', country: 'Canada', heroImage: heroImg.canada, description: 'Canada\'s largest and most diverse city' },
  { slug: 'vancouver', name: 'Vancouver', state: 'British Columbia', country: 'Canada', heroImage: heroImg.canada, description: 'a paradise between mountains and ocean' },
  { slug: 'montreal', name: 'Montreal', state: 'Quebec', country: 'Canada', heroImage: heroImg.canada, description: 'the cultural capital of Canada' },
  { slug: 'calgary', name: 'Calgary', state: 'Alberta', country: 'Canada', heroImage: heroImg.canada, description: 'the Stampede City' },
  { slug: 'ottawa', name: 'Ottawa', state: 'Ontario', country: 'Canada', heroImage: heroImg.canada, description: 'Canada\'s capital city' },
  { slug: 'edmonton', name: 'Edmonton', state: 'Alberta', country: 'Canada', heroImage: heroImg.canada, description: 'the Festival City' },
  { slug: 'winnipeg', name: 'Winnipeg', state: 'Manitoba', country: 'Canada', heroImage: heroImg.canada, description: 'the Gateway to the West' },
  { slug: 'quebec-city', name: 'Quebec City', state: 'Quebec', country: 'Canada', heroImage: heroImg.canada, description: 'the cradle of French civilisation in North America' },
  { slug: 'halifax', name: 'Halifax', state: 'Nova Scotia', country: 'Canada', heroImage: heroImg.canada, description: 'the maritime harbour city' },
  { slug: 'victoria', name: 'Victoria', state: 'British Columbia', country: 'Canada', heroImage: heroImg.canada, description: 'the Garden City' },
  { slug: 'hamilton', name: 'Hamilton', state: 'Ontario', country: 'Canada', heroImage: heroImg.canada, description: 'the Waterfall Capital of the World' },
  { slug: 'kitchener', name: 'Kitchener', state: 'Ontario', country: 'Canada', heroImage: heroImg.canada, description: 'the tech hub of southwestern Ontario' },
  { slug: 'london-ontario', name: 'London', state: 'Ontario', country: 'Canada', heroImage: heroImg.canada, description: 'the Forest City of Ontario' },
  { slug: 'saskatoon', name: 'Saskatoon', state: 'Saskatchewan', country: 'Canada', heroImage: heroImg.canada, description: 'the Paris of the Prairies' },
  { slug: 'regina', name: 'Regina', state: 'Saskatchewan', country: 'Canada', heroImage: heroImg.canada, description: 'the Queen City of the Plains' },

  // ===== AUSTRALIA (15 cities) =====
  { slug: 'sydney', name: 'Sydney', state: 'New South Wales', country: 'Australia', heroImage: heroImg.australia, description: 'the harbour city and Australia\'s fitness capital' },
  { slug: 'melbourne', name: 'Melbourne', state: 'Victoria', country: 'Australia', heroImage: heroImg.australia, description: 'Australia\'s cultural capital' },
  { slug: 'brisbane', name: 'Brisbane', state: 'Queensland', country: 'Australia', heroImage: heroImg.australia, description: 'the River City' },
  { slug: 'perth', name: 'Perth', state: 'Western Australia', country: 'Australia', heroImage: heroImg.australia, description: 'the sunniest capital in the world' },
  { slug: 'adelaide', name: 'Adelaide', state: 'South Australia', country: 'Australia', heroImage: heroImg.australia, description: 'the City of Churches' },
  { slug: 'gold-coast', name: 'Gold Coast', state: 'Queensland', country: 'Australia', heroImage: heroImg.australia, description: 'the surfing and wellness paradise' },
  { slug: 'canberra', name: 'Canberra', state: 'ACT', country: 'Australia', heroImage: heroImg.australia, description: 'Australia\'s capital city' },
  { slug: 'hobart', name: 'Hobart', state: 'Tasmania', country: 'Australia', heroImage: heroImg.australia, description: 'the gateway to Tasmania' },
  { slug: 'darwin', name: 'Darwin', state: 'Northern Territory', country: 'Australia', heroImage: heroImg.australia, description: 'the tropical capital' },
  { slug: 'newcastle-au', name: 'Newcastle', state: 'New South Wales', country: 'Australia', heroImage: heroImg.australia, description: 'the coastal city of NSW' },
  { slug: 'wollongong', name: 'Wollongong', state: 'New South Wales', country: 'Australia', heroImage: heroImg.australia, description: 'the coastal city between mountains and sea' },
  { slug: 'sunshine-coast', name: 'Sunshine Coast', state: 'Queensland', country: 'Australia', heroImage: heroImg.australia, description: 'the relaxed coastal retreat' },
  { slug: 'cairns', name: 'Cairns', state: 'Queensland', country: 'Australia', heroImage: heroImg.australia, description: 'the gateway to the Great Barrier Reef' },
  { slug: 'geelong', name: 'Geelong', state: 'Victoria', country: 'Australia', heroImage: heroImg.australia, description: 'the gateway to the Great Ocean Road' },
  { slug: 'townsville', name: 'Townsville', state: 'Queensland', country: 'Australia', heroImage: heroImg.australia, description: 'the tropical capital of North Queensland' },

  // ===== EUROPE (40 cities) =====
  { slug: 'paris', name: 'Paris', state: 'Île-de-France', country: 'France', heroImage: heroImg.europe, description: 'the City of Light' },
  { slug: 'berlin', name: 'Berlin', state: 'Berlin', country: 'Germany', heroImage: heroImg.europe, description: 'the creative capital of Europe' },
  { slug: 'amsterdam', name: 'Amsterdam', state: 'North Holland', country: 'Netherlands', heroImage: heroImg.europe, description: 'the Venice of the North' },
  { slug: 'barcelona', name: 'Barcelona', state: 'Catalonia', country: 'Spain', heroImage: heroImg.europe, description: 'the Mediterranean gem' },
  { slug: 'madrid', name: 'Madrid', state: 'Madrid', country: 'Spain', heroImage: heroImg.europe, description: 'the heart of Spain' },
  { slug: 'rome', name: 'Rome', state: 'Lazio', country: 'Italy', heroImage: heroImg.europe, description: 'the Eternal City' },
  { slug: 'milan', name: 'Milan', state: 'Lombardy', country: 'Italy', heroImage: heroImg.europe, description: 'the fashion and design capital' },
  { slug: 'lisbon', name: 'Lisbon', state: 'Lisbon', country: 'Portugal', heroImage: heroImg.europe, description: 'the city of seven hills' },
  { slug: 'vienna', name: 'Vienna', state: 'Vienna', country: 'Austria', heroImage: heroImg.europe, description: 'the city of music and thermal baths' },
  { slug: 'prague', name: 'Prague', state: 'Prague', country: 'Czech Republic', heroImage: heroImg.europe, description: 'the City of a Hundred Spires' },
  { slug: 'dublin', name: 'Dublin', state: 'Leinster', country: 'Ireland', heroImage: heroImg.europe, description: 'the Fair City' },
  { slug: 'stockholm', name: 'Stockholm', state: 'Stockholm', country: 'Sweden', heroImage: heroImg.europe, description: 'the Venice of the North and wellness capital' },
  { slug: 'copenhagen', name: 'Copenhagen', state: 'Capital Region', country: 'Denmark', heroImage: heroImg.europe, description: 'the happiest city in the world' },
  { slug: 'helsinki', name: 'Helsinki', state: 'Uusimaa', country: 'Finland', heroImage: heroImg.europe, description: 'the sauna capital of the world' },
  { slug: 'oslo', name: 'Oslo', state: 'Oslo', country: 'Norway', heroImage: heroImg.europe, description: 'the Tiger City' },
  { slug: 'zurich', name: 'Zurich', state: 'Zurich', country: 'Switzerland', heroImage: heroImg.europe, description: 'the financial and wellness capital of Switzerland' },
  { slug: 'geneva', name: 'Geneva', state: 'Geneva', country: 'Switzerland', heroImage: heroImg.europe, description: 'the city of peace and luxury spas' },
  { slug: 'munich', name: 'Munich', state: 'Bavaria', country: 'Germany', heroImage: heroImg.europe, description: 'the capital of Bavaria' },
  { slug: 'hamburg', name: 'Hamburg', state: 'Hamburg', country: 'Germany', heroImage: heroImg.europe, description: 'the Gateway to the World' },
  { slug: 'frankfurt', name: 'Frankfurt', state: 'Hesse', country: 'Germany', heroImage: heroImg.europe, description: 'the financial heart of Europe' },
  { slug: 'brussels', name: 'Brussels', state: 'Brussels', country: 'Belgium', heroImage: heroImg.europe, description: 'the capital of Europe' },
  { slug: 'warsaw', name: 'Warsaw', state: 'Masovia', country: 'Poland', heroImage: heroImg.europe, description: 'the Phoenix City' },
  { slug: 'krakow', name: 'Krakow', state: 'Lesser Poland', country: 'Poland', heroImage: heroImg.europe, description: 'the cultural gem of Poland' },
  { slug: 'budapest', name: 'Budapest', state: 'Budapest', country: 'Hungary', heroImage: heroImg.europe, description: 'the City of Spas and thermal baths' },
  { slug: 'athens', name: 'Athens', state: 'Attica', country: 'Greece', heroImage: heroImg.europe, description: 'the cradle of Western civilisation' },
  { slug: 'florence', name: 'Florence', state: 'Tuscany', country: 'Italy', heroImage: heroImg.europe, description: 'the cradle of the Renaissance' },
  { slug: 'nice', name: 'Nice', state: 'Provence', country: 'France', heroImage: heroImg.europe, description: 'the jewel of the French Riviera' },
  { slug: 'lyon', name: 'Lyon', state: 'Auvergne-Rhône-Alpes', country: 'France', heroImage: heroImg.europe, description: 'the gastronomic capital of France' },
  { slug: 'seville', name: 'Seville', state: 'Andalusia', country: 'Spain', heroImage: heroImg.europe, description: 'the heart of Andalusia' },
  { slug: 'valencia', name: 'Valencia', state: 'Valencia', country: 'Spain', heroImage: heroImg.europe, description: 'the city of arts and sciences' },
  { slug: 'porto', name: 'Porto', state: 'Norte', country: 'Portugal', heroImage: heroImg.europe, description: 'the Invicta City' },
  { slug: 'antwerp', name: 'Antwerp', state: 'Flanders', country: 'Belgium', heroImage: heroImg.europe, description: 'the Diamond Capital' },
  { slug: 'rotterdam', name: 'Rotterdam', state: 'South Holland', country: 'Netherlands', heroImage: heroImg.europe, description: 'the architecture capital of Europe' },
  { slug: 'naples', name: 'Naples', state: 'Campania', country: 'Italy', heroImage: heroImg.europe, description: 'the soul of southern Italy' },
  { slug: 'turin', name: 'Turin', state: 'Piedmont', country: 'Italy', heroImage: heroImg.europe, description: 'the elegant capital of Piedmont' },
  { slug: 'malaga', name: 'Malaga', state: 'Andalusia', country: 'Spain', heroImage: heroImg.europe, description: 'the Costa del Sol gateway' },
  { slug: 'dusseldorf', name: 'Düsseldorf', state: 'North Rhine-Westphalia', country: 'Germany', heroImage: heroImg.europe, description: 'the fashion city on the Rhine' },
  { slug: 'cologne', name: 'Cologne', state: 'North Rhine-Westphalia', country: 'Germany', heroImage: heroImg.europe, description: 'the cathedral city on the Rhine' },
  { slug: 'bucharest', name: 'Bucharest', state: 'Bucharest', country: 'Romania', heroImage: heroImg.europe, description: 'the Little Paris of the East' },
  { slug: 'tallinn', name: 'Tallinn', state: 'Harju', country: 'Estonia', heroImage: heroImg.europe, description: 'the digital capital of Europe' },

  // ===== ASIA (30 cities) =====
  { slug: 'singapore', name: 'Singapore', state: 'Singapore', country: 'Singapore', heroImage: heroImg.asia, description: 'the Lion City and wellness hub of Southeast Asia' },
  { slug: 'tokyo', name: 'Tokyo', state: 'Tokyo', country: 'Japan', heroImage: heroImg.asia, description: 'the world\'s most dynamic metropolis' },
  { slug: 'osaka', name: 'Osaka', state: 'Osaka', country: 'Japan', heroImage: heroImg.asia, description: 'Japan\'s kitchen and onsen paradise' },
  { slug: 'seoul', name: 'Seoul', state: 'Seoul', country: 'South Korea', heroImage: heroImg.asia, description: 'the K-wellness capital' },
  { slug: 'bangkok', name: 'Bangkok', state: 'Bangkok', country: 'Thailand', heroImage: heroImg.asia, description: 'the City of Angels and world-famous Thai spas' },
  { slug: 'kuala-lumpur', name: 'Kuala Lumpur', state: 'Federal Territory', country: 'Malaysia', heroImage: heroImg.asia, description: 'the Garden City of Lights' },
  { slug: 'hong-kong', name: 'Hong Kong', state: 'Hong Kong', country: 'China', heroImage: heroImg.asia, description: 'Asia\'s world city' },
  { slug: 'shanghai', name: 'Shanghai', state: 'Shanghai', country: 'China', heroImage: heroImg.asia, description: 'the Pearl of the Orient' },
  { slug: 'beijing', name: 'Beijing', state: 'Beijing', country: 'China', heroImage: heroImg.asia, description: 'the ancient capital of China' },
  { slug: 'taipei', name: 'Taipei', state: 'Taiwan', country: 'Taiwan', heroImage: heroImg.asia, description: 'the hot springs capital of East Asia' },
  { slug: 'bali', name: 'Bali', state: 'Bali', country: 'Indonesia', heroImage: heroImg.asia, description: 'the Island of the Gods and yoga retreat capital' },
  { slug: 'jakarta', name: 'Jakarta', state: 'Jakarta', country: 'Indonesia', heroImage: heroImg.asia, description: 'the Big Durian' },
  { slug: 'manila', name: 'Manila', state: 'Metro Manila', country: 'Philippines', heroImage: heroImg.asia, description: 'the Pearl of the Orient Seas' },
  { slug: 'ho-chi-minh-city', name: 'Ho Chi Minh City', state: 'Ho Chi Minh', country: 'Vietnam', heroImage: heroImg.asia, description: 'the dynamic economic hub of Vietnam' },
  { slug: 'hanoi', name: 'Hanoi', state: 'Hanoi', country: 'Vietnam', heroImage: heroImg.asia, description: 'the charming capital of Vietnam' },
  { slug: 'colombo', name: 'Colombo', state: 'Western Province', country: 'Sri Lanka', heroImage: heroImg.asia, description: 'the commercial capital of Sri Lanka' },
  { slug: 'kathmandu', name: 'Kathmandu', state: 'Bagmati', country: 'Nepal', heroImage: heroImg.asia, description: 'the gateway to the Himalayas and yoga retreats' },
  { slug: 'dhaka', name: 'Dhaka', state: 'Dhaka', country: 'Bangladesh', heroImage: heroImg.asia, description: 'the city of mosques' },
  { slug: 'phuket', name: 'Phuket', state: 'Phuket', country: 'Thailand', heroImage: heroImg.asia, description: 'the Pearl of the Andaman and wellness island' },
  { slug: 'chiang-mai', name: 'Chiang Mai', state: 'Chiang Mai', country: 'Thailand', heroImage: heroImg.asia, description: 'the Rose of the North and meditation retreat hub' },
  { slug: 'penang', name: 'Penang', state: 'Penang', country: 'Malaysia', heroImage: heroImg.asia, description: 'the Pearl of the Orient' },
  { slug: 'kyoto', name: 'Kyoto', state: 'Kyoto', country: 'Japan', heroImage: heroImg.asia, description: 'the cultural heart of Japan' },
  { slug: 'cebu', name: 'Cebu', state: 'Central Visayas', country: 'Philippines', heroImage: heroImg.asia, description: 'the Queen City of the South' },
  { slug: 'muscat', name: 'Muscat', state: 'Muscat', country: 'Oman', heroImage: heroImg.uae, description: 'the jewel of the Arabian Peninsula' },
  { slug: 'doha', name: 'Doha', state: 'Doha', country: 'Qatar', heroImage: heroImg.uae, description: 'the Pearl of the Gulf' },
  { slug: 'riyadh', name: 'Riyadh', state: 'Riyadh', country: 'Saudi Arabia', heroImage: heroImg.uae, description: 'the capital of Saudi Arabia' },
  { slug: 'jeddah', name: 'Jeddah', state: 'Makkah', country: 'Saudi Arabia', heroImage: heroImg.uae, description: 'the gateway to Mecca and Red Sea coast' },
  { slug: 'amman', name: 'Amman', state: 'Amman', country: 'Jordan', heroImage: heroImg.uae, description: 'the White City' },
  { slug: 'tel-aviv', name: 'Tel Aviv', state: 'Tel Aviv', country: 'Israel', heroImage: heroImg.uae, description: 'the city that never stops' },
  { slug: 'tbilisi', name: 'Tbilisi', state: 'Tbilisi', country: 'Georgia', heroImage: heroImg.europe, description: 'the ancient spa city of sulphur baths' },

  // ===== LATIN AMERICA (15 cities) =====
  { slug: 'mexico-city', name: 'Mexico City', state: 'CDMX', country: 'Mexico', heroImage: heroImg.latam, description: 'the largest city in North America' },
  { slug: 'sao-paulo', name: 'São Paulo', state: 'São Paulo', country: 'Brazil', heroImage: heroImg.latam, description: 'the economic powerhouse of South America' },
  { slug: 'rio-de-janeiro', name: 'Rio de Janeiro', state: 'Rio de Janeiro', country: 'Brazil', heroImage: heroImg.latam, description: 'the Marvelous City of beaches and fitness culture' },
  { slug: 'buenos-aires', name: 'Buenos Aires', state: 'Buenos Aires', country: 'Argentina', heroImage: heroImg.latam, description: 'the Paris of South America' },
  { slug: 'bogota', name: 'Bogotá', state: 'Bogotá', country: 'Colombia', heroImage: heroImg.latam, description: 'the Athens of South America' },
  { slug: 'medellin', name: 'Medellín', state: 'Antioquia', country: 'Colombia', heroImage: heroImg.latam, description: 'the City of Eternal Spring' },
  { slug: 'lima', name: 'Lima', state: 'Lima', country: 'Peru', heroImage: heroImg.latam, description: 'the gastronomic capital of the Americas' },
  { slug: 'santiago', name: 'Santiago', state: 'Santiago', country: 'Chile', heroImage: heroImg.latam, description: 'the gateway to the Andes' },
  { slug: 'cancun', name: 'Cancún', state: 'Quintana Roo', country: 'Mexico', heroImage: heroImg.latam, description: 'the Caribbean wellness paradise' },
  { slug: 'tulum', name: 'Tulum', state: 'Quintana Roo', country: 'Mexico', heroImage: heroImg.latam, description: 'the boho yoga retreat destination' },
  { slug: 'playa-del-carmen', name: 'Playa del Carmen', state: 'Quintana Roo', country: 'Mexico', heroImage: heroImg.latam, description: 'the Riviera Maya gem' },
  { slug: 'cartagena', name: 'Cartagena', state: 'Bolívar', country: 'Colombia', heroImage: heroImg.latam, description: 'the Heroic City on the Caribbean' },
  { slug: 'montevideo', name: 'Montevideo', state: 'Montevideo', country: 'Uruguay', heroImage: heroImg.latam, description: 'the Paris of the South' },
  { slug: 'panama-city', name: 'Panama City', state: 'Panamá', country: 'Panama', heroImage: heroImg.latam, description: 'the Crossroads of the Americas' },
  { slug: 'costa-rica', name: 'San José', state: 'San José', country: 'Costa Rica', heroImage: heroImg.latam, description: 'the gateway to Pura Vida wellness' },

  // ===== AFRICA (10 cities) =====
  { slug: 'cape-town', name: 'Cape Town', state: 'Western Cape', country: 'South Africa', heroImage: heroImg.africa, description: 'the Mother City at the tip of Africa' },
  { slug: 'johannesburg', name: 'Johannesburg', state: 'Gauteng', country: 'South Africa', heroImage: heroImg.africa, description: 'the City of Gold' },
  { slug: 'nairobi', name: 'Nairobi', state: 'Nairobi', country: 'Kenya', heroImage: heroImg.africa, description: 'the Green City in the Sun' },
  { slug: 'lagos', name: 'Lagos', state: 'Lagos', country: 'Nigeria', heroImage: heroImg.africa, description: 'Africa\'s most vibrant megacity' },
  { slug: 'cairo', name: 'Cairo', state: 'Cairo', country: 'Egypt', heroImage: heroImg.africa, description: 'the City of a Thousand Minarets' },
  { slug: 'marrakech', name: 'Marrakech', state: 'Marrakech-Safi', country: 'Morocco', heroImage: heroImg.africa, description: 'the Red City of hammams and traditional spas' },
  { slug: 'casablanca', name: 'Casablanca', state: 'Casablanca-Settat', country: 'Morocco', heroImage: heroImg.africa, description: 'the White City by the Atlantic' },
  { slug: 'dar-es-salaam', name: 'Dar es Salaam', state: 'Dar es Salaam', country: 'Tanzania', heroImage: heroImg.africa, description: 'the Harbour of Peace' },
  { slug: 'accra', name: 'Accra', state: 'Greater Accra', country: 'Ghana', heroImage: heroImg.africa, description: 'the Gateway to West Africa' },
  { slug: 'addis-ababa', name: 'Addis Ababa', state: 'Addis Ababa', country: 'Ethiopia', heroImage: heroImg.africa, description: 'the diplomatic capital of Africa' },

  // ===== NEW ZEALAND (5 cities) =====
  { slug: 'auckland', name: 'Auckland', state: 'Auckland', country: 'New Zealand', heroImage: heroImg.australia, description: 'the City of Sails' },
  { slug: 'wellington', name: 'Wellington', state: 'Wellington', country: 'New Zealand', heroImage: heroImg.australia, description: 'the coolest little capital in the world' },
  { slug: 'christchurch', name: 'Christchurch', state: 'Canterbury', country: 'New Zealand', heroImage: heroImg.australia, description: 'the Garden City' },
  { slug: 'queenstown', name: 'Queenstown', state: 'Otago', country: 'New Zealand', heroImage: heroImg.australia, description: 'the adventure capital and spa retreat' },
  { slug: 'rotorua', name: 'Rotorua', state: 'Bay of Plenty', country: 'New Zealand', heroImage: heroImg.australia, description: 'the geothermal spa capital of New Zealand' },
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
export const generateFaqs = (categoryLabel: string, cityName: string, country?: string) => {
  const currencyHint = country && !['India'].includes(country) ? '' : ' (₹)';
  return [
    {
      question: `What are the best ${categoryLabel.toLowerCase()} in ${cityName}?`,
      answer: `GymSpaYoga lists the top-rated ${categoryLabel.toLowerCase()} in ${cityName} across Luxury, Premium, and Budget tiers. Browse verified listings with real photos, pricing, amenities, and user reviews to find the perfect fit for your wellness goals.`,
    },
    {
      question: `How much do ${categoryLabel.toLowerCase()} cost in ${cityName}?`,
      answer: `Prices for ${categoryLabel.toLowerCase()} in ${cityName} vary by tier and location. Browse our listings to compare pricing across Budget, Premium, and Luxury options${currencyHint}. Session-based pricing is also available at many centres.`,
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
      question: `Can I list my ${categoryLabel.toLowerCase().replace(/s$/, '')} in ${cityName} on GymSpaYoga?`,
      answer: `Absolutely! If you own a ${categoryLabel.toLowerCase().replace(/s$/, '')} in ${cityName}, you can register for free on GymSpaYoga and reach thousands of potential customers worldwide. Simply click "Register Your Business" to get started.`,
    },
  ];
};

// Generate long-form SEO content per city+category
export const generateSeoContent = (categoryLabel: string, cityName: string, cityDescription: string, country?: string) => {
  const cat = categoryLabel.toLowerCase();
  const locationLabel = country && country !== 'India' ? `${cityName}, ${country}` : cityName;
  return `
## Why Choose ${categoryLabel} in ${cityName}?

${cityName}, known as ${cityDescription}, is a thriving destination for wellness and fitness. Whether you're a fitness enthusiast, a working professional seeking stress relief, or someone starting their wellness journey, ${cityName} offers world-class ${cat} to suit every need and budget.

## What to Look for in ${categoryLabel} in ${locationLabel}

When choosing the right ${cat.replace(/s$/, '')} in ${cityName}, consider these factors:

- **Location & Accessibility** — Choose a centre close to your home or office for consistency.
- **Equipment & Facilities** — Look for modern equipment, clean changing rooms, and quality amenities.
- **Certified Trainers** — Professional guidance makes a huge difference in achieving your goals.
- **Pricing Transparency** — Compare monthly and session-based pricing across Budget, Premium, and Luxury tiers.
- **User Reviews** — Read genuine reviews from other members on GymSpaYoga.

## How GymSpaYoga Helps You Find the Best ${categoryLabel}

GymSpaYoga is the world's fastest-growing wellness discovery platform. We connect users with verified ${cat} across ${locationLabel} with:

- **No Commission Model** — Businesses pay a one-time registration fee only.
- **Direct Booking** — Connect directly via WhatsApp or our booking system.
- **Verified Listings** — Every listing goes through our verification process.
- **Real Reviews** — Genuine feedback from real users.
- **Global Coverage** — Find wellness services in 200+ cities worldwide.

## Popular Areas for ${categoryLabel} in ${cityName}

Explore ${cat} in popular neighbourhoods and localities across ${cityName}. Whether you're in the heart of the city or in the suburbs, GymSpaYoga has listings near you.
  `.trim();
};

// Helper: Get cities grouped by country
export const getCitiesByCountry = (): Record<string, CitySeoEntry[]> => {
  const grouped: Record<string, CitySeoEntry[]> = {};
  cities.forEach(city => {
    const country = city.country || 'India';
    if (!grouped[country]) grouped[country] = [];
    grouped[country].push(city);
  });
  return grouped;
};

// Helper: Get featured global cities for homepage
export const getFeaturedGlobalCities = (): CitySeoEntry[] => {
  const featuredSlugs = ['new-york', 'london', 'dubai', 'los-angeles', 'toronto', 'sydney', 'singapore', 'tokyo', 'paris', 'bali', 'mumbai', 'bangkok'];
  return featuredSlugs.map(slug => cities.find(c => c.slug === slug)).filter(Boolean) as CitySeoEntry[];
};
