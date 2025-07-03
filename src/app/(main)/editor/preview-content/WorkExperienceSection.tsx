import { ResumeSectionProps } from "@/lib/types";
import { formatDate } from "date-fns";

const WorkExperienceSection = ({ resumeData }: ResumeSectionProps) => {
  const { workExperiences ,colorHex} = resumeData;

  const workExperienceIsNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperienceIsNotEmpty?.length) return null;

  return (
    <>
      <hr className="mb-2 border-t-2 border-black" style={{ borderColor: colorHex }}/>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800" style={{ color: colorHex }}>Work Experience</h3>

        {workExperienceIsNotEmpty.map((exp, index) => (
          <div key={index} className="space-y-1 ml-2">
            {/* Position & Dates */}
            <div className="flex justify-between items-start text-sm font-semibold">
              <div>
                <p className="text-base font-bold text-gray-900" style={{ color: colorHex }}>{exp.position}</p>
                <p className="text-sm font-medium text-gray-600">{exp.company}</p>
              </div>
              {exp.startDate && (
                <span className="text-xs text-gray-500" style={{ color: colorHex }}>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp?.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>

            {/* Description as bullet points if multiline */}
            {exp.description && (
              <ul className="list-disc pl-5 text-sm text-gray-800 whitespace-pre-line">
                {exp.description
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, idx) => (
                    <li key={idx} className="ml-3">{line}</li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkExperienceSection;
