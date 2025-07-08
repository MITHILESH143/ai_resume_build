"use server";

import openai from "@/lib/openai";
import { generateSummarySchma, GenerateSummaryValues } from "@/lib/validation";

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

  console.log("System Message", systemMessage);
  console.log("User Message", userMessage);

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
