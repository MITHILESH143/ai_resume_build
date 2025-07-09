"use server";

import openai from "@/lib/openai";
import {
  generateSummarySchma,
  GenerateSummaryValues,
  GenerateWorkExperienceInput,
  WorkExperience,
} from "@/lib/validation";

export const generateSummary = async (input: GenerateSummaryValues) => {
  //TODO: block for non premium user
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
  //TODO:block for non premium users.
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
};
