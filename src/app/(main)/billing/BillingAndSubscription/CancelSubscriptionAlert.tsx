"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDate } from "date-fns";
import { AlertTriangle } from "lucide-react";

interface CancelSubscriptionProp {
  cancelAtPeriodEnd: boolean | undefined;
  currentPeriodEnd: Date | undefined;
}

const CancelSubscriptionAlert = ({
  cancelAtPeriodEnd,
  currentPeriodEnd,
}: CancelSubscriptionProp) => {
  return (
    <>
      {/* Alert for cancellation */}
      {cancelAtPeriodEnd && (
        <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            Your subscription will be canceled on{" "}
            {currentPeriodEnd && (
              <strong>{formatDate(currentPeriodEnd, "MMMM dd, yyyy")}</strong>
            )}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default CancelSubscriptionAlert;
