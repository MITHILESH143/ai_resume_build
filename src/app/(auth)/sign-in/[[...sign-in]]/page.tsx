import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-[#1A1A1A] p-5">
      <SignIn
        appearance={{
          baseTheme: dark,
          elements: {
            formButtonPrimary:
              "[background-color:#7e22ce] hover:[background-color:#6b21a8] text-white",
          },
        }}
      />
    </main>
  );
};

export default Page;
