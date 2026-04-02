import { useEffect, useState } from "react";

export const useCountUp = (end, duration = 800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    let frameId;

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);

      setValue(Math.floor(progress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return value;
};
