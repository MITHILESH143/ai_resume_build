"use client";

import { Button } from "@/components/ui/button";
import useOpenCloseState from "@/hooks/useOpenCloseState";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

const CreateResumeButton = ({ canCreate }: CreateResumeButtonProps) => {
  const setOpenCloseState = useOpenCloseState();
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
      onClick={() => setOpenCloseState.setOpenCloseState(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusSquare className="size-5" />
      New Resume
    </Button>
  );
};

export default CreateResumeButton;
