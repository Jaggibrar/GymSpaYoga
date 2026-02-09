import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

const STORAGE_KEY = 'gymspayoga_tutorial_completed';

export interface CoachMark {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const COACH_MARKS: CoachMark[] = [
  {
    id: 'nav-services',
    title: '🔍 Find Services',
    description: 'Browse Gyms, Spas, Yoga Studios, Trainers & more from here.',
    targetSelector: '[data-tour="find-services"]',
    position: 'bottom',
  },
  {
    id: 'nav-business',
    title: '🏢 List Your Business',
    description: 'Own a gym, spa, or studio? Register your business on GymSpaYoga!',
    targetSelector: '[data-tour="for-business"]',
    position: 'bottom',
  },
  {
    id: 'hero-search',
    title: '🔎 Search & Discover',
    description: 'Search for wellness services near you — gyms, spas, yoga, trainers!',
    targetSelector: '[data-tour="hero-search"]',
    position: 'bottom',
  },
  {
    id: 'categories',
    title: '📂 Explore Categories',
    description: 'Pick a category to see verified listings with reviews and pricing.',
    targetSelector: '[data-tour="categories"]',
    position: 'top',
  },
  {
    id: 'ai-assistant',
    title: '🤖 Ask Me — AI Assistant',
    description: 'Need help? Tap here to chat with our AI wellness buddy anytime!',
    targetSelector: '[data-tour="ai-button"]',
    position: 'top',
  },
];

interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  currentMark: CoachMark | undefined;
  next: () => void;
  prev: () => void;
  finish: () => void;
  restart: () => void;
}

const TutorialContext = createContext<TutorialContextType | null>(null);

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      const timer = setTimeout(() => setIsActive(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const finish = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem(STORAGE_KEY, 'true');
  }, []);

  const next = useCallback(() => {
    if (currentStep < COACH_MARKS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      finish();
    }
  }, [currentStep, finish]);

  const prev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        totalSteps: COACH_MARKS.length,
        currentMark: COACH_MARKS[currentStep],
        next,
        prev,
        finish,
        restart,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export function useOnboardingTutorial() {
  const ctx = useContext(TutorialContext);
  if (!ctx) throw new Error('useOnboardingTutorial must be used within TutorialProvider');
  return ctx;
}
