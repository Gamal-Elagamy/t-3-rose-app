'use client';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center w-full" aria-label={`Step ${currentStep} of ${totalSteps}`}>
      {steps.map((step, index) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div
              aria-current={isActive ? 'step' : undefined}
              className={`
                flex items-center justify-center shrink-0
                w-6.25 h-6.25 rounded-full text-sm font-medium
                ${
                  isCompleted
                    ? 'bg-ds-bg-primary text-white'
                    : isActive
                      ? 'bg-ds-bg-primary text-white ring-3 ring-ds-bg-primary-fade'
                      : 'bg-ds-bg-primary-fade text-ds-bg-primary'
                }
              `}
            >
              {step}
            </div>

            {/* Connector line */}
            {!isLastStep && (
              <div
                className={`
                  flex-1 h-0.5 mx-2
                  ${isCompleted ? 'bg-ds-bg-primary' : 'bg-ds-bg-primary-fade'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
