import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  gradient?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  description,
  gradient = "from-primary to-primary/80"
}) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;