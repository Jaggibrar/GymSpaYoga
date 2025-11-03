import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Dumbbell, Waves, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchSuggestion {
  id: string;
  name: string;
  type: 'business' | 'location' | 'category';
  category?: string;
  location?: string;
}

interface SearchWithAutocompleteProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchWithAutocomplete: React.FC<SearchWithAutocompleteProps> = ({
  placeholder = "Search gyms, spas, yoga studios...",
  className = "",
  onSearch
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            handleSuggestionClick(suggestions[selectedIndex]);
          } else {
            handleSearch();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedIndex, suggestions]);

  // Fetch suggestions
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const { data, error } = await supabase
        .from('public_business_listings')
        .select('id, business_name, business_type, category, city, state')
        .or(`business_name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
        .limit(8);

      if (error) throw error;

      const businessSuggestions: SearchSuggestion[] = data?.map(business => ({
        id: business.id,
        name: business.business_name,
        type: 'business' as const,
        category: business.business_type,
        location: `${business.city}, ${business.state}`
      })) || [];

      // Add category suggestions
      const categories = ['gym', 'spa', 'yoga'];
      const categorySuggestions: SearchSuggestion[] = categories
        .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(cat => ({
          id: cat,
          name: cat.charAt(0).toUpperCase() + cat.slice(1) + 's',
          type: 'category' as const
        }));

      // Add unique location suggestions
      const locations = [...new Set(data?.map(b => `${b.city}, ${b.state}`) || [])];
      const locationSuggestions: SearchSuggestion[] = locations
        .filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3)
        .map(loc => ({
          id: loc,
          name: loc,
          type: 'location' as const
        }));

      setSuggestions([...categorySuggestions, ...businessSuggestions, ...locationSuggestions]);
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name);
    setIsOpen(false);

    switch (suggestion.type) {
      case 'category':
        navigate(`/${suggestion.id.toLowerCase()}`);
        break;
      case 'business':
        navigate(`/explore?business=${suggestion.id}`);
        break;
      case 'location':
        navigate(`/explore?location=${encodeURIComponent(suggestion.name)}`);
        break;
    }

    onSearch?.(suggestion.name);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      onSearch?.(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: string, category?: string) => {
    switch (type) {
      case 'location':
        return <MapPin className="h-4 w-4 text-gray-400" />;
      case 'category':
        return category === 'gym' ? <Dumbbell className="h-4 w-4 text-orange-500" /> :
               category === 'spa' ? <Waves className="h-4 w-4 text-blue-500" /> :
               <Heart className="h-4 w-4 text-green-500" />;
      default:
        return category === 'gym' ? <Dumbbell className="h-4 w-4 text-orange-500" /> :
               category === 'spa' ? <Waves className="h-4 w-4 text-blue-500" /> :
               <Heart className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="pl-10 pr-10 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[48px]"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
          aria-autocomplete="list"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.id}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                flex items-center px-4 py-3 cursor-pointer transition-colors min-h-[48px]
                ${index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'}
                ${index === suggestions.length - 1 ? '' : 'border-b border-gray-100'}
              `}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <div className="mr-3">
                {getSuggestionIcon(suggestion.type, suggestion.category)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {suggestion.name}
                </div>
                {suggestion.location && (
                  <div className="text-xs text-gray-500">
                    {suggestion.location}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-400 capitalize">
                {suggestion.type}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchWithAutocomplete;