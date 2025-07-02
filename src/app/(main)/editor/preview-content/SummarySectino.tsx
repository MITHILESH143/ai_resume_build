import { ResumeSectionProps } from "@/lib/types";

const SummarySectino = ({ resumeData }: ResumeSectionProps) => {
  const { summary } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr className="border-1 border-primary mb-1" />
      <div className="space-y-1">
        <p className="text-lg font-semibold">Professional Summary</p>
        <div className="text-sm whitespace-pre-line ml-2">{summary}</div>
      </div>
    </>
  );
};

export default SummarySectino;
