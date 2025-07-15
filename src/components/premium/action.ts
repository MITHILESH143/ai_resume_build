"use server";

//handling subscription server action
//step 1 : create razorpay client
//step 2 : try to find the existing userid or create a new user.
//step 3 : create a subscription
//step 4 : attach customer id to subscription
//step 4 : return created subscription

import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { countExpiryTime } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
export const createSubscription = async (planId: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials not configured");
  }

  try {
    const razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });

    let customer;
    try {
      const existingSubscription = await prisma.userSubscription.findUnique({
        where: { userId: user.id },
        select: { rzpCustomerId: true },
      });
      if (existingSubscription?.rzpCustomerId) {
        try {
          customer = await razorpay.customers.fetch(
            existingSubscription.rzpCustomerId,
          );
        } catch (error) {
          console.warn(error);
          customer = null;
        }
      }
      if (!customer) {
        customer = await razorpay.customers.create({
          name:
            user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.username || "User",
          email: user.emailAddresses[0]?.emailAddress,
          contact: user.phoneNumbers[0]?.phoneNumber || undefined,
          notes: {
            clerk_user_id: user.id,
            created_from: "ProFileBuilder",
          },
        });
      }
    } catch (customerError) {
      console.error(customerError);
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12,
      quantity: 1,
      expire_by: countExpiryTime(),
      customer_notify: true,
      notes: {
        clerk_user_id: user.id,
        user_email: user.emailAddresses[0]?.emailAddress,
      },
    });

    subscription.customer_id = customer?.id || null;

    return subscription;
  } catch (error) {
    console.error("Razorpay subscription creation failed:", error);
    throw new Error("Failed to create subscription");
  }
};
