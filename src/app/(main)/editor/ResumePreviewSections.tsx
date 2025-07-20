import { useRef } from "react";
import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColotPicker from "./ColotPicker";
import BorderStyle from "./BorderStyle";
import { cn } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

const ResumePreviewSections = ({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) => {
  // Create ref for react-to-print
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrint = useReactToPrint({
    contentRef,
    documentTitle: resumeData.title || "Resume",
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5cm;
      }
      
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body {
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
      }
    `,
  });

  return (
    <div
      className={cn(
        "group relative hidden min-h-0 w-full flex-col md:flex md:w-1/2",
        className,
      )}
    >
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
        {/* Print Button */}
        <button
          onClick={() => reactToPrint()}
          className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          title="Print Resume"
        >
          <Printer className="h-4 w-4" />
        </button>
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto px-15 py-3">
        <ResumePreview
          contentRef={contentRef}
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSections;
