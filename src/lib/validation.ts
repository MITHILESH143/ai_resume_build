import { literal, z } from "zod";

export const optionalString = z.string().trim().optional().or(literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValue = z.infer<typeof generalInfoSchema>;

//structure for personal info form
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      { message: "File must be an image" },
    )
    .refine((file) => !file || file.size <= 1024 * 1024 * 2, {
      message: "File must be less than 4MB",
    }),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
