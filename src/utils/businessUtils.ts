
export const getTierFromPricing = (business: any): string => {
  const monthlyPrice = business.monthly_price;
  const sessionPrice = business.session_price;

  if (monthlyPrice) {
    if (monthlyPrice >= 5000) return 'luxury';
    if (monthlyPrice >= 3000) return 'premium';
    return 'budget';
  }

  if (sessionPrice) {
    if (sessionPrice >= 2000) return 'luxury';
    if (sessionPrice >= 1000) return 'premium';
    return 'budget';
  }

  return 'budget';
};

export const getTierColor = (tier: string): string => {
  switch (tier) {
    case 'luxury':
      return 'from-purple-500 to-pink-500';
    case 'premium':
      return 'from-blue-500 to-indigo-500';
    case 'budget':
    default:
      return 'from-green-500 to-emerald-500';
  }
};

export const getTierIcon = (tier: string) => {
  // This function can be used for tier-specific icons if needed
  return null;
};
