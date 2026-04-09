import { useEffect, useRef } from "react";

export const LazyBlock = ({ 
  children, 
  onLoad, 
  rootMargin = "300px" 
}) => {
  const ref = useRef(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoadedRef.current) {
          hasLoadedRef.current = true;
          onLoad?.();
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [onLoad, rootMargin]);

  return <div ref={ref}>{children}</div>;
};
