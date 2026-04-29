import { useState, useEffect, useContext, createContext, useMemo } from "react";

const ViewportContext = createContext(null);

const getViewportSettings = () => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState(getViewportSettings);

  useEffect(() => {
    let debounceTimer;

    const handleResize = () => {
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        setViewport(getViewportSettings());
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value = useMemo(() => ({
    width: viewport.width,
    height: viewport.height
  }), [viewport.width, viewport.height]);

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  const context = useContext(ViewportContext);

  if (!context) {
    return { width: 0, height: 0, isMobileSm: false, isDesktop: true };
  }

  const { width } = context;

  return {
    ...context,
    isMobileSm: width < 576,
    isMobileLg: width < 768,
    isTablet: width < 992,
    isDesktop: width >= 992,
  };
};