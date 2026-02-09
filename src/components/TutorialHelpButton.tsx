import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnboardingTutorial } from '@/hooks/useOnboardingTutorial';

const TutorialHelpButton = () => {
  const { restart, isActive } = useOnboardingTutorial();

  if (isActive) return null;

  return (
    <Button
      onClick={restart}
      variant="outline"
      size="icon"
      className="fixed bottom-24 left-4 z-40 h-11 w-11 rounded-full bg-white shadow-lg border-primary/30 hover:bg-primary hover:text-white transition-all"
      aria-label="Restart tutorial"
      title="Site Tour"
    >
      <HelpCircle className="h-5 w-5" />
    </Button>
  );
};

export default TutorialHelpButton;
