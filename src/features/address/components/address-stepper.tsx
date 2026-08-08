'use client';

import { createContext, useContext, useState } from 'react';

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
} from '@/shared/components/ui/stepper';

export interface AddressStep {
  step: number;
  title: string;
}

interface AddressStepperContextValue {
  currentStep: number;
  goToStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const AddressStepperContext = createContext<AddressStepperContextValue | undefined>(undefined);

export function useAddressStepper() {
  const context = useContext(AddressStepperContext);

  if (!context) {
    throw new Error('useAddressStepper must be used within AddressStepper');
  }

  return context;
}

interface AddressStepperProps {
  steps: AddressStep[];
  children: React.ReactNode;
}

export default function AddressStepper({ steps, children }: AddressStepperProps) {
  const [currentStep, setCurrentStep] = useState(steps[0].step);

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <AddressStepperContext.Provider
      value={{
        currentStep,
        goToStep,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      <Stepper value={currentStep}>
        <StepperNav>
          {steps.map((step) => (
            <StepperItem key={step.step} step={step.step}>
              <StepperSeparator position="prev" />

              <StepperIndicator>{step.step}</StepperIndicator>

              <StepperSeparator position="next" />
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel>{children}</StepperPanel>
      </Stepper>
    </AddressStepperContext.Provider>
  );
}
