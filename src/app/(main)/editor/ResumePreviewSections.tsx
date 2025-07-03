import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColotPicker from "./ColotPicker";
import BorderStyle from "./BorderStyle";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

const ResumePreviewSections = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return (
    <div className="group relative hidden min-h-0 w-1/2 flex-col md:flex">
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity lg:top-3 lg:left-3 xl:opacity-100">
        <ColotPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyle
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto px-15 py-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSections;
