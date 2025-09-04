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
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const PersonalnfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData?.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (data, { name, type }) => {
      if (type === "change" && name) {
        const isValid = await form.trigger();
        if (!isValid) return;
        //update the resume data
        setResumeData({ ...resumeData, ...data });
      }
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <p className="text-muted-foreground text-sm">
          Share your basic details for the top section of your resume.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Your Photo</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      name={rest.name}
                      onBlur={rest.onBlur}
                      ref={(el) => {
                        inputRef.current = el;
                        rest.ref(el);
                      }}
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
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      onChange(null);
                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormDescription>
                  Upload a professional headshot (max 4MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. Mithilesh" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. Gupta" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="e.g. Full Stack Developer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. Mumbai" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. India" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact No</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="e.g. +91 1234567890"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="e.g. example@gmail.com"
                  />
                </FormControl>
                <FormDescription>
                  Use a professional email address
                </FormDescription>
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
