import { useEffect, useRef, useState } from "react";

export const useInView = ({ threshold = 0.3, triggerOnce = true } = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isInView };
};
