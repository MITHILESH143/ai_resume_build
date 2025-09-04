import { cache } from "react";

export type SubscriptionLevel = "free" ;

// This is a placeholder function. Replace it with actual logic to fetch user subscription level.



export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    return "free";
  }
);
