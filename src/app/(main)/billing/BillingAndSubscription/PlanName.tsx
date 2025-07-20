"use client";

import { Badge } from "@/components/ui/badge";

interface PlanNameProp {
  planName: string;
  isPremium: boolean;
}

const PlanName = ({ planName, isPremium }: PlanNameProp) => {
  return (
    <Badge
      variant={isPremium ? "default" : "secondary"}
      className="text-sm font-medium"
    >
      {planName} Plan
    </Badge>
  );
};

export default PlanName;
