
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Step {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  isValid?: boolean;
  validate?: () => boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  onSubmit: () => void;
  isSubmitting?: boolean;
  title: string;
  description: string;
}

export const MultiStepForm = ({ 
  steps, 
  onSubmit, 
  isSubmitting = false,
  title,
  description 
}: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const progress = ((currentStep + 1) / steps.length) * 100;

  const validateCurrentStep = (): boolean => {
    const currentStepData = steps[currentStep];
    if (currentStepData.validate) {
      return currentStepData.validate();
    }
    return currentStepData.isValid !== false;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast.error('Please complete all required fields before proceeding');
      return;
    }

    setCompletedSteps(prev => new Set(prev).add(currentStep));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on completed steps or the next step
    if (stepIndex <= currentStep || completedSteps.has(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    } else {
      toast.info('Please complete the current step before proceeding');
    }
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) {
      toast.error('Please complete all required fields before submitting');
      return;
    }
    onSubmit();
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const canProceed = validateCurrentStep();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600">{description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(index);
              const isCurrent = index === currentStep;
              const canAccess = index <= currentStep || completedSteps.has(index - 1);
              
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center transition-all ${
                    canAccess ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  } ${
                    isCompleted ? 'text-green-600' : 
                    isCurrent ? 'text-blue-600' : 'text-gray-400'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="flex items-center justify-center mb-2">
                    {isCompleted ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : isCurrent && !canProceed ? (
                      <AlertCircle className="h-8 w-8 text-orange-500" />
                    ) : (
                      <Circle 
                        className={`h-8 w-8 ${
                          isCurrent ? 'text-blue-600 fill-blue-100' : 'text-gray-400'
                        }`} 
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500 max-w-24 hidden md:block">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 px-12 py-8">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-center text-gray-600 mt-2">
                {steps[currentStep].description}
              </p>
            </CardHeader>
            
            <CardContent className="px-12 py-10">
              {/* Current Step Content */}
              <div className="mb-8">
                {steps[currentStep].component}
              </div>

              {/* Validation Message */}
              {!canProceed && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center text-orange-800">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">
                      Please complete all required fields to continue
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstStep}
                  className="px-8 py-3 text-lg"
                >
                  Previous
                </Button>

                <div className="flex space-x-4">
                  {!isLastStep ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !canProceed}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Complete Registration"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
