
export const getTierFromPricing = (business: { monthly_price?: number; session_price?: number }) => {
  const price = business.monthly_price || business.session_price || 0;
  
  if (business.monthly_price) {
    if (business.monthly_price >= 5000) return 'luxury';
    if (business.monthly_price >= 3000) return 'premium';
    return 'budget';
  }
  
  if (business.session_price) {
    if (business.session_price >= 2000) return 'luxury';
    if (business.session_price >= 1000) return 'premium';
    return 'budget';
  }
  
  return 'budget';
};

export const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'luxury': return '👑';
    case 'premium': return '✨';
    default: return '💚';
  }
};

export const getTierColor = (tier: string) => {
  switch (tier) {
    case 'luxury': return 'from-yellow-500 to-orange-500';
    case 'premium': return 'from-purple-500 to-pink-500';
    default: return 'from-green-500 to-blue-500';
  }
};

export const formatPrice = (price: number, type: 'monthly' | 'session') => {
  return `₹${price.toLocaleString()}/${type}`;
};

export const calculatePlatformFee = (bookingAmount: number) => {
  return 20; // Fixed ₹20 platform fee
};
