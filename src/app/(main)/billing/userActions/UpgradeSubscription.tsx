"use client";

import LoadingButton from "@/components/LoadingButton";
import usePremiumPlusModel from "@/hooks/usePremiumPlusModel";
import { SubscriptionLevel } from "@/lib/subscription";
import { useState } from "react";
import { toast } from "sonner";

interface UpgradeSubscriptionButtonProps {
  subscriptionLevel: SubscriptionLevel;
}

const UpgradeSubscriptionButton = ({
  subscriptionLevel,
}: UpgradeSubscriptionButtonProps) => {
  // const { setPremiumPlusOpen } = usePremiumPlusModel();
  const { setPremiumPlusOpen } = usePremiumPlusModel();
  const [loading, setIsLoading] = useState(false);

  const handleUpgradeButtoncClick = () => {
    try {
      setIsLoading(true);
      if (subscriptionLevel == "premium") {
        setPremiumPlusOpen(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again later");
    } finally {
      setIsLoading(false);
    }
  };

  if (subscriptionLevel === "premium_plus") return null;

  return (
    <LoadingButton onClick={handleUpgradeButtoncClick} loading={loading}>
      Upgrade Subscription
    </LoadingButton>
  );
};

export default UpgradeSubscriptionButton;
