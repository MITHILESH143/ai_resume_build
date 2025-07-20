"use client";
import { useMemo } from "react";
import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const premiumFeatures = ["AI tools", "Up to 3 resume"];
const premiumPlusFeatures = ["Infinite resume", "Design Customization"];

interface SubscriptionBenefitsProp {
  plan: string | undefined;
}

const SubscriptionBenefits = ({ plan }: SubscriptionBenefitsProp) => {
  const features = useMemo(() => {
    if (plan === "premium") {
      return premiumFeatures;
    } else if (plan === "premium_plus" || plan === "premium plus") {
      return [...premiumFeatures, ...premiumPlusFeatures];
    }
    return [];
  }, [plan]);

  if (plan === "free" || features.length === 0) return null;

  const isPremiumPlus = plan === "premium_plus" || plan === "premium plus";

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-lg text-slate-900 dark:text-slate-100">
            {isPremiumPlus ? "Premium Plus" : "Premium"} Benefits
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
                {index < premiumFeatures.length && isPremiumPlus && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    PREMIUM+
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {isPremiumPlus && (
          <div className="mt-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-3 dark:from-amber-900/20 dark:to-orange-900/20">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              ✨ You are getting the most out of our platform!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionBenefits;
