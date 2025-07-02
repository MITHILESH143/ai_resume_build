import { Badge } from "@/components/ui/badge";
import { ResumeSectionProps } from "@/lib/types";

const SkillSection = ({ resumeData }: ResumeSectionProps) => {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="mb-2 border-t-2 border-primary" />
      <div className="break-inside-avoid space-y-1">
        <p className="text-lg font-semibold text-gray-800">Skills</p>

        <div className="flex break-inside-avoid flex-wrap gap-2 ml-2">
          {skills.map((skill, index) => (
            <Badge key={index} className="bg-primary text-white">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillSection;
