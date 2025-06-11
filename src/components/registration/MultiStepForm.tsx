
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  isValid?: boolean;
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

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
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
    setCurrentStep(stepIndex);
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

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
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center cursor-pointer transition-all ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div className="flex items-center justify-center mb-2">
                  {index < currentStep ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <Circle 
                      className={`h-8 w-8 ${
                        index === currentStep ? 'text-blue-600 fill-blue-100' : 'text-gray-400'
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
            ))}
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
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={onSubmit}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-3 text-lg"
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
