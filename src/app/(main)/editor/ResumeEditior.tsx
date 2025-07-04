"use client";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSections from "./ResumePreviewSections";
import { cn } from "@/lib/utils";

const ResumeEditior = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeValues>({});
  
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }
  
  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  
  return (
    <div className="flex h-screen flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center flex-shrink-0">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume. Your progress will be
          saved automatically
        </p>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <div className="flex w-full h-full">
          <div
            className={cn(
              "flex w-full flex-col md:w-1/2 h-full",
              showPreview && "hidden",
            )}
          >
            <div className="bg-background flex-shrink-0 z-10">
              <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}
            </div>
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSections
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showPreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentSteps={setStep}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
      />
    </div>
  );
};

export default ResumeEditior;