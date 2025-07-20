"use server";

import { prisma } from "@/lib/prisma";
import razorpay from "@/lib/razorpay";
import { auth } from "@clerk/nextjs/server";

export const getSubscriptionUrl = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const subscriptionDetails = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    if (!subscriptionDetails) {
      throw new Error("There is no subscription available");
    }

    const rzpSub = await razorpay.subscriptions.fetch(
      subscriptionDetails.rzpSubscriptionId,
    );

    return rzpSub.short_url;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const cancelSubscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    throw new Error("No active subscription found");
  }

  if (!subscription.rzpSubscriptionId) {
    throw new Error("Invalid subscription ID");
  }

  try {
    // Cancel the subscription on Razorpay
    await razorpay.subscriptions.cancel(subscription.rzpSubscriptionId);

    // Note: Database will be updated via webhook when Razorpay confirms cancellation

    return { success: true, message: "Subscription cancelled successfully" };
  } catch (error) {
    console.error("Error cancelling subscription:", error);

    throw new Error("Failed to cancel subscription. Please try again.");
  }
};

export const pauseSubscription = async (subscriptionId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await razorpay.subscriptions.pause(subscriptionId);
  } catch (error) {
    console.log(error);
    throw new Error("Error while pausing subscription");
  }
};

export const getSubscription = async (userId: string) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const subscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    let planInfo;
    if (!subscription?.rzpPriceId) {
      planInfo = null;
    } else {
      planInfo = await razorpay.plans.fetch(subscription?.rzpPriceId);
    }

    return {
      planInfo,
      subscription,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};
