import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

const useAutoSave = (resumeData: ResumeValues) => {
  const searchParams = useSearchParams();

  const debounceData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debounceData]);

  useEffect(() => {
    const save = async () => {
      try {
        setIsSaving(true);
        setIsError(false);
        const newData = structuredClone(debounceData);
        console.log("NEW DATA", newData);
        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        console.log("UPDATED RESUME", updatedResume);

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
        toast(() => {
          return (
            <>
              <div className="space-y-3">
                <p>Could not save changes.</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    toast.dismiss();
                    save();
                  }}
                >
                  Retry
                </Button>
              </div>
            </>
          );
        });
      } finally {
        setIsSaving(false);
      }
    };

    const hasUnsavedChange =
      JSON.stringify(debounceData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChange && debounceData && !isSaving && !isError) {
      save();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debounceData,
    lastSavedData,
    isSaving,
    isError,
    searchParams,
    resumeId,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
};

export default useAutoSave;
