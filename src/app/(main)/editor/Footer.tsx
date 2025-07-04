import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";

interface FooterProp {
  currentStep: string;
  showPreview: boolean;
  setCurrentSteps: (step: string) => void;
  setShowPreview: (show: boolean) => void;
}

const Footer = ({
  currentStep,
  setCurrentSteps,
  showPreview,
  setShowPreview,
}: FooterProp) => {
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPreview(!showPreview)}
          className="md:hidden"
          title={showPreview ? "Continue Editing" : "Show Resume Preview"}
        >
          {showPreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
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
