import { PersonalInfoHeader } from "@/app/(main)/editor/preview-content/PersonalInfoHeader";
import SummarySectino from "@/app/(main)/editor/preview-content/SummarySectino";
import WorkExperienceSection from "@/app/(main)/editor/preview-content/WorkExperienceSection";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useRef } from "react";

interface ResumePreviewProp {
  resumeData: ResumeValues;
  className: string;
}

const ResumePreview = ({ resumeData, className }: ResumePreviewProp) => {
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
        className={cn("space-y-6 p-3", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySectino resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;
