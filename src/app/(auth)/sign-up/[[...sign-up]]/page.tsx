import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-[#1A1A1A] p-3">
      <SignUp
        appearance={{
          baseTheme: dark,
          elements: {
            formButtonPrimary:
              "bg-purple-600 hover:bg-purple-700 text-white font-medium ",
            socialButtonsBlockButton:
              "bg-purple-600 hover:bg-purple-700 text-white",
          },
        }}
      />
    </main>
  );
};

export default Page;
