import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";
import ManageSubscriptionButton from "./userActions/ManageSubscription";
import UpgradeSubscriptionButton from "./userActions/UpgradeSubscription";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import GetSubscriptionButton from "./userActions/GetSubscriptionButton";
import SubscriptionBenefits from "@/components/subscription/Benefits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Crown } from "lucide-react";
import CancelSubscription from "./userActions/CancelSubscription";
import PlanName from "./BillingAndSubscription/PlanName";
import CancelSubscriptionAlert from "./BillingAndSubscription/CancelSubscriptionAlert";
import CurrentPlanDetails from "./BillingAndSubscription/CurrentPlanDetails";
import { getSubscription } from "./action";

export const metadata: Metadata = {
  title: "Subscription details",
};

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const { subscription, planInfo } = await getSubscription(userId);

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  const planName = planInfo ? planInfo.item.name : "Free";
  const isPremium = planName !== "Free";

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
                Billing & Subscriptions
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Manage your subscription and billing preferences
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              <PlanName isPremium={isPremium} planName={planName} />
            </div>
          </div>
        </div>

        <CancelSubscriptionAlert
          cancelAtPeriodEnd={subscription?.cancelAtPeriodEnd}
          currentPeriodEnd={subscription?.currentPeriodEnd}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Current Plan & Actions */}
          <div className="space-y-6 lg:col-span-2">
            {/* Current Plan Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <CardTitle className="text-lg">Current Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CurrentPlanDetails
                    currentPeriodEnd={subscription?.currentPeriodEnd}
                    isPremium={isPremium}
                    planName={planName}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Manage Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row">
                  {subscription && (
                    <div className="flex-1">
                      <CancelSubscription />
                    </div>
                  )}
                  {subscription ? (
                    <>
                      <div className="flex-1">
                        <UpgradeSubscriptionButton
                          subscriptionLevel={subscriptionLevel}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="w-full">
                      <GetSubscriptionButton />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mobile Benefits - Shows on small screens */}
            <div className="lg:hidden">
              <SubscriptionBenefits
                plan={
                  planInfo?.item.name !== "free" &&
                  planInfo?.item.name === "Premium Plus"
                    ? "premium plus"
                    : "premium"
                }
              />
            </div>
          </div>

          {/* Right Column - Benefits (Desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <SubscriptionBenefits
                plan={
                  planInfo?.item.name !== "free" &&
                  planInfo?.item.name === "Premium Plus"
                    ? "premium plus"
                    : "premium"
                }
              />
            </div>
          </div>
        </div>

        {/* Additional Information Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                View your past invoices and payments
              </p>
              <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                View History →
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Update your payment information
              </p>
              <ManageSubscriptionButton />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Need help with your subscription?
              </p>
              <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Contact Support →
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Page;
