"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModel from "@/hooks/usePremiumModel";
import { useState } from "react";
import { createSubscription } from "./action";
import { toast } from "sonner";
import {
  RazorpayInstance,
  RazorpayOptions,
  RazorpayResponse,
} from "@/lib/types";

// Extend window interface for Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const premiumFeatures = ["AI tools", "Up to 3 resume"];
const premiumPlusFeature = ["Infinite resume", "Design Customization"];

const PremiumModel = () => {
  const { open, setOpen } = usePremiumModel();
  const [loading, setLoading] = useState(false);

  const handleSubscriptionClick = async (planId: string, plan: string) => {
    try {
      setLoading(true);
      const subscription = await createSubscription(planId);

      if (!subscription?.id) {
        throw new Error("Failed to create subscription");
      }

      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKeyId) {
        throw new Error("Razorpay key not configured");
      }

      const options: RazorpayOptions = {
        key: razorpayKeyId,
        subscription_id: subscription.id,
        name: "ProFileBuilder",
        description: plan,
        handler: function (response: RazorpayResponse) {
          console.log("✅ Payment success", response);
          toast.success("Payment successful!");
          setTimeout(() => {
            window.location.href = `/success?plan=${plan}`;
          }, 1000);
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed");
          },
        },
        theme: { color: "#0f172a" },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error("Razorpay not loaded");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong, Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!loading) {
          setOpen(isOpen);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Profile Builder Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features.</p>
          <div className="flex gap-6">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  handleSubscriptionClick(
                    process.env.NEXT_PUBLIC_PREMIUM_PRO_MONTHLY!,
                    "Premium",
                  )
                }
                disabled={loading}
              >
                {loading ? "Processing..." : "Get Premium"}
              </Button>
            </div>

            <div className="bg-border w-px" />

            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium Plus
              </h3>
              <ul className="space-y-2">
                {premiumPlusFeature.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="premium"
                onClick={() =>
                  handleSubscriptionClick(
                    process.env.NEXT_PUBLIC_PREMIUM_PLUS_MONTHLY!,
                    "Premium Plus",
                  )
                }
                disabled={loading}
              >
                {loading ? "Processing..." : "Get Premium Plus"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModel;
