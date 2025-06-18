import { literal, z } from "zod";

export const optionalString = z.string().trim().optional().or(literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValue = z.infer<typeof generalInfoSchema>;
