import { Button } from "@/components/ui/button";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Form, useFieldArray, useForm } from "react-hook-form";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<WorkExperienceSchema>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (data, { name, type }) => {
      if (type === "change" && name) {
        const isValid = await form.trigger();
        if (!isValid) return;
        //update the resume data
        setResumeData({
          ...resumeData,
          workExperiences:
            data.workExperiences?.filter((exp) => exp !== undefined) || [],
        });
      }
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);


  const { fields, append } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experience</h2>
        <p className="text-muted-foreground text-sm">
          Add as many work experience as you like
        </p>
      </div>
      <Form {...form}>
        <div className="space-y-3">
          {fields.map((field) => (
            <WorkExperienceItem key={field.id} />
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                });
              }}
            >
              Add Work Experience
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default WorkExperienceForm;

const WorkExperienceItem = () => {
  return <div>Work Experience</div>;
};
