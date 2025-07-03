import { ResumeSectionProps } from "@/lib/types";

const SummarySectino = ({ resumeData }: ResumeSectionProps) => {
  const { summary ,colorHex} = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr className="border-1 mb-1 border-black" style={{ borderColor: colorHex }}/>
      <div className="space-y-1">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>Professional Summary</p>
        <div className="text-sm whitespace-pre-line ml-2">{summary}</div>
      </div>
    </>
  );
};

export default SummarySectino;
