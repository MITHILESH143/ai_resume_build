import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon, CloudIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProp {
  currentStep: string;
  showPreview: boolean;
  isSaving: boolean;
  setCurrentSteps: (step: string) => void;
  setShowPreview: (show: boolean) => void;
}

const Footer = ({
  currentStep,
  setCurrentSteps,
  showPreview,
  setShowPreview,
  isSaving
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
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <div
            className={cn(
              "flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 opacity-0 transition-all duration-300 ease-in-out dark:bg-blue-900/30 dark:text-blue-400",
              isSaving && "opacity-100 scale-100",
              !isSaving && "scale-95"
            )}
          >
            <CloudIcon className={cn("h-4 w-4", isSaving && "animate-pulse")} />
            <span>Saving...</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;