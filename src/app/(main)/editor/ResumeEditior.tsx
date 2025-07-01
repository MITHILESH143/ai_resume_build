"use client";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSections from "./ResumePreviewSections";

const ResumeEditior = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

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
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume. Your progress will be
          saved automatically
        </p>
      </header>

      <main className="flex min-h-[450px] flex-1">
        <div className="flex w-full max-h-[550px]">
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Fixed Breadcrumbs Section */}
            <div className="flex-shrink-0  bg-background sticky top-0 z-10">
              <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            </div>
            
            {/* Scrollable Form Content */}
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
          />
        </div>
      </main>
      
      <Footer currentStep={currentStep} setCurrentSteps={setStep} />
    </div>
  );
};

export default ResumeEditior;