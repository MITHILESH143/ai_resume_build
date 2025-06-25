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

//creting the dedicated schema for workexperience
export const workExperienceSchema = z.object({
  //putting it into array cause one person can have a multipule schemas
  workExperiences: z.array(
    z
      .object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
      .optional(),
  ),
});

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;

//whole resume data of user
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
