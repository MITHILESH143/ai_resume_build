import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: Infinity,
  
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canUseAiTools(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel == "free";
}

export function canUseCustmization(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "free";
}