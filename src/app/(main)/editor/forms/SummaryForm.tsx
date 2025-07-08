import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { SummaryValues, summerySchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";

const SummaryForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summerySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      setResumeData({
        ...resumeData,
        ...data,
      });
    });

    return () => subscription.unsubscribe?.();
  }, [form, form.watch, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
        <p className="text-muted-foreground text-sm">
          Write a short summary about your experience, or let AI help generate
          one from your inputs.
        </p>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Professional Summary</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Add a Professional Summary" />
              </FormControl>
              <FormMessage />
              <div className="w-[20%]">
                <GenerateSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) =>
                    form.setValue("summary", summary)
                  }
                />
              </div>
            </FormItem>
          )}
        />
        <FormDescription>
          Highlight your top skills, years of experience, or career goals in 2–3
          lines.
        </FormDescription>
      </Form>
    </div>
  );
};

export default SummaryForm;
