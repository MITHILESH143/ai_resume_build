"use server";

import { countExpiryTime } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
export const createSubscription = async (planId: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials not configured");
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12,
      quantity: 1,
      expire_by: countExpiryTime(),
      customer_notify: true,
    });

    return subscription;
  } catch (error) {
    console.error("Razorpay subscription creation failed:", error);
    throw new Error("Failed to create subscription");
  }
};
