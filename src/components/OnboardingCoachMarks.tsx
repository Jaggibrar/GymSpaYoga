import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOnboardingTutorial, type CoachMark } from '@/hooks/useOnboardingTutorial';

const Tooltip = ({
  mark,
  step,
  total,
  onNext,
  onPrev,
  onFinish,
}: {
  mark: CoachMark;
  step: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

  useEffect(() => {
    const update = () => {
      const el = document.querySelector(mark.targetSelector);
      const tooltipWidth = 300;
      const tooltipHeight = 170;
      const gap = 14;

      if (!el) {
        setStyle({
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 1,
          zIndex: 10002,
        });
        return;
      }

      const rect = el.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (mark.position) {
        case 'bottom':
          top = rect.bottom + gap;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case 'top':
          top = rect.top - tooltipHeight - gap;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.left - tooltipWidth - gap;
          break;
        case 'right':
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.right + gap;
          break;
      }

      left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
      top = Math.max(8, Math.min(top, window.innerHeight - tooltipHeight - 8));

      setStyle({
        position: 'fixed',
        top,
        left,
        width: tooltipWidth,
        opacity: 1,
        zIndex: 10002,
        transition: 'all 0.3s ease',
      });

      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // Small delay to let scroll finish
    const timer = setTimeout(update, 100);
    return () => clearTimeout(timer);
  }, [mark]);

  const isLast = step === total - 1;
  const isFirst = step === 0;

  return (
    <div style={style} className="rounded-xl bg-white shadow-2xl border border-border p-4 max-w-[90vw]">
      <button
        onClick={onFinish}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        aria-label="Skip tutorial"
      >
        <X className="h-4 w-4" />
      </button>

      <h3 className="font-bold text-foreground text-base pr-5 mb-1">{mark.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{mark.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">
          {step + 1} of {total}
        </span>
        <div className="flex items-center gap-2">
          {!isFirst && (
            <Button variant="ghost" size="sm" onClick={onPrev} className="h-8 text-xs">
              <ChevronLeft className="h-3.5 w-3.5 mr-0.5" /> Back
            </Button>
          )}
          {isFirst && (
            <Button variant="ghost" size="sm" onClick={onFinish} className="h-8 text-xs text-muted-foreground">
              Skip
            </Button>
          )}
          <Button size="sm" onClick={onNext} className="h-8 text-xs bg-primary hover:bg-primary/90 text-white">
            {isLast ? '✅ Got it!' : 'Next'}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 ml-0.5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Spotlight = ({ mark }: { mark: CoachMark }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const update = () => {
      const el = document.querySelector(mark.targetSelector);
      if (el) setRect(el.getBoundingClientRect());
      else setRect(null);
    };
    const timer = setTimeout(update, 100);
    return () => clearTimeout(timer);
  }, [mark]);

  if (!rect) return null;
  const pad = 6;

  return (
    <div
      className="fixed rounded-lg border-2 border-primary pointer-events-none"
      style={{
        top: rect.top - pad,
        left: rect.left - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
        zIndex: 10001,
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease',
      }}
    />
  );
};

export const OnboardingCoachMarks = () => {
  const { isActive, currentStep, totalSteps, currentMark, next, prev, finish } =
    useOnboardingTutorial();

  if (!isActive || !currentMark) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[10000]" onClick={finish} />
      <Spotlight mark={currentMark} />
      <Tooltip
        mark={currentMark}
        step={currentStep}
        total={totalSteps}
        onNext={next}
        onPrev={prev}
        onFinish={finish}
      />
    </>,
    document.body
  );
};

export default OnboardingCoachMarks;
