import { cache } from "react";
import { prisma } from "./prisma";
import { env } from "@/env";

export type SubscriptionLevel = "free" | "premium" | "premium_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return "free";
    }

    if (subscription.rzpPriceId === env.NEXT_PUBLIC_PREMIUM_MONTHLY) {
      return "premium";
    }

    if (subscription.rzpPriceId === env.NEXT_PUBLIC_PREMIUM_PLUS_MONTHLY) {
      return "premium_plus";
    }

    throw new Error("No valid subscription");
  },
);
