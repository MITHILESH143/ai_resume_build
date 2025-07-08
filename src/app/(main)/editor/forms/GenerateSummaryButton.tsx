import LoadingButton from "@/components/LoadingButton";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { toast } from "sonner";
import { generateSummary } from "./actions";
import { useState } from "react";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

const GenerateSummaryButton = ({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    //TODO:block premium user
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please try again letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={loading}
      variant="outline"
      type="button"
      onClick={handleClick}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
};

export default GenerateSummaryButton;
