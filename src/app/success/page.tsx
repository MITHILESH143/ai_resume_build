"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, Edit, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan");

  if (!planName) {
    toast.error(
      "Oops! We couldn’t verify your subscription. Please try again.",
    );
    redirect("/resumes");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl dark:bg-gray-800 dark:text-white">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="mx-auto mb-4 h-20 w-20 text-green-500 dark:text-green-400" />
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your {planName} subscription has been activated successfully.
          </p>
        </div>

        {/* Success Details */}
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900">
          <p className="font-medium text-green-800 dark:text-green-300">
            🎉 Welcome to {planName}!
          </p>
          <p className="mt-1 text-sm text-green-700 dark:text-green-200">
            You now have access to all {planName} features.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full" size="lg" variant="default">
            <Link
              href="/resumes"
              className="flex items-center justify-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Continue Editing
            </Link>
          </Button>

          <Button asChild className="w-full" size="lg" variant="outline">
            <Link
              href="/billing"
              className="flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Check Subscription Details
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <Link
              href="/support"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
