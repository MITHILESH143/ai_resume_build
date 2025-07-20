"use client";

import { formatDate } from "date-fns";
import { Calendar } from "lucide-react";
import React from "react";

interface CurrentPlanDetailsProp {
  planName: string;
  isPremium: boolean;
  currentPeriodEnd: Date | undefined;
}

const CurrentPlanDetails = ({
  planName,
  isPremium,
  currentPeriodEnd,
}: CurrentPlanDetailsProp) => {
  return (
    <>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {planName}
        </p>
        {isPremium && currentPeriodEnd && (
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="h-4 w-4" />
            <span>
              Next billing: {formatDate(currentPeriodEnd, "MMM dd, yyyy")}
            </span>
          </div>
        )}
      </div>
      {!isPremium && (
        <div className="text-right">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upgrade to unlock premium features
          </p>
        </div>
      )}
    </>
  );
};

export default CurrentPlanDetails;
