// CancelSubscription.tsx
"use client";

import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import { cancelSubscription } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CancelSubscription = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancelSubscription = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel your subscription?\n\n" +
        "What happens next:\n" +
        "• Your subscription will remain active until the end of the current billing period\n" +
        "• You'll lose access to premium features after the period ends\n" +
        "• You can reactivate anytime before the period ends",
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      const result = await cancelSubscription();

      if (result.success) {
        toast.success("Subscription cancelled", {
          description:
            "Your subscription will remain active until the end of the current billing period.",
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Cancel subscription error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("Failed to cancel subscription", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={loading}
      variant="destructive"
      onClick={handleCancelSubscription}
    >
      Cancel Subscription
    </LoadingButton>
  );
};

export default CancelSubscription;
