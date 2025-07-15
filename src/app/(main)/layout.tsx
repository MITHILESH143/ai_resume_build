import React from "react";
import Navbar from "./Navbar";
import PremiumModel from "@/components/premium/PremiumModel";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div>
        <Navbar />
        {children}
        <PremiumModel />
      </div>
    </SubscriptionLevelProvider>
  );
};

export default layout;
