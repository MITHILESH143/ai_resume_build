"use client";

import { Check, Star, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import usePremiumModel from "@/hooks/usePremiumModel";
import { useState } from "react";
import { createSubscription } from "./action";
import { toast } from "sonner";
import {
  RazorpayInstance,
  RazorpayOptions,
  RazorpayResponse,
} from "@/lib/types";
import { env } from "@/env";
import logo from "../../assests/logo.png";

// Extend window interface for Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const premiumFeatures = [
  { text: "AI-powered resume builder", icon: "🤖" },
  { text: "Up to 3 professional resumes", icon: "📄" },
];

const premiumPlusFeatures = [
  { text: "Unlimited resume creation", icon: "♾️" },
  { text: "Advanced design customization", icon: "🎨" },
];

const PremiumModal = () => {
  const { open, setOpen } = usePremiumModel();
  const [loading, setLoading] = useState(false);

  const handleSubscriptionClick = async (planId: string, plan: string) => {
    try {
      setLoading(true);
      const subscription = await createSubscription(planId);

      if (!subscription.id) {
        throw new Error("Failed to create subscription");
      }

      const razorpayKeyId = env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKeyId) {
        throw new Error("Razorpay key not configured");
      }

      const options: RazorpayOptions = {
        key: razorpayKeyId,
        subscription_id: subscription.id,
        name: "ProFileBuilder",
        description: plan,
        image: logo,
        handler: function (response: RazorpayResponse) {
          if (response) {
            toast.success("Payment Successful!", {
              description: "Processing your subscription... Please wait.",
              duration: 3000,
            });

            setTimeout(() => {
              toast.success("Account Updated!", {
                description:
                  "Your subscription is now active. Refreshing page...",
                duration: 2000,
              });

              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }, 6000);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed");
          },
        },
        prefill: {
          name: subscription.notes?.customerName?.toString() || "",
          email: subscription.notes?.customerEmail?.toString() || "",
          contact: subscription.notes?.contactNo?.toString() || "",
        },
        theme: {
          color: "#0f172a",
        },
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
      <DialogContent className="max-w-4xl overflow-hidden p-0">
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6">
          <DialogHeader className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <DialogTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-2xl font-bold text-transparent">
                Upgrade to Premium
              </DialogTitle>
            </div>
            <p className="text-sm text-slate-600">
              Choose the perfect plan to unlock your career potential
            </p>
          </DialogHeader>
        </div>

        <div className="space-y-8 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Premium Plan */}
            <div className="relative flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-6 text-center">
                <div className="mb-2 inline-flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  <h3 className="text-xl font-bold text-slate-800">Premium</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Perfect for job seekers
                </p>
              </div>

              <div className="mb-6 flex-1 space-y-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700">
                        {feature.text}
                      </span>
                    </div>
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Button
                  onClick={() =>
                    handleSubscriptionClick(
                      env.NEXT_PUBLIC_PREMIUM_MONTHLY!,
                      "Premium",
                    )
                  }
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {loading ? "Processing..." : "Get Premium"}
                </Button>
              </div>
            </div>

            {/* Premium Plus Plan */}
            <div className="relative flex flex-col rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1 text-xs font-medium text-white">
                  MOST POPULAR
                </Badge>
              </div>

              <div className="mb-6 text-center">
                <div className="mb-2 inline-flex items-center gap-2">
                  <div className="relative">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                  </div>
                  <h3 className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
                    Premium Plus
                  </h3>
                </div>
                <p className="text-sm text-slate-600">
                  For serious professionals
                </p>
              </div>

              <div className="mb-6 flex-1 space-y-4">
                {premiumPlusFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700">
                        {feature.text}
                      </span>
                    </div>
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Button
                  onClick={() =>
                    handleSubscriptionClick(
                      env.NEXT_PUBLIC_PREMIUM_PLUS_MONTHLY!,
                      "Premium Plus",
                    )
                  }
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl"
                >
                  {loading ? "Processing..." : "Get Premium Plus"}
                </Button>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="space-y-3 border-t border-slate-200 pt-4 text-center">
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
