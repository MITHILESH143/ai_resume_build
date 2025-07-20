"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getSubscriptionUrl } from "../action";

const ManageSubscriptionButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const redirectUrl = await getSubscriptionUrl();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {isLoading ? "Loading..." : "Update Payment Info"}
    </button>
  );
};

export default ManageSubscriptionButton;
