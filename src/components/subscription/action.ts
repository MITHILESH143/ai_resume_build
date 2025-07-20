"use server";

import { env } from "@/env";
import { countExpiryTime } from "@/lib/utils";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
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
      const { privateMetadata } = await (
        await clerkClient()
      ).users.getUser(user.id);

      if (privateMetadata.razorpayCustomerId) {
        try {
          customer = await razorpay.customers.fetch(
            privateMetadata.razorpayCustomerId as string,
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

        (await clerkClient()).users.updateUserMetadata(user.id, {
          privateMetadata: {
            razorpayCustomerId: customer.id,
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
        customerName: customer?.name || "",
        customerEmail: customer?.email || "",
        contactNo: customer?.contact || "",
      },
    });

    return subscription;
  } catch (error) {
    console.error("Razorpay subscription creation failed:", error);
    throw new Error("Failed to create subscription");
  }
};
