// Comprehensive SEO Data for Programmatic Pages

export const INDIAN_CITIES = [
  { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', population: '20M+', tier: 1 },
  { name: 'Delhi', slug: 'delhi', state: 'Delhi NCR', population: '19M+', tier: 1 },
  { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', population: '12M+', tier: 1 },
  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', population: '10M+', tier: 1 },
  { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu', population: '11M+', tier: 1 },
  { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', population: '15M+', tier: 1 },
  { name: 'Pune', slug: 'pune', state: 'Maharashtra', population: '7M+', tier: 1 },
  { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat', population: '8M+', tier: 1 },
  { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', population: '4M+', tier: 2 },
  { name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh', population: '3M+', tier: 2 },
  { name: 'Chandigarh', slug: 'chandigarh', state: 'Punjab', population: '1M+', tier: 2 },
  { name: 'Kochi', slug: 'kochi', state: 'Kerala', population: '2M+', tier: 2 },
  { name: 'Indore', slug: 'indore', state: 'Madhya Pradesh', population: '2M+', tier: 2 },
  { name: 'Nagpur', slug: 'nagpur', state: 'Maharashtra', population: '3M+', tier: 2 },
  { name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu', population: '2M+', tier: 2 },
  { name: 'Surat', slug: 'surat', state: 'Gujarat', population: '6M+', tier: 2 },
  { name: 'Vadodara', slug: 'vadodara', state: 'Gujarat', population: '2M+', tier: 2 },
  { name: 'Bhopal', slug: 'bhopal', state: 'Madhya Pradesh', population: '2M+', tier: 2 },
  { name: 'Visakhapatnam', slug: 'visakhapatnam', state: 'Andhra Pradesh', population: '2M+', tier: 2 },
  { name: 'Goa', slug: 'goa', state: 'Goa', population: '1M+', tier: 2 },
  { name: 'Noida', slug: 'noida', state: 'Uttar Pradesh', population: '1M+', tier: 2 },
  { name: 'Gurgaon', slug: 'gurgaon', state: 'Haryana', population: '2M+', tier: 2 },
  { name: 'Mysore', slug: 'mysore', state: 'Karnataka', population: '1M+', tier: 2 },
  { name: 'Thiruvananthapuram', slug: 'thiruvananthapuram', state: 'Kerala', population: '1M+', tier: 2 },
];

export const CITY_AREAS: Record<string, Array<{ name: string; slug: string; popular: boolean }>> = {
  mumbai: [
    { name: 'Andheri', slug: 'andheri', popular: true },
    { name: 'Bandra', slug: 'bandra', popular: true },
    { name: 'Powai', slug: 'powai', popular: true },
    { name: 'Juhu', slug: 'juhu', popular: true },
    { name: 'Lower Parel', slug: 'lower-parel', popular: true },
    { name: 'Malad', slug: 'malad', popular: false },
    { name: 'Goregaon', slug: 'goregaon', popular: false },
    { name: 'Borivali', slug: 'borivali', popular: false },
    { name: 'Thane', slug: 'thane', popular: true },
    { name: 'Vashi', slug: 'vashi', popular: true },
    { name: 'Worli', slug: 'worli', popular: false },
    { name: 'Dadar', slug: 'dadar', popular: false },
  ],
  delhi: [
    { name: 'Connaught Place', slug: 'connaught-place', popular: true },
    { name: 'South Delhi', slug: 'south-delhi', popular: true },
    { name: 'Hauz Khas', slug: 'hauz-khas', popular: true },
    { name: 'Greater Kailash', slug: 'greater-kailash', popular: true },
    { name: 'Dwarka', slug: 'dwarka', popular: false },
    { name: 'Rohini', slug: 'rohini', popular: false },
    { name: 'Vasant Kunj', slug: 'vasant-kunj', popular: true },
    { name: 'Lajpat Nagar', slug: 'lajpat-nagar', popular: false },
    { name: 'Saket', slug: 'saket', popular: true },
    { name: 'Rajouri Garden', slug: 'rajouri-garden', popular: false },
  ],
  bangalore: [
    { name: 'Koramangala', slug: 'koramangala', popular: true },
    { name: 'Indiranagar', slug: 'indiranagar', popular: true },
    { name: 'HSR Layout', slug: 'hsr-layout', popular: true },
    { name: 'Whitefield', slug: 'whitefield', popular: true },
    { name: 'Electronic City', slug: 'electronic-city', popular: true },
    { name: 'Jayanagar', slug: 'jayanagar', popular: false },
    { name: 'Marathahalli', slug: 'marathahalli', popular: false },
    { name: 'JP Nagar', slug: 'jp-nagar', popular: false },
    { name: 'Malleshwaram', slug: 'malleshwaram', popular: false },
    { name: 'BTM Layout', slug: 'btm-layout', popular: true },
  ],
  hyderabad: [
    { name: 'Banjara Hills', slug: 'banjara-hills', popular: true },
    { name: 'Jubilee Hills', slug: 'jubilee-hills', popular: true },
    { name: 'HITEC City', slug: 'hitec-city', popular: true },
    { name: 'Gachibowli', slug: 'gachibowli', popular: true },
    { name: 'Madhapur', slug: 'madhapur', popular: true },
    { name: 'Kondapur', slug: 'kondapur', popular: false },
    { name: 'Kukatpally', slug: 'kukatpally', popular: false },
    { name: 'Secunderabad', slug: 'secunderabad', popular: false },
  ],
  pune: [
    { name: 'Koregaon Park', slug: 'koregaon-park', popular: true },
    { name: 'Viman Nagar', slug: 'viman-nagar', popular: true },
    { name: 'Baner', slug: 'baner', popular: true },
    { name: 'Aundh', slug: 'aundh', popular: true },
    { name: 'Kothrud', slug: 'kothrud', popular: true },
    { name: 'Hinjewadi', slug: 'hinjewadi', popular: true },
    { name: 'Wakad', slug: 'wakad', popular: false },
    { name: 'Hadapsar', slug: 'hadapsar', popular: false },
  ],
  chennai: [
    { name: 'T Nagar', slug: 't-nagar', popular: true },
    { name: 'Anna Nagar', slug: 'anna-nagar', popular: true },
    { name: 'Adyar', slug: 'adyar', popular: true },
    { name: 'Velachery', slug: 'velachery', popular: true },
    { name: 'OMR', slug: 'omr', popular: true },
    { name: 'Porur', slug: 'porur', popular: false },
    { name: 'Mylapore', slug: 'mylapore', popular: false },
  ],
  kolkata: [
    { name: 'Salt Lake', slug: 'salt-lake', popular: true },
    { name: 'Park Street', slug: 'park-street', popular: true },
    { name: 'New Town', slug: 'new-town', popular: true },
    { name: 'Ballygunge', slug: 'ballygunge', popular: true },
    { name: 'Alipore', slug: 'alipore', popular: false },
    { name: 'Rajarhat', slug: 'rajarhat', popular: false },
  ],
  ahmedabad: [
    { name: 'SG Highway', slug: 'sg-highway', popular: true },
    { name: 'Satellite', slug: 'satellite', popular: true },
    { name: 'Prahlad Nagar', slug: 'prahlad-nagar', popular: true },
    { name: 'Vastrapur', slug: 'vastrapur', popular: false },
    { name: 'Bodakdev', slug: 'bodakdev', popular: false },
  ],
};

export const SERVICE_CATEGORIES = [
  { 
    name: 'Gyms', 
    slug: 'gyms', 
    singular: 'Gym',
    icon: '🏋️',
    color: '#005EB8',
    description: 'Find premium fitness centers with modern equipment and expert trainers',
    services: ['Weight Training', 'Cardio', 'CrossFit', 'Personal Training', 'Group Classes']
  },
  { 
    name: 'Spas', 
    slug: 'spas', 
    singular: 'Spa',
    icon: '💆',
    color: '#8B5CF6',
    description: 'Discover luxury spas offering massage therapy and wellness treatments',
    services: ['Swedish Massage', 'Thai Massage', 'Aromatherapy', 'Body Wraps', 'Facials']
  },
  { 
    name: 'Yoga Studios', 
    slug: 'yoga', 
    singular: 'Yoga Studio',
    icon: '🧘',
    color: '#10B981',
    description: 'Explore yoga studios for classes from beginners to advanced practitioners',
    services: ['Hatha Yoga', 'Vinyasa Yoga', 'Power Yoga', 'Prenatal Yoga', 'Meditation']
  },
  { 
    name: 'Personal Trainers', 
    slug: 'trainers', 
    singular: 'Personal Trainer',
    icon: '💪',
    color: '#F59E0B',
    description: 'Connect with certified personal trainers for customized fitness programs',
    services: ['Weight Loss', 'Muscle Building', 'Functional Training', 'Sports Training', 'Rehabilitation']
  },
  { 
    name: 'Therapists', 
    slug: 'therapists', 
    singular: 'Therapist',
    icon: '🌿',
    color: '#EC4899',
    description: 'Find wellness therapists specializing in holistic treatments and healing',
    services: ['Physiotherapy', 'Acupuncture', 'Ayurveda', 'Naturopathy', 'Chiropractic']
  },
];

export const KEYWORD_CLUSTERS = {
  gyms: {
    primary: ['gym near me', 'fitness center', 'best gym', 'gym membership'],
    nearMe: ['gym near me', '24 hour gym near me', 'gym with pool near me', 'crossfit gym near me'],
    commercial: ['gym membership cost', 'cheap gym near me', 'affordable gym', 'gym monthly fees'],
    types: ['women gym', 'unisex gym', 'crossfit gym', 'bodybuilding gym', 'luxury gym'],
    amenities: ['gym with steam room', 'gym with sauna', 'gym with personal trainer', 'gym with pool'],
  },
  spas: {
    primary: ['spa near me', 'massage center', 'best spa', 'body massage'],
    nearMe: ['spa near me', 'massage parlour near me', 'body massage near me', 'thai massage near me'],
    commercial: ['spa prices', 'massage cost', 'affordable spa', 'spa packages'],
    types: ['ayurvedic spa', 'thai spa', 'luxury spa', 'couples spa', 'day spa'],
    services: ['deep tissue massage', 'swedish massage', 'aromatherapy massage', 'hot stone massage'],
  },
  yoga: {
    primary: ['yoga classes near me', 'yoga studio', 'best yoga', 'yoga center'],
    nearMe: ['yoga near me', 'yoga classes near me', 'yoga studio near me', 'meditation center near me'],
    commercial: ['yoga class fees', 'yoga membership', 'affordable yoga classes', 'yoga packages'],
    types: ['hatha yoga', 'power yoga', 'hot yoga', 'prenatal yoga', 'vinyasa yoga'],
    goals: ['yoga for weight loss', 'yoga for beginners', 'yoga for back pain', 'yoga for flexibility'],
  },
  trainers: {
    primary: ['personal trainer near me', 'fitness trainer', 'gym trainer', 'home trainer'],
    nearMe: ['personal trainer near me', 'fitness coach near me', 'home trainer near me'],
    commercial: ['personal trainer cost', 'trainer fees', 'affordable personal trainer'],
    types: ['female personal trainer', 'online fitness coach', 'weight loss trainer', 'bodybuilding coach'],
    specialties: ['weight loss trainer', 'muscle building trainer', 'zumba instructor', 'pilates instructor'],
  },
  therapists: {
    primary: ['therapist near me', 'physiotherapist', 'wellness therapist', 'massage therapist'],
    nearMe: ['physiotherapist near me', 'massage therapist near me', 'wellness center near me'],
    commercial: ['therapy cost', 'physiotherapy fees', 'affordable therapy'],
    types: ['sports physiotherapist', 'ayurvedic therapist', 'acupuncture therapist', 'chiropractor'],
    conditions: ['back pain treatment', 'sports injury therapy', 'stress relief therapy', 'pain management'],
  },
};

export const SEO_FAQS = {
  gyms: [
    { question: 'What is the average gym membership cost in {city}?', answer: 'Gym memberships in {city} range from ₹1,000 to ₹10,000 per month depending on facilities. Budget gyms start at ₹1,000-2,000, premium gyms at ₹3,000-5,000, and luxury fitness centers at ₹5,000-10,000+.' },
    { question: 'What should I look for in a good gym?', answer: 'Look for modern equipment, qualified trainers, cleanliness, convenient location, flexible timing, proper ventilation, and amenities like locker rooms and showers. Check reviews and take a trial session before committing.' },
    { question: 'Are gyms in {city} open 24 hours?', answer: 'Many premium gyms in {city} offer 24/7 access. Check individual gym timings on GymSpaYoga to find gyms that match your schedule.' },
    { question: 'Can I get a personal trainer at these gyms?', answer: 'Yes, most gyms listed on GymSpaYoga offer personal training services. You can also hire independent personal trainers through our platform.' },
  ],
  spas: [
    { question: 'What is the average spa massage cost in {city}?', answer: 'Spa massage prices in {city} typically range from ₹1,000 to ₹5,000 per session. Basic massages start at ₹1,000-1,500, while premium treatments like aromatherapy cost ₹2,500-5,000.' },
    { question: 'What types of massages are available at spas in {city}?', answer: 'Spas in {city} offer Swedish massage, Thai massage, deep tissue massage, aromatherapy, hot stone massage, Ayurvedic treatments, and more. Check individual spa listings for available services.' },
    { question: 'Are spa services safe for everyone?', answer: 'Most spa treatments are safe, but consult with the spa therapist about any health conditions, pregnancy, or allergies before your session.' },
    { question: 'Should I book spa appointments in advance?', answer: 'Yes, booking in advance is recommended, especially on weekends. Use GymSpaYoga to easily book appointments at your preferred spa.' },
  ],
  yoga: [
    { question: 'What is the average yoga class fee in {city}?', answer: 'Yoga class fees in {city} range from ₹500 to ₹3,000 per month. Drop-in classes cost ₹200-500 per session, while monthly unlimited packages range from ₹2,000-5,000.' },
    { question: 'Which type of yoga is best for beginners?', answer: 'Hatha yoga is ideal for beginners as it focuses on basic postures and breathing. Many studios in {city} offer special beginner-friendly classes.' },
    { question: 'Can I do yoga for weight loss?', answer: 'Yes, Power Yoga, Vinyasa, and Hot Yoga are effective for weight loss. These dynamic styles burn more calories while building strength and flexibility.' },
    { question: 'What should I bring to a yoga class?', answer: 'Bring comfortable clothing, a yoga mat (most studios provide), water bottle, and a small towel. Avoid eating heavy meals before class.' },
  ],
  trainers: [
    { question: 'How much does a personal trainer cost in {city}?', answer: 'Personal trainer fees in {city} range from ₹1,000 to ₹5,000 per session. Monthly packages with multiple sessions cost ₹10,000-30,000 depending on experience and specialization.' },
    { question: 'What qualifications should a personal trainer have?', answer: 'Look for trainers with certifications from recognized bodies like ACE, ACSM, NSCA, or Indian fitness certifications. Experience and client reviews are also important indicators.' },
    { question: 'Can personal trainers come to my home?', answer: 'Yes, many trainers on GymSpaYoga offer home training services. Filter by "Home Training" to find trainers who provide this service in {city}.' },
    { question: 'How often should I train with a personal trainer?', answer: 'For best results, 2-3 sessions per week with a trainer is recommended. This allows for proper recovery while maintaining consistent progress toward your fitness goals.' },
  ],
  therapists: [
    { question: 'What is the cost of physiotherapy in {city}?', answer: 'Physiotherapy sessions in {city} typically cost ₹500-2,000 per session. Package deals for multiple sessions offer better value at ₹5,000-15,000 for 10 sessions.' },
    { question: 'When should I see a physiotherapist?', answer: 'See a physiotherapist for sports injuries, back or neck pain, post-surgery rehabilitation, chronic pain, mobility issues, or preventive care for active lifestyles.' },
    { question: 'What is the difference between a physiotherapist and massage therapist?', answer: 'Physiotherapists are medical professionals treating injuries and conditions through exercise and manual therapy. Massage therapists focus on relaxation and muscle tension relief.' },
    { question: 'How many therapy sessions will I need?', answer: 'Treatment duration varies by condition. Acute injuries may need 4-6 sessions, while chronic conditions may require 10-20 sessions. Your therapist will create a personalized treatment plan.' },
  ],
};

// Blog SEO Templates
export const BLOG_TEMPLATES = {
  cityGuide: {
    titleTemplate: 'Best {category} in {city} - Top {count} Rated {year} | GymSpaYoga',
    descriptionTemplate: 'Discover the best {category} in {city}. Compare prices, read reviews, and book online. Expert-curated list of top {count} {category} with photos and contact details.',
    h1Template: 'Best {category} in {city} ({year} Updated List)',
    keywords: ['{category} in {city}', 'best {category} {city}', 'top {category} near me', '{city} {category} list'],
  },
  howTo: {
    titleTemplate: 'How to {action} - Complete Guide {year} | GymSpaYoga',
    descriptionTemplate: 'Learn how to {action} with our comprehensive guide. Expert tips, step-by-step instructions, and pro advice for {topic}.',
    h1Template: 'How to {action}: Complete Guide',
    keywords: ['how to {action}', '{topic} guide', '{topic} tips', '{action} for beginners'],
  },
  comparison: {
    titleTemplate: '{item1} vs {item2} - Which is Better? | GymSpaYoga',
    descriptionTemplate: 'Compare {item1} and {item2}. Detailed comparison of features, prices, and benefits to help you make the right choice.',
    h1Template: '{item1} vs {item2}: Complete Comparison',
    keywords: ['{item1} vs {item2}', '{item1} or {item2}', 'compare {item1} {item2}'],
  },
  benefits: {
    titleTemplate: '{count} Benefits of {topic} You Need to Know | GymSpaYoga',
    descriptionTemplate: 'Discover the amazing benefits of {topic}. Science-backed reasons why {topic} can improve your health and wellness.',
    h1Template: '{count} Amazing Benefits of {topic}',
    keywords: ['benefits of {topic}', '{topic} advantages', 'why {topic} is good', '{topic} health benefits'],
  },
};

// Internal Linking Structure
export const INTERNAL_LINK_STRUCTURE = {
  gyms: {
    relatedCategories: ['trainers', 'yoga'],
    relatedServices: ['personal-training', 'weight-loss', 'crossfit'],
    blogTopics: ['gym-tips', 'workout-guides', 'fitness-nutrition'],
  },
  spas: {
    relatedCategories: ['therapists', 'yoga'],
    relatedServices: ['massage-therapy', 'aromatherapy', 'body-treatments'],
    blogTopics: ['spa-tips', 'relaxation-guides', 'wellness-advice'],
  },
  yoga: {
    relatedCategories: ['trainers', 'spas'],
    relatedServices: ['meditation', 'prenatal-yoga', 'power-yoga'],
    blogTopics: ['yoga-poses', 'meditation-tips', 'breathing-exercises'],
  },
  trainers: {
    relatedCategories: ['gyms', 'yoga'],
    relatedServices: ['weight-loss', 'muscle-building', 'home-training'],
    blogTopics: ['training-tips', 'fitness-goals', 'workout-plans'],
  },
  therapists: {
    relatedCategories: ['spas', 'yoga'],
    relatedServices: ['physiotherapy', 'acupuncture', 'ayurveda'],
    blogTopics: ['pain-management', 'injury-prevention', 'holistic-health'],
  },
};
