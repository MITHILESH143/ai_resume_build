import React from "react";
import GeneralInfoFrom from "./forms/GeneralInfoFrom";
import PersonalnfoForm from "./forms/PersonalnfoForm";
import { EditorFormProps } from "@/lib/types";
import WorkExperienceForm from "./forms/WorkExperienceForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General Info", component: GeneralInfoFrom, key: "general-info" },
  { title: "Personal Info", component: PersonalnfoForm, key: "personal-info" },
  { title: "Work Experience", component: WorkExperienceForm, key: "work-experience" },
];
