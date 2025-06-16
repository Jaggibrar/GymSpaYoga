
export const getTierFromPricing = (business: any) => {
  const price = business.monthly_price || business.session_price || 0;
  if (price >= 5000) return 'luxury';
  if (price >= 3000) return 'premium';
  return 'budget';
};

export const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'luxury': return '👑';
    case 'premium': return '💎';
    default: return '💰';
  }
};

export const getTierColor = (tier: string) => {
  switch (tier) {
    case 'luxury': return "from-yellow-500 to-yellow-600";
    case 'premium': return "from-blue-500 to-blue-600";
    default: return "from-green-500 to-green-600";
  }
};
