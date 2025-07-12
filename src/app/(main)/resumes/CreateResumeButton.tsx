"use client";

import { Button } from "@/components/ui/button";
import usePremiumModel from "@/hooks/usePremiumModel";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

const CreateResumeButton = ({ canCreate }: CreateResumeButtonProps) => {
  const premiummodel = usePremiumModel();
  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New Resume
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => premiummodel.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusSquare className="size-5" />
      New Resume
    </Button>
  );
};

export default CreateResumeButton;
