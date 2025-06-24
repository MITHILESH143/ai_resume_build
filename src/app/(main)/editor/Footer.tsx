import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrentSteps: (step: string) => void;
}

const Footer = ({ currentStep, setCurrentSteps }: FooterProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="min-h-[50px] w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentSteps(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            disabled={!nextStep}
            onClick={nextStep ? () => setCurrentSteps(nextStep) : undefined}
          >
            Next Step
          </Button>
        </div>
        <div className="flex items-start gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes"> Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
