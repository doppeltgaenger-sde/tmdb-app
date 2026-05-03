import { useEffect, useState } from "react";

export const useCountUp = (targetValue, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof targetValue !== "number" || isNaN(targetValue)) return;

    let startTime = null;
    let frameId;

    const handleAnimate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const deltaTime = currentTime - startTime;
      const progress = Math.min(deltaTime / duration, 1);

      setCount(Math.floor(progress * targetValue));

      if (progress < 1) {
        frameId = requestAnimationFrame(handleAnimate);
      }
    };

    frameId = requestAnimationFrame(handleAnimate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [targetValue, duration]);

  return count;
};
