import { ResumeSectionProps } from "@/lib/types";
import { formatDate } from "date-fns";

const EducationSections = ({ resumeData }: ResumeSectionProps) => {
  const { educations } = resumeData;

  const educationIsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationIsNotEmpty?.length) return null;

  return (
    <>
      <hr className="mb-2 border-t-2 border-primary" />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">Education</h3>

        {educationIsNotEmpty.map((edu, index) => (
          <div key={index} className="space-y-1 ml-2">
            {/* Degree & Dates */}
            <div className="flex items-start justify-between text-sm font-semibold">
              <div>
                <p className="text-base font-bold text-gray-900">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
              {edu.startDate && (
                <span className="text-xs text-gray-500">
                  {formatDate(edu.startDate, "MM/yyyy")}{" "}
                  {edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationSections;
