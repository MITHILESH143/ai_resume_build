import { Badge } from "@/components/ui/badge";
import { ResumeSectionProps } from "@/lib/types";

const SkillSection = ({ resumeData }: ResumeSectionProps) => {
  const { skills, colorHex } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="mb-2 border-t-2 border-black"
        style={{ borderColor: colorHex }}
      />
      <div className="break-inside-avoid space-y-1">
        <p className="text-lg font-semibold text-gray-800" style={{ color: colorHex }}>Skills</p>

        <div className="ml-2 flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} className="bg-black text-white" style={{ backgroundColor: colorHex }}>
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillSection;
