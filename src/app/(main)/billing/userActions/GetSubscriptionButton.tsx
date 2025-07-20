"use client";

import LoadingButton from "@/components/LoadingButton";
import usePremiumModel from "@/hooks/usePremiumModel";
import { useState } from "react";

const GetSubscriptionButton = () => {
  const [loading, setIsLoading] = useState(false);
  const { setOpen } = usePremiumModel();

  const handleClick = () => {
    setIsLoading(true);
    setOpen(true);
    setIsLoading(false);
  };

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      GetSubscription
    </LoadingButton>
  );
};

export default GetSubscriptionButton;
