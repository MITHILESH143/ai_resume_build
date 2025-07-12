import React from "react";
import Navbar from "./Navbar";
import PremiumModel from "@/components/premium/PremiumModel";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <PremiumModel />
    </div>
  );
};

export default layout;
