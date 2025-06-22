import React from "react";
import GeneralInfoFrom from "./forms/GeneralInfoFrom";
import PersonalnfoForm from "./forms/PersonalnfoForm";

export const steps: {
  title: string;
  component: React.ComponentType;
  key: string;
}[] = [
  { title: "General Info", component: GeneralInfoFrom, key: "general-info" },
  { title: "Personal Info", component: PersonalnfoForm, key: "personal-info" },

];
