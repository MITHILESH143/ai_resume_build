"use client";

import { Check, Star, Sparkles, Crown, ArrowRight, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumPlusModel from "@/hooks/usePremiumPlusModel";
import { useEffect, useState } from "react";
import { createSubscription } from "./action";
import { toast } from "sonner";
import {
  RazorpayInstance,
  RazorpayOptions,
  RazorpayResponse,
} from "@/lib/types";
import { env } from "@/env";
import logo from "../../assests/logo.png";
import { useUser } from "@clerk/nextjs";

// Extend window interface for Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const currentPremiumFeatures = ["AI tools", "Up to 3 resume"];
const upgradeFeatures = ["Infinite resume", "Design Customization"];

const PremiumPlusUpgradeModal = () => {
  const { open, setPremiumPlusOpen } = usePremiumPlusModel();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const eventSource = new EventSource(
      `/api/subscription-status?userId=${user.id}`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "subscription_updated") {
        toast.success(data.message);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error", error);
    };

    return () => {
      eventSource.close();
    };
  }, [user?.id]);

  const handleUpgradeClick = async () => {
    try {
      setLoading(true);
      const subscription = await createSubscription(
        env.NEXT_PUBLIC_PREMIUM_PLUS_MONTHLY!,
      );

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
        description: "Premium Plus Upgrade",
        image: logo,
        handler: function (response: RazorpayResponse) {
          if (response) {
            toast.success("Upgrade Successful!", {
              description: "Processing your upgrade... Please wait.",
              duration: 3000,
            });
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
      console.error("Upgrade error:", error);
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
          setPremiumPlusOpen(isOpen);
        }
      }}
    >
      <DialogContent className="max-w-3xl border-0 bg-gradient-to-br from-slate-50 to-slate-100 p-0">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-2xl">
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-8 py-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-4 right-4">
              <div className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-slate-900">
                <Sparkles className="mr-1 inline h-3 w-3" />
                UPGRADE
              </div>
            </div>
            <DialogHeader className="relative z-10">
              <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-white">
                <Crown className="h-8 w-8 text-yellow-400" />
                Upgrade to Premium Plus
              </DialogTitle>
              <p className="mt-2 text-blue-100">
                Unlock unlimited potential and advanced features
              </p>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Current vs Upgrade Comparison */}
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              {/* Current Premium */}
              <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
                    <Star className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Current Plan
                    </h3>
                    <p className="text-sm text-slate-600">Premium</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {currentPremiumFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Plus */}
              <div className="relative rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6">
                <div className="absolute -top-2 -right-2">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 p-2">
                    <Zap className="h-4 w-4 text-slate-900" />
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                    <Crown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text font-semibold text-transparent">
                      Upgrade to
                    </h3>
                    <p className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-sm font-semibold text-transparent">
                      Premium Plus
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {upgradeFeatures.map((feature, index) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                      {index >= 2 && (
                        <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                          NEW
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upgrade Benefits */}
            <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <h4 className="mb-4 font-semibold text-slate-900">
                What you all get with Premium Plus:
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-blue-100 p-1">
                    <Check className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      Unlimited Resumes
                    </p>
                    <p className="text-sm text-slate-600">
                      Create as many resumes as you need
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-blue-100 p-1">
                    <Check className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      Advanced Customization
                    </p>
                    <p className="text-sm text-slate-600">
                      Full design control and personalization
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Button
                onClick={handleUpgradeClick}
                disabled={loading}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      Upgrade Now
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Button>

              <p className="mt-4 text-sm text-slate-500">
                Upgrade anytime • Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumPlusUpgradeModal;
