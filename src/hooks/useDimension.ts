import { useEffect, useState } from "react";

export default function useDimenion(
  containerRef: React.RefObject<HTMLElement>,
) {
  const [dimensions, setdimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const currentRef = containerRef.current;

    function getDimensions() {
      return {
        width: currentRef.offsetWidth || 0,
        height: currentRef.offsetHeight || 0,
      };
    }

    const resizeOberver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setdimensions(getDimensions());
      }
    });

    if (currentRef) {
      resizeOberver.observe(currentRef);
      setdimensions(getDimensions());
    }

    return () => {
      if (currentRef) {
        resizeOberver.unobserve(currentRef);
      }

      resizeOberver.disconnect();
    };
  }, [containerRef]);

  return dimensions;
}
