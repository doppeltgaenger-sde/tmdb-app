import { useEffect, useRef, useState } from "react";

export const useInView = ({ threshold = 0.3, triggerOnce = true } = {}) => {
  const targetRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const handleObserve = ([entry], observer) => {
      if (entry.isIntersecting) {
        setIsInView(true);

        if (triggerOnce) {
          observer.unobserve(element);
          observer.disconnect();
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    };

    const observer = new IntersectionObserver(handleObserve, { threshold });
    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref: targetRef, isInView };
};
