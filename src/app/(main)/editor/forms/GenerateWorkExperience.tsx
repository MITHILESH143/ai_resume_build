import { Button } from "@/components/ui/button";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { generateWorkExperience } from "./actions";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";

interface GenerateWorkExperienceProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

const GenerateWorkExperience = ({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceProps) => {
  const [showInputDialogue, setShowInputDialogue] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialogue(true)}
      >
        <WandSparklesIcon className="size-4" />
        Generate(AI)
      </Button>
      <InputDialogue
        open={showInputDialogue}
        onOpenChange={setShowInputDialogue}
        onWorkExperienceGenerated={(exp) => {
          onWorkExperienceGenerated(exp);
          setShowInputDialogue(false);
        }}
      />
    </>
  );
};

export default GenerateWorkExperience;

interface InputDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

function InputDialogue({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogueProps) {
  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (input: GenerateWorkExperienceInput) => {
    try {
      const response = await generateWorkExperience(input);
      onWorkExperienceGenerated(response);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again later");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Work Experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="[E.g. form nov 2019 to 2020] i worked at goolge as  a sogtwarr"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
