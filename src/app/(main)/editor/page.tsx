import { Metadata } from "next";
import ResumeEditior from "./ResumeEditior";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

const Page = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams;
  const { userId } = await auth();

  if (!userId) return;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  console.log(resumeToEdit);

  return <ResumeEditior resumeToEdit={resumeToEdit} />;
};

export default Page;
