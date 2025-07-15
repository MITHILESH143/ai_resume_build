"use server";

import { canCreateResume, canUseCustmization } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;

  const { photo, workExperiences, educations, ...restValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await prisma.resume.count({ where: { userId } });
    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error("Maximum resume count reached for this subscription");
    }
  }
  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("resume not found");
  }

  const hasCustomization =
    (restValues.borderStyle &&
      restValues.borderStyle !== existingResume?.borderStyle) ||
    (restValues.colorHex && restValues.colorHex !== existingResume?.colorHex);

  if (hasCustomization && !canUseCustmization(subscriptionLevel)) {
    throw new Error("Customization not allowed for this subscription level");
  }
  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    // Delete old photo if it exists
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    // Generate unique filename using timestamp and user ID
    const timestamp = Date.now();
    const fileExtension = path.extname(photo.name);
    const uniqueFileName = `resume_photos/${userId}_${timestamp}${fileExtension}`;

    const blob = await put(uniqueFileName, photo, {
      access: "public",
    });
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    // Delete existing photo
    if (existingResume?.photoUrl) {
      await del(existingResume?.photoUrl);
    }
    newPhotoUrl = null;
  }
  // If photo is undefined, don't change the photo field

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...restValues,
        ...(newPhotoUrl !== undefined && { photoUrl: newPhotoUrl }),
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        userId,
        ...restValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
