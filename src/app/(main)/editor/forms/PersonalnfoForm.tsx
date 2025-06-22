import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personalInfoSchema, PersonalInfoSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const PersonalnfoForm = () => {
  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      city: "",
      country: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (data, { name, type }) => {
      if (type === 'change' && name) {
        const isValid = await form.trigger();
        if (!isValid) return;
        //update the resume data
      }
    });

    return unsubscribe;
  }, [form]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal Info</h2>
        <p className="text-muted-foreground text-sm">Tell us about yourself</p>
      </div>
      
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Your photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    name={rest.name}
                    onBlur={rest.onBlur}
                    ref={rest.ref}
                    value={undefined}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                      
                      if (file) {
                        setTimeout(async () => {
                          await form.trigger("photo");
                        }, 0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default PersonalnfoForm;