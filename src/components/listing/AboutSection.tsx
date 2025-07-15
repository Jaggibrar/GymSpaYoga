import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from './SectionHeader';
import { Info } from 'lucide-react';

interface AboutSectionProps {
  businessName: string;
  description?: string;
  defaultDescription?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  businessName,
  description,
  defaultDescription,
  icon = <Info className="h-5 w-5 text-white" />,
  gradient = "from-primary to-primary/80"
}) => {
  const content = description || defaultDescription || `Experience premium services at ${businessName}. We are committed to providing you with exceptional quality and outstanding customer service.`;

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <SectionHeader
          icon={icon}
          title={`About ${businessName}`}
          gradient={gradient}
        />
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed text-lg">
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;