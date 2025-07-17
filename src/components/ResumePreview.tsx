import EducationSections from "@/app/(main)/editor/preview-content/EducationSections";
import { PersonalInfoHeader } from "@/app/(main)/editor/preview-content/PersonalInfoHeader";
import SkillSection from "@/app/(main)/editor/preview-content/SkillSection";
import SummarySectino from "@/app/(main)/editor/preview-content/SummarySectino";
import WorkExperienceSection from "@/app/(main)/editor/preview-content/WorkExperienceSection";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import React, { useRef, useEffect, useState } from "react";

interface ResumePreviewProp {
  resumeData: ResumeValues;
  className: string;
  contentRef: React.Ref<HTMLDivElement>;
}

const ResumePreview = ({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProp) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimension(containerRef);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Detect print mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("print");
    const handlePrintChange = (e: MediaQueryListEvent) => {
      setIsPrintMode(e.matches);
    };

    setIsPrintMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handlePrintChange);

    return () => {
      mediaQuery.removeEventListener("change", handlePrintChange);
    };
  }, []);

  // Calculate zoom only for screen view
  const getZoomLevel = () => {
    if (isPrintMode || !width) return 1;
    return (1 / 794) * width;
  };

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-3 p-3", !width && !isPrintMode && "invisible")}
        style={{
          zoom: getZoomLevel(),
          // Additional print-specific styles
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
          colorAdjust: "exact",
        }}
        ref={contentRef}
        id="resumeProviewContent"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySectino resumeData={resumeData} />
        <SkillSection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSections resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;
