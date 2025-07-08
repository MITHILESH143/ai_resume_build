import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants, Button } from "./ui/button"; // adjust import as needed
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Extract types from the Button props manually since Button is not typed with `forwardRef`
type BaseButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

interface LoadingButtonProps extends BaseButtonProps {
  loading: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, disabled, children, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="size-5 animate-spin" />}
        {children}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
