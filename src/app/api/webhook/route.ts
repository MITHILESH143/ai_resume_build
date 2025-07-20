import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { RazorpayWebHookPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEB_HOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json("Invalid Signature", { status: 401 });
    }

    const event = JSON.parse(body);

    console.log(`Incoming data : ${JSON.stringify(event.payload)}`);

    switch (event.event) {
      case "subscription.activated":
        await handleSubscriptionActivateOrCharged(event.payload);
        break;
      case "subscription.charged":
        await handleSubscriptionActivateOrCharged(event.payload);
        break;
      case "subscription.cancelled":
        await handleSubscriptionCancelled(event.payload);
        break;
      default:
        console.log(event.event);
        break;
    }

    return NextResponse.json("completed", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

async function handleSubscriptionActivateOrCharged(
  payload: RazorpayWebHookPayload,
) {
  const subscription = payload.subscription.entity;
  const clerkUserId = subscription.notes.clerk_user_id;

  if (!clerkUserId) {
    console.error("No clerk_user_id found in subscription notes");
    return null;
  }

  try {
    await prisma.userSubscription.upsert({
      where: { userId: clerkUserId },
      update: {
        rzpSubscriptionId: subscription.id,
        rzpCustomerId: subscription.customer_id,
        rzpPriceId: subscription.plan_id,
        currentPeriodEnd: new Date((subscription?.current_end || 0) * 1000),
        cancelAtPeriodEnd: false,
      },
      create: {
        userId: clerkUserId,
        rzpSubscriptionId: subscription.id,
        rzpCustomerId: subscription.customer_id,
        rzpPriceId: subscription.plan_id,
        currentPeriodEnd: new Date(subscription?.current_end || 0 * 1000),
        cancelAtPeriodEnd: false,
      },
    });

    console.log(`Subscription activated for user ${clerkUserId}`);
  } catch (error) {
    console.error("Error handling subscription activation:", error);
    throw error;
  }
}

async function handleSubscriptionCancelled(payload: RazorpayWebHookPayload) {
  const subscription = payload.subscription.entity;
  const clerkUserId = subscription.notes.clerk_user_id;

  if (!clerkUserId) {
    console.error("No clerk_user_id found in subscription notes");
    return null;
  }

  try {
    await prisma.userSubscription.update({
      where: { userId: clerkUserId },
      data: {
        currentPeriodEnd: new Date((subscription?.current_end || 0) * 1000),
        cancelAtPeriodEnd: true,
      },
    });

    console.log(`Subscription cancel for user ${clerkUserId}`);
  } catch (error) {
    console.error("Error handling subscription charge:", error);
    throw error;
  }
}
