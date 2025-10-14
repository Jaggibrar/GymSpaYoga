/**
 * Image SEO and optimization utilities
 */

export const generateImageAlt = (
  name: string, 
  type: string, 
  category?: string,
  location?: string
): string => {
  const parts = [name];
  if (category) parts.push(category);
  parts.push(type);
  if (location) parts.push(`in ${location}`);
  parts.push('- Book Now on GymSpaYoga');
  return parts.join(' ');
};

export const getImageLoadingStrategy = (index: number): 'eager' | 'lazy' => {
  // Load first 2 images immediately (above the fold)
  return index < 2 ? 'eager' : 'lazy';
};

export const getImageFetchPriority = (index: number): 'high' | 'low' | 'auto' => {
  // First image should be high priority (LCP)
  return index === 0 ? 'high' : 'auto';
};

export const generateImageSrcSet = (url: string, widths: number[]): string => {
  // Generate srcset for responsive images
  return widths.map(width => `${url}?w=${width} ${width}w`).join(', ');
};

export const generateImageSizes = (breakpoints?: { sm?: string; md?: string; lg?: string }): string => {
  // Generate sizes attribute for responsive images
  if (!breakpoints) {
    return '100vw';
  }
  
  const sizes = [];
  if (breakpoints.sm) sizes.push(`(max-width: 640px) ${breakpoints.sm}`);
  if (breakpoints.md) sizes.push(`(max-width: 768px) ${breakpoints.md}`);
  if (breakpoints.lg) sizes.push(`(max-width: 1024px) ${breakpoints.lg}`);
  sizes.push('100vw');
  
  return sizes.join(', ');
};
