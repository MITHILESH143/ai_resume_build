import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

const EducationDetails = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      setResumeData({
        ...resumeData,
        educations:
          data.educations?.filter((education) => education !== undefined) || [],
      });
    });

    return () => subscription.unsubscribe?.();
  }, [form, form.watch, resumeData, setResumeData]);

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education Details</h2>
        <p className="text-muted-foreground text-sm">
          List your educational background including degrees, diplomas, or
          certifications.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationItem
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
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                });
              }}
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationDetails;

interface EducationItemProp {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem = ({ form, index, remove }: EducationItemProp) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (index === 0) {
      inputRef.current?.focus();
    }
  }, [index]);
  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education #{index + 1}</span>
        <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} type="text" ref={inputRef} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School/University</FormLabel>
            <FormControl>
              <Input {...field} type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
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
          name={`educations.${index}.endDate`}
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
        Leave the <span className="font-semibold">end date</span> blank if you
        are currently pursuing this degree.
      </FormDescription>

      <Button type="button" variant="destructive" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};
