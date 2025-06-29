import React, { useEffect, useRef } from "react";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
import { GripHorizontal } from "lucide-react";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      setResumeData({
        ...resumeData,
        workExperiences:
          data.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });

    return () => subscription.unsubscribe?.();
  }, [form, form.watch, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          Add previous roles you have worked in including internships,
          freelancing, full-time jobs.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <WorkExperienceItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
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
        </form>
      </Form>
    </div>
  );
};

export default WorkExperienceForm;

interface WorkExperienceItem {
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem = ({ form, index, remove }: WorkExperienceItem) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (index === 0) {
      inputRef.current?.focus();
    }
  }, [index]);

  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
      </div>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                ref={inputRef}
                placeholder="e.g. Full Stack Developer"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="e.g. Infosys,Freelancing"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value?.slice(0, 10) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value?.slice(0, 10) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if you are
        currently working here.
      </FormDescription>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your responsibilities, tech used, or key contributions"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="button" variant="destructive" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};
