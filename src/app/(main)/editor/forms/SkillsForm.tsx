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
import { skillSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SkillsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  // Handle skills update directly
  useEffect(() => {
    const subscription = form.watch((data) => {
      setResumeData({
        ...resumeData,
        skills:
          data.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill?.trim())
            .filter((skill) => skill !== "") || [],
      });
    });

    return () => subscription.unsubscribe?.();
  }, [form, form.watch, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-muted-foreground text-sm">
          List your technical and soft skills. Highlight what sets you apart as
          a developer.
        </p>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Skills</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g. JavaScript, React.js, Node.js, MongoDB, teamwork, communication..."
                  onChange={(e) => {
                    const skillsString = e.target.value.split(",");
                    field.onChange(skillsString);
                  }}
                />
              </FormControl>
              <FormDescription>
                Separate each skill with a comma (,). Include both technical and
                interpersonal skills.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default SkillsForm;
