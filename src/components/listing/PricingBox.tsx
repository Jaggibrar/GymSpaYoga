import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionHeader from './SectionHeader';
import { CreditCard, Crown } from 'lucide-react';

interface PricingOption {
  type: 'session' | 'monthly' | 'quarterly' | 'yearly' | 'hourly' | 'custom';
  price?: number;
  title: string;
  duration: string;
  description: string;
  isPopular?: boolean;
  features?: string[];
}

interface PricingBoxProps {
  options: PricingOption[];
  title?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

const PricingBox: React.FC<PricingBoxProps> = ({
  options,
  title = "Pricing Options",
  icon = <CreditCard className="h-5 w-5 text-white" />,
  gradient = "from-primary to-primary/80"
}) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <SectionHeader
          icon={icon}
          title={title}
          gradient={gradient}
        />
        <div className="space-y-4">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`relative p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                option.isPopular 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              {option.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 font-bold">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.duration}</p>
                </div>
                <div className="text-right">
                  {option.price ? (
                    <>
                      <span className="text-3xl font-black text-primary">₹{option.price}</span>
                      <p className="text-sm text-muted-foreground">
                        /{option.type === 'session' ? 'session' : 
                          option.type === 'hourly' ? 'hour' : 
                          option.type === 'monthly' ? 'month' :
                          option.type === 'quarterly' ? 'quarter' :
                          option.type === 'yearly' ? 'year' : 'plan'}
                      </p>
                    </>
                  ) : (
                    <span className="text-lg font-semibold text-muted-foreground">Contact for pricing</span>
                  )}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{option.description}</p>
              
              {option.features && option.features.length > 0 && (
                <div className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingBox;