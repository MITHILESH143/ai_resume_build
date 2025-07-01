import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

const ResumePreviewSections = ({
  resumeData
}: ResumePreviewSectionProps) => {
  return (
    <div className="hidden min-h-0 w-1/2 flex-col md:flex">
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSections;
