import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { useSubscriptionLevel } from "../SubscriptionLevelProvider";
import { canUseCustmization } from "@/lib/permissions";
import useOpenCloseState from "@/hooks/useOpenCloseState";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}
const ColotPicker = ({ color, onChange }: ColorPickerProps) => {
  const subscriptionLevel = useSubscriptionLevel();

  const { setOpenCloseState } = useOpenCloseState();

  const [showPopOver, setShowPopOver] = useState(false);

  return (
    <Popover open={showPopOver} onOpenChange={setShowPopOver}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="change resume color"
          onClick={() => {
            if (!canUseCustmization(subscriptionLevel)) {
              setOpenCloseState(true);
            }
            setShowPopOver(true);
          }}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
      </PopoverContent>
    </Popover>
  );
};

export default ColotPicker;
