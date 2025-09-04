import { Button } from "@/components/ui/button";
import { canUseCustmization } from "@/lib/permissions";
import { Circle, Square, Squircle } from "lucide-react";
import { useSubscriptionLevel } from "../SubscriptionLevelProvider";
import useOpenCloseState from "@/hooks/useOpenCloseState";

interface BorderStyleProps {
  borderStyle: string | undefined;
  onChange: (borderSryle: string) => void;
}

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};
const borderStyles = Object.values(BorderStyles);

const BorderStyle = ({ borderStyle, onChange }: BorderStyleProps) => {
  const subscriptionLevel = useSubscriptionLevel();

  const { setOpenCloseState } = useOpenCloseState();
  const handleClick = () => {
    if (!canUseCustmization(subscriptionLevel)) {
      setOpenCloseState(true);
      return;
    }
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles?.length;
    onChange(borderStyles[nextIndex]);
  };

  const Icon =
    borderStyle === "circle"
      ? Circle
      : borderStyle === "square"
        ? Square
        : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon />
    </Button>
  );
};

export default BorderStyle;
