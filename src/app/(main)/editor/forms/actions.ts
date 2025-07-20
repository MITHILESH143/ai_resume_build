"use server";

//code using open ai api
/* import openai from "@/lib/openai";
import { canUseAiTools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  generateSummarySchma,
  GenerateSummaryValues,
  GenerateWorkExperienceInput,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export const generateSummary = async (input: GenerateSummaryValues) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAiTools(subscriptionLevel)) {
    throw new Error("Upgrade subscription level");
  }

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchma.parse(input);

  const systemMessage = `Your a Job Resume generator AI.Your task is to write a professional introduction summary for a resume based on given provided user data.
    Only return the summary and do not include any other information in response.Keep it concise and professional.`;

  const userMessage = `Please generate a professional resume summary for this user data:
    Job Title:${jobTitle || "N/A"}

    Work Experience: ${workExperiences
      ?.map(
        (exp) => `
        position: ${exp.position || "N/A"} at  ${exp.company || "N/A"} from ${exp.startDate || "N/A"}
        to ${exp.endDate || "Present"}
        description:
         ${exp.description || "N/A"}
    `,
      )
      .join("\n\n")}

      Education: ${educations
        ?.map(
          (edu) => `
        Degree: ${edu.degree || "N/A"} at  ${edu.school || "N/A"} from ${edu.startDate || "N/A"}
        to ${edu.endDate || "N/A"}}
`,
        )
        .join("\n\n")}

        Skills:
        ${skills}
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("failed to generate AI response");
  }

  return aiResponse;
};

export const generateWorkExperience = async (
  input: GenerateWorkExperienceInput,
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAiTools(subscriptionLevel)) {
    throw new Error("Upgrade subscription level");
  }

  const { description } = input;

  const systemMessage = `You are a job resume generator ai.your task is to generate a single user work experience based on user input
  Your response must be adhere to the following structure.You can amit fields if they cant be infered from tne provided data, but dont add any new ones
  jobTitle: <job title>
  company: <company name>
  startDate: <format:yyyy-mm-dd> (only if provided)
  endDate: <format:yyyy-mm-dd> (only if provided)
  Description:<an optional description in bullet format, might be infered from the job title>
  `;

  const userMessage = `Please provide a work experience entry form this description ${description}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to Generate AI response");
  }

  return {
    position: aiResponse.match(/jobTitle:(.*)/)?.[1] || "",
    company: aiResponse.match(/company:(.*)/)?.[1] || "",
    description: aiResponse.match(/description:(.*)/)?.[1] || "",
    startDate: aiResponse.match(/startDate:(.*)/)?.[1] || "",
    endDate: aiResponse.match(/endDate:(.*)/)?.[1] || "",
  } satisfies WorkExperience;
}; */

//Code using google gemini api
"use server";

import { geminiModel } from "@/lib/gemini";
import { canUseAiTools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  generateSummarySchma,
  GenerateSummaryValues,
  GenerateWorkExperienceInput,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export const generateSummary = async (input: GenerateSummaryValues) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAiTools(subscriptionLevel))
    throw new Error("Upgrade subscription level");

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchma.parse(input);

  const systemMessage = `You're a Job Resume Generator AI. Write a professional and concise resume summary from the following input. Return only the summary — no extra info or formatting.`;

  const userMessage = `Job Title: ${jobTitle || "N/A"}

Work Experience:
${workExperiences
  ?.map(
    (exp) =>
      `• ${exp.position || "N/A"} at ${exp.company || "N/A"} (${exp.startDate || "N/A"} – ${exp.endDate || "Present"})\n  ${exp.description || "N/A"}`,
  )
  .join("\n\n")}

Education:
${educations
  ?.map(
    (edu) =>
      `• ${edu.degree || "N/A"} at ${edu.school || "N/A"} (${edu.startDate || "N/A"} – ${edu.endDate || "N/A"})`,
  )
  .join("\n\n")}

Skills:
${skills || "N/A"}`;

  const result = await geminiModel.generateContent([
    systemMessage,
    userMessage,
  ]);
  const response = await result.response;
  const aiResponse = response.text();

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse;
};

export const generateWorkExperience = async (
  input: GenerateWorkExperienceInput,
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAiTools(subscriptionLevel))
    throw new Error("Upgrade subscription level");

  const { description } = input;

  const systemMessage = `You're a Resume Assistant AI. Based on the user-provided description, extract resume work experience using this format:

jobTitle: <job title>
company: <company name>
startDate: <yyyy-mm-dd>
endDate: <yyyy-mm-dd>
description: <bullet list of responsibilities or achievements>

Don't fabricate anything. Use only what's inferable.`;

  const userMessage = `Description: ${description}`;

  const result = await geminiModel.generateContent([
    systemMessage,
    userMessage,
  ]);
  const response = await result.response;
  const aiResponse = response.text();

  if (!aiResponse) throw new Error("Failed to generate AI response");

  return {
    position: aiResponse.match(/jobTitle:(.*)/)?.[1]?.trim() || "",
    company: aiResponse.match(/company:(.*)/)?.[1]?.trim() || "",
    description: aiResponse.match(/description:(.*)/s)?.[1]?.trim() || "",
    startDate: aiResponse.match(/startDate:(.*)/)?.[1]?.trim() || "",
    endDate: aiResponse.match(/endDate:(.*)/)?.[1]?.trim() || "",
  } satisfies WorkExperience;
};
