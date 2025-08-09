import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

interface ViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ mode, onChange, className }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className || ''}`} role="group" aria-label="Toggle view mode">
      <Button
        type="button"
        variant={mode === 'grid' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('grid')}
        aria-pressed={mode === 'grid'}
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        Grid
      </Button>
      <Button
        type="button"
        variant={mode === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('list')}
        aria-pressed={mode === 'list'}
      >
        <List className="h-4 w-4 mr-1" />
        List
      </Button>
    </div>
  );
};

export default ViewModeToggle;
