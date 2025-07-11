import EducationSections from "@/app/(main)/editor/preview-content/EducationSections";
import { PersonalInfoHeader } from "@/app/(main)/editor/preview-content/PersonalInfoHeader";
import SkillSection from "@/app/(main)/editor/preview-content/SkillSection";
import SummarySectino from "@/app/(main)/editor/preview-content/SummarySectino";
import WorkExperienceSection from "@/app/(main)/editor/preview-content/WorkExperienceSection";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import React, { useRef } from "react";

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

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-3 p-3", !width && "invisible")}
        style={{
          // Only apply zoom for screen view, not for print
          zoom:
            typeof window !== "undefined" && !window.matchMedia("print").matches
              ? (1 / 794) * width
              : 1,
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
